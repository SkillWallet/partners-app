import { TextField, Typography } from '@mui/material';
import { useAppDispatch } from '@store/store.model';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SwButton } from 'sw-web-shared';
import { useEffect } from 'react';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';
import ErrorDialog from '@components/ErrorPopup';
import { useForm, Controller } from 'react-hook-form';
import {
  ActivityCurrentStep,
  ActivityCurrentTask,
  ActivityStatus,
  activitySetCurrentStep,
  activityUpdateTask,
  activityUpdateTaskStatus,
  addActivityTask,
} from '@store/Activity/create-task.reducer';
import './DescriptionStep.scss';

const DescriptionStep = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { activeStep } = useSelector(ActivityCurrentStep);
  const status = useSelector(ActivityStatus);
  const { role, isCoreTeamMembersOnly, allParticipants, participants, description, title } = useSelector(ActivityCurrentTask);

  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      title,
      description,
    },
  });
  const values = watch();

  const onSubmit = async (data: any) => {
    await dispatch(activityUpdateTask(data));
    const result = await dispatch(
      addActivityTask({
        role,
        isCoreTeamMembersOnly,
        allParticipants,
        participants,
        description: values.description,
        title: values.title,
      })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      history.push('/partner/event-factory/create-task-success');
    }
  };

  const handleDialogClose = () => {
    dispatch(activityUpdateTaskStatus(ResultState.Idle));
  };

  useEffect(() => {
    if (activeStep !== 2) {
      dispatch(
        activitySetCurrentStep({
          activeStep: 2,
          title: null,
          description: null,
          toPrevBtnPath: '/partner/event-factory/create-task/roles',
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <div className="sw-description-wrapper">
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message="Something went wrong" />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message="Creating task..." />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sw-form-field">
          <Typography sx={{ mb: '15px' }} align="center" component="div" variant="h4">
            Last but least, a clear Title to help identity your Task 🙌
          </Typography>
          <div className="sw-form-field-content">
            <Controller
              name="title"
              control={control}
              render={({ field: { name, value, onChange } }) => {
                return (
                  <TextField
                    autoFocus
                    required
                    focused
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    inputProps={{ maxLength: 20 }}
                    color="primary"
                    helperText={
                      <Typography color="primary" align="right" component="span" variant="body2">
                        {20 - (value?.length || 0)} Words left
                      </Typography>
                    }
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="sw-form-field">
          <Typography sx={{ mb: '15px' }} align="center" component="div" variant="h4">
            And finally, the Description of what needs to get done 😎
          </Typography>
          <div className="sw-form-field-content">
            <Controller
              name="description"
              control={control}
              rules={{ maxLength: 280 }}
              render={({ field: { name, value, onChange } }) => {
                return (
                  <TextField
                    required
                    focused
                    name={name}
                    multiline
                    rows={4}
                    value={value || ''}
                    onChange={onChange}
                    inputProps={{ maxLength: 280 }}
                    color="primary"
                    placeholder="Number"
                    helperText={
                      <Typography color="primary" align="right" component="span" variant="body2">
                        {280 - (value?.length || 0)} of 280 characters left
                      </Typography>
                    }
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="bottom-action" style={{ marginTop: '30px' }}>
          <SwButton type="submit" mode="light" disabled={!values?.description || !values.title} label="Create Task" />
        </div>
      </form>
    </div>
  );
};

export default DescriptionStep;
