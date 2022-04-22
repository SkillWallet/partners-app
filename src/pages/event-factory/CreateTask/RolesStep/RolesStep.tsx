import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as TagIcon } from '@assets/tag.svg';
import { getCommunityRoles } from '@store/Community/community.reducer';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { ActivityCurrentStep, ActivityCurrentTask, activitySetCurrentStep, activityUpdateTask } from '@store/Activity/create-task.reducer';
import './RolesStep.scss';

const RolesStep = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { activeStep } = useSelector(ActivityCurrentStep);
  const { role, isCoreTeamMembersOnly, allParticipants, participants } = useSelector(ActivityCurrentTask);
  const [roles] = useState(useSelector(getCommunityRoles(isCoreTeamMembersOnly)));

  console.log(roles, isCoreTeamMembersOnly, 'roles');

  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      role,
      participants,
      allParticipants,
    },
  });

  const values = watch();

  const onSubmit = (data: any) => {
    dispatch(activityUpdateTask(data));
    history.push('/partner/event-factory/create-task/description');
  };

  useEffect(() => {
    if (activeStep !== 1) {
      dispatch(
        activitySetCurrentStep({
          activeStep: 1,
          title: null,
          description: null,
          toPrevBtnPath: '/partner/event-factory/create-task',
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <>
      <form className="sw-roles-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            mb: 4,
          }}
          component="div"
          variant="h4"
        >
          What Role would you like to assign this Task to?
        </Typography>
        <div className="sw-roles-options">
          {roles.map(({ roleName }) => {
            return (
              <Fragment key={roleName}>
                <Controller
                  rules={{
                    required: true,
                  }}
                  name="role"
                  control={control}
                  render={({ field: { name, value, onChange } }) => {
                    return (
                      <SwButton
                        mode="light"
                        name={name}
                        type="button"
                        startIcon={<TagIcon />}
                        sx={{
                          width: '115px',
                          height: '35px',
                          '.MuiButton-startIcon svg': {
                            width: '16px',
                            height: '16px',
                          },
                          '&.active-link': {
                            '.MuiTypography-root': {
                              color: '#FFF',
                            },
                          },
                          '&:hover': {
                            '.MuiTypography-root': {
                              color: '#FFF',
                            },
                          },
                        }}
                        onClick={() => onChange(roleName)}
                        className={value === roleName ? 'active-link' : ''}
                      >
                        <Typography variant="body2">{roleName}</Typography>
                      </SwButton>
                    );
                  }}
                />
              </Fragment>
            );
          })}
        </div>

        <Typography
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            py: 2,
            mt: 2,
          }}
          component="div"
          variant="h4"
        >
          How many Members should participate?
        </Typography>

        <div className="form-fields">
          <div className="sw-form-field">
            <div className="sw-form-field-content">
              <Controller
                name="participants"
                control={control}
                rules={{ min: 0 }}
                render={({ field: { name, value, onChange } }) => {
                  return (
                    <TextField
                      type="number"
                      autoFocus
                      required
                      disabled={values.allParticipants}
                      focused
                      id={name}
                      name={name}
                      value={value}
                      onChange={onChange}
                      inputProps={{ min: 0 }}
                      color="primary"
                      placeholder="Number"
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="sw-form-field">
            <div className="sw-form-field-content">
              <Controller
                name="allParticipants"
                control={control}
                render={({ field: { name, value, onChange } }) => {
                  return (
                    <SwButton
                      name={name}
                      mode="light"
                      type="button"
                      sx={{
                        width: '100px',
                        height: '30px',
                      }}
                      onClick={() => onChange(!value)}
                      className={value ? 'active-link' : ''}
                    >
                      <Typography variant="body2">All</Typography>
                    </SwButton>
                  );
                }}
              />
            </div>
          </div>
        </div>

        <div className="bottom-action" style={{ marginTop: '80px' }}>
          <SwButton
            disabled={!values.role || (values.allParticipants ? false : +values.participants === 0)}
            mode="light"
            type="submit"
            label="Next: Describe the Task"
          />
        </div>
      </form>
    </>
  );
};

export default RolesStep;
