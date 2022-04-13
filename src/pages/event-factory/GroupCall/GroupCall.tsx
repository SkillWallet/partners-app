import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { resetActivityGroupCall } from '@store/Activity/group-call.reducer';
import CalendarStep from './CalendarStep/CalendarStep';

const GroupCall = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetActivityGroupCall());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Switch>
        <Route exact path="/partner/event-factory/group-call" component={CalendarStep} />
        {/* <Route path="/olympics/competitions/create/preview" component={PreviewStep} /> */}
        {/* <Route path="/olympics/competitions/create/success" component={SuccessStep} /> */}
      </Switch>
    </Container>
  );
};

export default GroupCall;
