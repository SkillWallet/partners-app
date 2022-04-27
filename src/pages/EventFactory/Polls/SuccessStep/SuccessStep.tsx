import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './SuccessStep.scss';

const SuccessStep = () => {
  return (
    <>
      <div className="sw-success-wrapper">
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            my: 'auto',
          }}
        >
          <Typography align="center" color="primary.main" variant="h2" component="div">
            Success! Your Community Poll has been created and deployed on the Blockchain 🎉
          </Typography>
          <Typography align="center" color="primary.main" variant="h2" component="div">
            Now just share it with your [Team/Community] to get things started!
          </Typography>

          <Button
            disabled
            sx={{
              my: '40px',
            }}
            component={Link}
            to="/partner/dashboard/core-team/polls"
            size="small"
            color="primary"
          >
            See all Community Polls
          </Button>
        </Box>
      </div>
    </>
  );
};

export default SuccessStep;
