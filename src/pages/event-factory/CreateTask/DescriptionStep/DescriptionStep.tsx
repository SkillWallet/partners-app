import { TextField, Typography } from '@mui/material';
import { RootState, useAppDispatch } from '@store/store.model';
import { useSelector } from 'react-redux';
import { SwButton } from 'sw-web-shared';
import { useEffect } from 'react';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';
import ErrorDialog from '@components/ErrorPopup';
import { Field } from 'react-final-form';
import SwForm from '@components/form-components/SwForm';
import {
  activityTaskSetCurrentStep,
  activityTaskUpdateDescription,
  activityTaskUpdateStatus,
  addActivityTask,
} from '@store/Activity/create-activity-task.reducer';
import './DescriptionStep.scss';

const DescriptionStep = (mainProps) => {
  const dispatch = useAppDispatch();
  const {
    currentStep: { activeStep },
    createTask,
    status,
    role,
    isCoreTeamMembersOnly,
    allParticipants,
    participants,
    description,
  } = useSelector((state: RootState) => state.activityTask);

  const changeHandler = async ({ values }) => {
    if (values.description !== description) {
      dispatch(activityTaskUpdateDescription(values.description));
    }
  };

  const handleDialogClose = () => {
    dispatch(activityTaskUpdateStatus(ResultState.Idle));
  };

  const handleCreateTask = async () => {
    const result = await dispatch(
      addActivityTask({
        createTask,
        role,
        isCoreTeamMembersOnly,
        allParticipants,
        participants,
        description,
      })
    );

    if (result.meta.requestStatus === 'rejected') {
      mainProps.history.push('/partner/event-factory/create-task-success');
    }
  };

  useEffect(() => {
    if (activeStep !== 2) {
      dispatch(
        activityTaskSetCurrentStep({
          activeStep: 2,
          title: 'Step 3 - Write a description',
          description: 'And now, a short Description of what needs to get done 🙌',
          toPrevBtnPath: null,
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <div className="sw-description-wrapper">
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message="Something went wrong" />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message="Creating task..." />
      <SwForm changeHandler={changeHandler} initialValues={{ description }}>
        {({ values }) => {
          return (
            <>
              <div className="sw-form-field">
                <Typography sx={{ mb: '4px' }} component="div" variant="h3">
                  Description
                </Typography>
                <div className="sw-form-field-content">
                  <Field
                    name="description"
                    render={(props) => {
                      return (
                        <TextField
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          multiline
                          rows={4}
                          autoFocus
                          required
                          focused
                          error={props.meta.touched && props.meta.pristine && !props.input.value}
                          color="primary"
                          placeholder="Required Field"
                          inputProps={{ maxLength: 280 }}
                          helperText={
                            <Typography color="primary" align="right" component="span" variant="body2">
                              Max characters {280 - (props.input.value?.length || 0)}
                            </Typography>
                          }
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="bottom-action">
                <SwButton type="button" mode="light" disabled={!values?.description} onClick={handleCreateTask} label="Create Task" />
              </div>
            </>
          );
        }}
      </SwForm>
    </div>
  );
};

export default DescriptionStep;
