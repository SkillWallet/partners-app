import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { resetCreatePollState } from '@store/Activity/create-poll.reducer';
import CreatePollOptionsStep from './CreatePollOptionsStep/CreatePollOptionsStep';
import CreatePollInfoStep from './CreatePollInfoStep/CreatePollInfoStep';
import CreatePollParticipantsStep from './CreatePollParticipantsStep/CreatePollParticipantsStep';
import SuccessStep from './SuccessStep/SuccessStep';

const Polls = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetCreatePollState());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Switch>
        <Route exact path="/partner/event-factory/polls" component={CreatePollInfoStep} />
        <Route path="/partner/event-factory/polls/options" component={CreatePollOptionsStep} />
        <Route path="/partner/event-factory/polls/participants" component={CreatePollParticipantsStep} />
        <Route path="/partner/event-factory/polls/success" component={SuccessStep} />
      </Switch>
    </Container>
  );
};

export default Polls;
