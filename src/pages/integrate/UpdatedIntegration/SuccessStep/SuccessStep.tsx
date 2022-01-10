import { CardContent, Box, Card, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { SwButton } from 'sw-web-shared';
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
          <Card
            sx={{
              height: '313px',
              width: '415px',
              my: '20px',
              p: '40px',
              border: '1px solid',
              borderColor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.dark',
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <Typography align="center" color="primary.main" variant="body1" component="div">
                Success, the Event has been created, and deployed on the Blockchain 🎉
              </Typography>
              <Typography align="center" color="primary.main" variant="body1" component="div">
                Now just share your Task on Discord, and get things started!
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{
                  px: '20px',
                }}
                component={Link}
                to="/partner/event-factory/create-task"
                size="small"
                color="primary"
              >
                Open new task
              </Button>
            </CardActions>
          </Card>
          <SwButton
            sx={{
              width: '415px',
            }}
            mode="light"
            label="Share on discord"
          />
        </Box>
      </div>
    </>
  );
};

export default SuccessStep;
