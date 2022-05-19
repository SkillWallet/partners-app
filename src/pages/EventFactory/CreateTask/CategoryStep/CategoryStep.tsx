import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CoreTeam } from '@assets/core-team.svg';
import { ReactComponent as Community } from '@assets/community.svg';
import { ActivityCurrentStep, ActivityCurrentTask, activitySetCurrentStep, activityUpdateTask } from '@store/Activity/create-task.reducer';
import { Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';
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
            mb: pxToRem(35),
            fontSize: pxToRem(22),
          }}
          component="div"
        >
          This is an Open Task that lets you assign work, creative competitions and daily tasks to other Members of your DAO.
        </Typography>
        <Typography
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            mb: pxToRem(35),
            fontSize: pxToRem(22),
          }}
          component="div"
        >
          First of all, tell us who is this for:
        </Typography>
        <div className="sw-category-options">
          <Controller
            name="isCoreTeamMembersOnly"
            control={control}
            render={({ field: { name, value, onChange } }) => {
              return (
                <PartnerButton
                  name={name}
                  mode="light"
                  onClick={() => onChange(true)}
                  className={value ? 'active-link' : ''}
                  endIcon={<CoreTeam />}
                  label="Core Team"
                  btnStyles={{
                    width: pxToRem(340),
                    height: pxToRem(80),
                    fontSize: pxToRem(19),
                    padding: `0 ${pxToRem(75)}`,
                  }}
                />
              );
            }}
          />
          <Controller
            name="isCoreTeamMembersOnly"
            control={control}
            render={({ field: { name, value, onChange } }) => {
              return (
                <PartnerButton
                  name={name}
                  mode="light"
                  onClick={() => onChange(false)}
                  className={!value ? 'active-link' : ''}
                  endIcon={<Community />}
                  label="Community"
                  btnStyles={{
                    width: pxToRem(340),
                    height: pxToRem(80),
                    fontSize: pxToRem(19),
                    padding: `0 ${pxToRem(75)}`,
                  }}
                />
              );
            }}
          />
        </div>

        <div className="bottom-action" style={{ marginTop: '80px' }}>
          <PartnerButton
            type="submit"
            btnStyles={{
              width: pxToRem(630),
              height: pxToRem(100),
              fontSize: pxToRem(28),
              '.sw-btn-label': {
                textAlign: 'center',
              },
            }}
            disabled={values.isCoreTeamMembersOnly === null}
            mode="light"
            label="Next: Assign Role"
          />
        </div>
      </form>
    </>
  );
};

export default CategoryStep;
