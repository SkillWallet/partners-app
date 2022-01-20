import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { SwStepper } from 'sw-web-shared';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityCurrentStep, resetActivityTaskState } from '@store/Activity/create-task.reducer';
import { setPreviusRoute } from '@store/ui-reducer';
import CategoryStep from './CategoryStep/CategoryStep';
import DescriptionStep from './DescriptionStep/DescriptionStep';
import RolesStep from './RolesStep/RolesStep';
import './CreateTask.scss';

const CreateTask = () => {
  const dispatch = useDispatch();
  const { description, title, activeStep, descriptionTooltip, stepperText } = useSelector(ActivityCurrentStep);
  const [steps] = useState([...Array(3)]);

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/event-factory'));
    console.log('Previous route from Activity Create task');
    return () => {
      dispatch(resetActivityTaskState());
    };
  }, [dispatch]);

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
            title={title}
            stepperText={stepperText}
            steps={steps}
            description={description}
            activeStep={activeStep}
            descriptionTooltip={descriptionTooltip}
            dotStyles={{
              width: '45px',
              height: '45px',
            }}
            maxWidth="580px"
          />
          <Box className="sw-box" sx={{ maxWidth: activeStep === -1 ? '100%' : '580px', width: '100%', margin: '20px auto' }}>
            <Switch>
              <Route exact path="/partner/event-factory/create-task" component={CategoryStep} />
              <Route path="/partner/event-factory/create-task/roles" component={RolesStep} />
              <Route path="/partner/event-factory/create-task/description" component={DescriptionStep} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateTask;
