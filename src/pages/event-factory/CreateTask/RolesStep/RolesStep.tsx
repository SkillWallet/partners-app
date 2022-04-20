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
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';

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
      <form className="sw-task-roles-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            mb: pxToRem(35),
            fontSize: pxToRem(22),
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
                      <PartnerButton
                        mode="light"
                        name={name}
                        type="button"
                        startIcon={<TagIcon />}
                        onClick={() => onChange(roleName)}
                        className={value === roleName ? 'active-link' : ''}
                        btnStyles={{
                          width: pxToRem(160),
                          height: pxToRem(50),
                          fontSize: pxToRem(19),
                          padding: `0 ${pxToRem(24)}`,
                          '.MuiButton-startIcon': {
                            mr: pxToRem(22),
                            svg: {
                              width: pxToRem(22),
                              height: pxToRem(22),
                            },
                          },
                        }}
                      >
                        <Typography variant="body2">{roleName}</Typography>
                      </PartnerButton>
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
            mt: pxToRem(70),
            mb: pxToRem(35),
            fontSize: pxToRem(22),
          }}
          component="div"
        >
          How many Members should participate?
        </Typography>

        <div
          className="form-fields"
          style={{
            gridGap: pxToRem(92),
          }}
        >
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
                      sx={{
                        '.MuiInputBase-root': {
                          width: pxToRem(135),
                          height: pxToRem(40),
                        },
                      }}
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
                    <PartnerButton
                      name={name}
                      mode="light"
                      type="button"
                      btnStyles={{
                        width: pxToRem(135),
                        height: pxToRem(40),
                        fontSize: pxToRem(22),
                        '.sw-btn-label': {
                          textAlign: 'center',
                        },
                      }}
                      onClick={() => onChange(!value)}
                      className={value ? 'active-link' : ''}
                    >
                      <Typography variant="body2">All</Typography>
                    </PartnerButton>
                  );
                }}
              />
            </div>
          </div>
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
            disabled={!values.role || (values.allParticipants ? false : +values.participants === 0)}
            mode="light"
            label="Next: Describe the Task"
          />
        </div>
      </form>
    </>
  );
};

export default RolesStep;
