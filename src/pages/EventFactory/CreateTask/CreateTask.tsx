import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { SwStepper } from 'sw-web-shared';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ActivityCurrentStep } from '@store/Activity/create-task.reducer';
import { pxToRem } from '@utils/text-size';
import CategoryStep from './CategoryStep/CategoryStep';
import DescriptionStep from './DescriptionStep/DescriptionStep';
import RolesStep from './RolesStep/RolesStep';
import './CreateTask.scss';

const CreateTask = () => {
  const { description, title, activeStep, descriptionTooltip, stepperText } = useSelector(ActivityCurrentStep);
  const [steps] = useState([...Array(3)]);

  return (
    <Container
      maxWidth="md"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        '.MuiBox-root > .MuiBox-root:first-child': {
          mb: pxToRem(95),
          '.MuiSvgIcon-root': {
            width: pxToRem(32),
            height: pxToRem(32),
          },
        },
      }}
      className="sw-create-task-base-container"
    >
      <Box
        sx={{ maxWidth: pxToRem(820), flex: 1, display: 'flex', flexDirection: 'column', m: '0 auto', width: '100%' }}
        className="sw-box-right-inner"
      >
        <SwStepper
          mode="dark"
          title={title}
          stepperText={stepperText}
          steps={steps}
          description={description}
          activeStep={activeStep}
          descriptionTooltip={descriptionTooltip}
          dotStyles={{
            width: pxToRem(63),
            height: pxToRem(63),
          }}
          maxWidth="100%"
        />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Switch>
            <Route exact path="/partner/event-factory/create-task" component={CategoryStep} />
            <Route path="/partner/event-factory/create-task/roles" component={RolesStep} />
            <Route path="/partner/event-factory/create-task/description" component={DescriptionStep} />
          </Switch>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateTask;
