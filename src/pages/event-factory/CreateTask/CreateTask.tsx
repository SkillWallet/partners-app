import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { SwStepper } from 'sw-web-shared';
import { Route, Switch } from 'react-router-dom';
import { RootState } from '@store/store.model';
import { useDispatch, useSelector } from 'react-redux';
import { resetActivityTaskState } from '@store/Activity/create-activity-task.reducer';
import { setPreviusRoute } from '@store/ui-reducer';
import CategoryStep from './CategoryStep/CategoryStep';
import DescriptionStep from './DescriptionStep/DescriptionStep';
import RolesStep from './RolesStep/RolesStep';
import './CreateTask.scss';

const CreateTask = (props) => {
  const dispatch = useDispatch();
  const { description, title, activeStep, descriptionTooltip, stepperText } = useSelector(
    (state: RootState) => state.activityTask.currentStep
  );
  const [steps] = useState([...Array(3)]);

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/event-factory'));
  }, [dispatch]);

  useEffect(
    () => () => {
      dispatch(resetActivityTaskState());
    },
    [dispatch]
  );

  return (
    <div className="sw-create-task-base-container">
      <Box
        sx={{
          p: 0,
          m: 0,
          gridGap: '0',
        }}
        className="sw-box"
      >
        <Box sx={{ maxWidth: activeStep !== -1 ? '650px' : '100%', flexGrow: 1 }} className="sw-box-right-inner">
          <SwStepper
            mode="dark"
            stepperText={stepperText}
            title={title}
            steps={steps}
            description={description}
            activeStep={activeStep}
            descriptionTooltip={descriptionTooltip}
          />
          <Box className="sw-box" sx={{ maxWidth: activeStep === -1 ? '100%' : '450px', width: '100%', margin: '20px auto' }}>
            <Switch>
              <Route exact path="/partner/event-factory/create-task" component={CategoryStep} {...props} />
              <Route path="/partner/event-factory/create-task/roles" component={RolesStep} {...props} />
              <Route path="/partner/event-factory/create-task/description" component={DescriptionStep} {...props} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateTask;
