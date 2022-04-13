import { Alert, AlertTitle, Box, CircularProgress, Typography } from '@mui/material';
import { SingleTask, TasksStatus, tasksUpdateStatus } from '@store/Activity/tasks.reducer';
import { Task, TaskStatus } from '@store/model';
import { useAppDispatch } from '@store/store.model';
import { setPreviusRoute } from '@store/ui-reducer';
import { finalizeActivityTask, getTaskById } from '@api/activities.api';
import LoadingDialog from '@components/LoadingPopup';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { SwButton, SwScrollbar } from 'sw-web-shared';
import { ResultState } from '@store/result-status';
import UserTaskDetail from './UserTaskDetail';
import './Tasks.scss';

const TaskDetails = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [message, setLoadingMessage] = useState('');
  const { taskActivityId } = useParams<any>();
  const selectedTask: Task = useSelector(SingleTask);
  const status = useSelector(TasksStatus);

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard/core-team/tasks'));
    dispatch(getTaskById(taskActivityId));
    console.log('Previous route from Event Factory Tasks details');
  }, [dispatch, taskActivityId]);

  const handleFinalizeClick = async () => {
    setLoadingMessage('Finalizing Task...');
    await dispatch(finalizeActivityTask(selectedTask));
    history.goBack();
  };

  const handleDialogClose = () => {
    dispatch(tasksUpdateStatus(ResultState.Idle));
  };

  return (
    <Box
      className="sw-tasks-base-container"
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message={message} />
      {status === ResultState.Loading ? (
        <div className="tasks-loading-spinner">
          <CircularProgress
            sx={{
              justifyContent: 'center',
              alignContent: 'center',
            }}
          />
        </div>
      ) : (
        <SwScrollbar
          sx={{
            height: '100%',
            flex: 1,
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              className="sw-box"
            >
              <Typography
                sx={{
                  color: 'primary.main',
                  mb: '25px',
                }}
                variant="subtitle1"
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {selectedTask?.title || 'N/A'}
                  {selectedTask?.status === TaskStatus.Finished && (
                    <Alert
                      sx={{
                        border: 0,
                        py: 0,
                        m: 0,
                        ml: 2,
                        height: '30px',
                        width: '134px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      severity="success"
                    >
                      <AlertTitle
                        sx={{
                          p: 0,
                          m: 0,
                        }}
                      >
                        [ Completed ]
                      </AlertTitle>
                    </Alert>
                  )}
                </div>
              </Typography>
              <Typography
                sx={{
                  color: 'primary.main',
                  mb: '50px',
                }}
                variant="body1"
              >
                {selectedTask?.description}
              </Typography>

              <SwButton
                mode="light"
                sx={{
                  width: '280px',
                  height: '85px',
                  minHeight: '85px',
                  marginBottom: '40px',
                }}
                disabled
                label="Message"
              />

              <SwButton
                mode="light"
                sx={{
                  width: '280px',
                  height: '85px',
                  minHeight: '85px',
                  marginBottom: '40px',
                }}
                disabled
                label="Ask Update"
              />
              {selectedTask && selectedTask.creator.toLowerCase() === window.ethereum.selectedAddress && (
                <SwButton
                  mode="light"
                  sx={{
                    width: '280px',
                    height: '85px',
                    minHeight: '85px',
                    mb: '20px',
                  }}
                  onClick={handleFinalizeClick}
                  label="Finalize"
                />
              )}
            </Box>
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
              <UserTaskDetail
                url={selectedTask?.owner?.imageUrl}
                username={selectedTask?.owner?.nickname}
                date={new Date(+(selectedTask?.createdOn || 0)).toLocaleString()}
              />
            </Box>
          </Box>
        </SwScrollbar>
      )}
    </Box>
  );
};

export default TaskDetails;
