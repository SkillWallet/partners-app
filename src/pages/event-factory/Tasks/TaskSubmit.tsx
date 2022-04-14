import { Alert, AlertTitle, Box, CircularProgress, TextField, Typography } from '@mui/material';
import { SingleTask, TasksStatus, tasksUpdateStatus } from '@store/Activity/tasks.reducer';
import { Task, TaskStatus } from '@store/model';
import { useAppDispatch } from '@store/store.model';
import { setPreviusRoute } from '@store/ui-reducer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SwButton, SwScrollbar } from 'sw-web-shared';
import { ResultState } from '@store/result-status';
import ErrorDialog from '@components/ErrorPopup';
import LoadingDialog from '@components/LoadingPopup';
import './Tasks.scss';
import SuccessDialog from '@components/SuccessPopup';
import { finalizeActivityTask, getTaskById } from '@api/activities.api';

const TaskSubmit = () => {
  const dispatch = useAppDispatch();
  const { taskActivityId } = useParams<any>();
  const selectedTask: Task = useSelector(SingleTask);
  const status = useSelector(TasksStatus);

  const submitTask = () => {
    dispatch(finalizeActivityTask(selectedTask));
  };

  const handleDialogClose = () => {
    dispatch(tasksUpdateStatus(ResultState.Idle));
  };

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard/core-team/tasks'));
    dispatch(getTaskById(taskActivityId));
    console.log('Previous route from Event Factory Tasks submit');
  }, [dispatch, taskActivityId]);

  return (
    <>
      <SuccessDialog
        handleClose={handleDialogClose}
        open={status === ResultState.Success}
        message="Success!"
        subtitle="You have submitted your task"
      />
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message="Something went wrong" />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message="Finalizing task..." />
      <Box
        className="sw-tasks-base-container"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
          <>
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
                  mb: '16px',
                }}
                variant="h1"
              >
                Submit Task
              </Typography>

              <SwScrollbar
                sx={{
                  height: '100%',
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    px: '20px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    sx={{
                      color: 'primary.main',
                      mb: '16px',
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
                      mb: '35px',
                    }}
                    variant="body1"
                  >
                    {selectedTask?.description}
                  </Typography>

                  <TextField
                    disabled={selectedTask?.status === TaskStatus.Finished}
                    className="submit-descr"
                    required
                    focused
                    multiline
                    rows={4}
                    color="primary"
                    placeholder="Type something"
                  />

                  <div className="upload-file">
                    <Typography
                      sx={{
                        color: 'primary.main',
                      }}
                      variant="h2"
                    >
                      testfile.jpg
                    </Typography>
                    <SwButton
                      mode="light"
                      sx={{
                        width: '180px',
                        height: '40px',
                        minHeight: '40px',
                      }}
                      disabled={selectedTask?.status === TaskStatus.Finished}
                      label="Upload"
                    />
                  </div>

                  <div className="submit-action">
                    <SwButton
                      mode="light"
                      sx={{
                        width: '180px',
                        height: '85px',
                        minHeight: '85px',
                      }}
                      disabled={selectedTask?.status === TaskStatus.Finished}
                      onClick={submitTask}
                      label="Submit"
                    />
                  </div>
                </Box>
              </SwScrollbar>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default TaskSubmit;
