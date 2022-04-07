import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as CoreTeam } from '@assets/core-team.svg';
import { ReactComponent as Community } from '@assets/community.svg';
import { ActivityCurrentStep, ActivityCurrentTask, activitySetCurrentStep, activityUpdateTask } from '@store/Activity/create-task.reducer';
import { Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import './CategoryStep.scss';

const CategoryStep = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { activeStep } = useSelector(ActivityCurrentStep);
  const { isCoreTeamMembersOnly, role } = useSelector(ActivityCurrentTask);

  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      isCoreTeamMembersOnly,
    },
  });
  const values = watch();

  const onSubmit = (data: any) => {
    const shouldResetRole = data?.isCoreTeamMembersOnly !== isCoreTeamMembersOnly;
    dispatch(
      activityUpdateTask({
        ...data,
        role: shouldResetRole ? null : role,
      })
    );
    history.push('/partner/event-factory/create-task/roles');
  };

  useEffect(() => {
    if (activeStep !== 0) {
      dispatch(
        activitySetCurrentStep({
          activeStep: 0,
          title: null,
          description: null,
          toPrevBtnPath: null,
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <>
      <form className="sw-category-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            mb: 4,
          }}
          component="div"
          variant="h4"
        >
          This is an Open Task that lets you assign work, creative competitions and daily tasks to other Members of your DAO.
        </Typography>
        <Typography
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            mb: 4,
          }}
          component="div"
          variant="h4"
        >
          First of all, tell us who is this for:
        </Typography>
        <div className="sw-category-options">
          <Controller
            name="isCoreTeamMembersOnly"
            control={control}
            render={({ field: { name, value, onChange } }) => {
              return (
                <SwButton
                  name={name}
                  mode="light"
                  btnType="semi-large"
                  onClick={() => onChange(false)}
                  className={!value ? 'active-link' : ''}
                  endIcon={<CoreTeam />}
                  label="Core Team"
                />
              );
            }}
          />
          <Controller
            name="isCoreTeamMembersOnly"
            control={control}
            render={({ field: { name, value, onChange } }) => {
              return (
                <SwButton
                  name={name}
                  mode="light"
                  btnType="semi-large"
                  onClick={() => onChange(true)}
                  className={value ? 'active-link' : ''}
                  endIcon={<Community />}
                  label="Community"
                />
              );
            }}
          />
        </div>

        <div className="bottom-action" style={{ marginTop: '80px' }}>
          <SwButton type="submit" disabled={values.isCoreTeamMembersOnly === null} mode="light" label="Next: Assign Role" />
        </div>
      </form>
    </>
  );
};

export default CategoryStep;
