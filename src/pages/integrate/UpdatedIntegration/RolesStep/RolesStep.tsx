import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import { SwButton, SwSlider } from 'sw-web-shared';
import { RootState } from '@store/store.model';
import { Field } from 'react-final-form';
import SwForm from '@components/form-components/SwForm';
import { integrateSetCurrentStep, integrateUpdateRolesAndAction } from '@store/Integrate/integrate';
import './RolesStep.scss';

const CommunityRolesSkills = [
  {
    key: 'skillOne',
    name: 'Role/Skill 1',
    required: true,
  },
  {
    key: 'skillTwo',
    name: 'Role/Skill 2',
    required: true,
  },
  {
    key: 'skillThree',
    name: 'Role/Skill 3',
    required: false,
  },
];

const RolesStep = () => {
  const dispatch = useDispatch();
  const {
    currentStep: { activeStep },
    roles,
    numOfActions,
  } = useSelector((state: RootState) => state.integrate);

  const totalRoles = roles.reduce((prev, curr) => {
    prev += curr.value ? 1 : 0;
    return prev;
  }, 0);

  const changeHandler = async ({ values }) => {
    dispatch(
      integrateUpdateRolesAndAction({
        roles: CommunityRolesSkills.map(({ key, name }) => {
          return {
            key,
            name,
            value: values[key],
          };
        }),
        numOfActions: values.numOfActions,
      })
    );
  };

  useEffect(() => {
    if (activeStep !== 1) {
      dispatch(
        integrateSetCurrentStep({
          activeStep: 1,
          title: 'Step 2 - Assign roles',
          description: 'The Roles you envision in your community (i.e. dev, validator, etc.)',
          toPrevBtnPath: '/integrate',
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <>
      <div className="sw-roles-wrapper">
        <SwForm
          changeHandler={changeHandler}
          initialValues={{
            numOfActions,
            ...roles.reduce((prev, curr) => {
              return {
                ...prev,
                [curr.key]: curr.value,
              };
            }, {}),
          }}
        >
          {({ values }) => {
            return (
              <>
                <div className="form-fields">
                  {CommunityRolesSkills.map(({ name, key, required }, index: number) => {
                    return (
                      <div className="sw-form-field" key={key}>
                        <div className="sw-form-field-content">
                          <Field
                            name={key}
                            render={(props) => {
                              return (
                                <TextField
                                  name={props.input.name}
                                  value={props.input.value}
                                  onChange={props.input.onChange}
                                  autoFocus={index === 0}
                                  required={required}
                                  focused
                                  error={props.meta.touched && props.meta.pristine && !props.input.value}
                                  color="primary"
                                  placeholder={name}
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="sw-form-field role-field">
                    <Typography sx={{ mb: '4px', mt: 4 }} component="div" variant="h3">
                      Nr. of Actions
                    </Typography>
                    <Typography sx={{ mb: '12px' }} component="div" variant="body2">
                      How many initial Actions you expect. No worries, you can always add more later :)
                    </Typography>
                    <div className="sw-form-field-content">
                      <Field
                        name="numOfActions"
                        render={(props) => {
                          return (
                            <SwSlider
                              name={props.input.name}
                              value={props.input.value || 0}
                              onChange={props.input.onChange}
                              step={1}
                              mode="black"
                              marks
                              min={0}
                              max={10}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </SwForm>

        <div className="bottom-action">
          <SwButton
            mode="light"
            disabled={totalRoles < 2 || numOfActions === 0}
            component={Link}
            to="/integrate/communtity-info"
            label="Next: Describe Community"
          />
        </div>
      </div>
    </>
  );
};

export default RolesStep;
