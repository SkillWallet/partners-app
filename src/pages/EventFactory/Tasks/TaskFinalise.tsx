import { Alert, AlertTitle, Box, CircularProgress, Container, Typography } from '@mui/material';
import { SingleTask, TaskErrorMessage, TasksStatus, tasksUpdateStatus } from '@store/Activity/tasks.reducer';
import { Task, TaskStatus } from '@store/model';
import { useAppDispatch } from '@store/store.model';
import PartnerButton from '@components/Button';
import { finalizeActivityTask, getTaskById } from '@api/activities.api';
import LoadingDialog from '@components/LoadingPopup';
import { pxToRem } from '@utils/text-size';
import { useEffect } from 'react';
import ErrorDialog from '@components/ErrorPopup';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SwScrollbar } from 'sw-web-shared';
import { ResultState } from '@store/result-status';
import UserTaskDetail from './UserTaskDetail';
import './Tasks.scss';

const TaskFinalise = () => {
  const dispatch = useAppDispatch();
  const { taskActivityId } = useParams<any>();
  const selectedTask: Task = useSelector(SingleTask);
  const status = useSelector(TasksStatus);
  const errorMessage = useSelector(TaskErrorMessage);

  useEffect(() => {
    dispatch(getTaskById(taskActivityId));
  }, [dispatch, taskActivityId]);

  const handleFinalizeClick = async () => {
    await dispatch(finalizeActivityTask(selectedTask));
  };

  const handleDialogClose = () => {
    dispatch(tasksUpdateStatus(ResultState.Idle));
  };

  return (
    <Container
      maxWidth="md"
      className="sw-tasks-base-container"
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message="Finalising task" />
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message={errorMessage || 'Something went wrong'} />
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
                fontSize={pxToRem(50)}
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
                        Completed
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
                fontSize={pxToRem(20)}
              >
                {selectedTask?.description}
              </Typography>

              <PartnerButton
                mode="light"
                btnStyles={{
                  width: pxToRem(390),
                  height: pxToRem(120),
                  marginBottom: '40px',
                  p: 0,
                  '.sw-btn-label': {
                    textAlign: 'center',
                  },
                }}
                disabled={selectedTask && selectedTask.creator.toLowerCase() === window.ethereum.selectedAddress}
                onClick={handleFinalizeClick}
                label="Finalize"
              />

              <PartnerButton
                mode="light"
                btnStyles={{
                  width: pxToRem(390),
                  height: pxToRem(120),
                  marginBottom: '40px',
                  p: 0,
                  '.sw-btn-label': {
                    textAlign: 'center',
                  },
                }}
                disabled
                label="Decline"
              />
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
    </Container>
  );
};

export default TaskFinalise;
