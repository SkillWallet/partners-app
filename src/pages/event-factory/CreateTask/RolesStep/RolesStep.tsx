import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as CoreTeam } from '@assets/core-team.svg';
import { RootState } from '@store/store.model';
import { Field } from 'react-final-form';
import { getCommunityRoles } from '@store/Community/community.reducer';
import SwForm from '@components/form-components/SwForm';
import {
  activityTaskToggleAllParticipants,
  activityTaskUpdateParticipants,
  activityTaskSetCurrentStep,
  activityTaskSelectRole,
} from '@store/Activity/create-activity-task.reducer';
import './RolesStep.scss';

const RolesStep = () => {
  const dispatch = useDispatch();
  const {
    currentStep: { activeStep },
    role,
    isCoreTeamMembersOnly,
    allParticipants,
    participants,
  } = useSelector((state: RootState) => state.activityTask);
  const [roles] = useState(useSelector(getCommunityRoles(isCoreTeamMembersOnly)));

  const changeHandler = async ({ values }) => {
    if (values.allParticipants !== allParticipants) {
      dispatch(activityTaskToggleAllParticipants(values.allParticipants));
    }

    if (values.participants !== participants) {
      dispatch(activityTaskUpdateParticipants(+(values.participants || 0)));
    }
  };

  useEffect(() => {
    if (activeStep !== 1) {
      dispatch(
        activityTaskSetCurrentStep({
          activeStep: 1,
          title: 'Step 2 - Assign role',
          description: 'What Role would you like to assign this Task to?',
          toPrevBtnPath: null,
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <>
      <div className="sw-roles-wrapper">
        <div className="sw-roles-options">
          {roles.map(({ roleName }) => {
            return (
              <SwButton
                key={roleName}
                mode="light"
                btnType="medium"
                onClick={() => dispatch(activityTaskSelectRole(roleName))}
                className={role === roleName ? 'active-link' : ''}
                startIcon={<CoreTeam />}
                label={roleName}
              />
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
          variant="subtitle1"
        >
          How many Members should participate?
        </Typography>

        <SwForm changeHandler={changeHandler} initialValues={{ allParticipants, participants }}>
          {({ values }) => {
            return (
              <div className="form-fields">
                <div className="sw-form-field">
                  <div className="sw-form-field-content">
                    <Field
                      name="participants"
                      render={(props) => {
                        return (
                          <TextField
                            name={props.input.name}
                            value={props.input.value}
                            onChange={props.input.onChange}
                            type="number"
                            autoFocus
                            required
                            disabled={allParticipants}
                            focused
                            inputProps={{ min: 0 }}
                            error={props.meta.touched && props.meta.pristine && !props.input.value}
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
                    <Field
                      name="allParticipants"
                      render={(props) => {
                        return (
                          <SwButton
                            mode="light"
                            type="button"
                            btnType="medium"
                            name={props.input.name}
                            onClick={() => {
                              return props.input.onChange(!allParticipants);
                            }}
                            className={allParticipants ? 'active-link' : ''}
                            startIcon={<CoreTeam />}
                            label="All"
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          }}
        </SwForm>

        <div className="bottom-action">
          <SwButton
            mode="light"
            disabled={role === null || (allParticipants ? false : participants === 0)}
            component={Link}
            to="/partner/event-factory/create-task/description"
            label="Next: Describe the Task"
          />
        </div>
      </div>
    </>
  );
};

export default RolesStep;
