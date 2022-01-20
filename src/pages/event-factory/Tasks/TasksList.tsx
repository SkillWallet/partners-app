/* eslint-disable react/no-unstable-nested-components */
import { Box, CircularProgress, ListItem, Typography } from '@mui/material';
import { FilteredTasks, TasksRefreshStatus, TasksStatus } from '@store/Activity/tasks.reducer';
import { GroupTask, Task, TaskStatus, TaskTypes } from '@store/model';
import { ResultState } from '@store/result-status';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SwButton } from 'sw-web-shared';
import './Tasks.scss';

const TasksList = (props) => {
  const status = useSelector(TasksStatus);
  const refreshStatus = useSelector(TasksRefreshStatus);
  const groupedTasks: GroupTask[] = useSelector(FilteredTasks(props.status));
  const Action = (task: Task) => {
    switch (props.status) {
      case TaskTypes.Open:
        return (
          <SwButton
            mode="light"
            sx={{
              width: '180px',
              height: '85px',
            }}
            disabled={refreshStatus === ResultState.Loading}
            onClick={() => props.handleTask(props.status, task)}
            label="I’ll do it!"
          />
        );
      case TaskTypes.Ongoing:
        return (
          <SwButton
            mode="light"
            sx={{
              width: '220px',
              height: '85px',
            }}
            component={Link}
            to={`/partner/dashboard/core-team/tasks/${task.activityId}`}
            label="See who’s doing this"
          />
        );
      case TaskTypes.Closed:
        return (
          <Typography
            sx={{
              color: 'primary.main',
              width: '200px',
            }}
            variant="h2"
          >
            {new Date(+task.createdOn).toLocaleString()}
          </Typography>
        );
      case TaskTypes.MyTasks:
        if (task.status === TaskStatus.Finished) {
          return (
            <Typography
              sx={{
                color: 'primary.main',
                width: '200px',
              }}
              variant="h2"
            >
              {new Date(+task.createdOn).toLocaleString()}
            </Typography>
          );
        }
        return (
          <SwButton
            mode="light"
            sx={{
              width: '180px',
              height: '85px',
            }}
            component={Link}
            disabled={refreshStatus === ResultState.Loading}
            to={`/partner/dashboard/core-team/tasks/${task.activityId}/submit`}
            label="Submit"
          />
        );
      default:
        return null;
    }
  };

  const Tasks = (tasks: Task[]) => {
    if (!tasks.length) {
      return (
        <div className="no-tasks">
          <Typography
            sx={{
              color: 'info.dark',
            }}
            variant="h2"
          >
            No tasks found!
          </Typography>
        </div>
      );
    }
    return tasks.map((task, index) => {
      return (
        <ListItem
          sx={{
            minHeight: '150px',
            display: 'flex',
            flexDirection: 'row',
            borderWidth: '2px',
            borderStyle: 'solid',

            justifyContent: 'space-between',
            '&:not(:last-child)': {
              borderBottom: '0',
            },
          }}
          key={index}
          disablePadding
        >
          <Box
            sx={{
              px: '20px',
              py: '28px',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                color: 'primary.main',
                mb: '10px',
              }}
              variant="subtitle1"
            >
              {task.title || 'N/A'}
            </Typography>
            <Typography
              sx={{
                color: 'primary.main',
              }}
              variant="body1"
            >
              {task.description}
            </Typography>
          </Box>
          <Box
            sx={{
              px: '20px',
              py: '28px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {Action(task)}
          </Box>
        </ListItem>
      );
    });
  };

  return (
    <div className="sw-tasks-list-base-container">
      <Box
        sx={{
          p: 0,
          m: 0,
          gridGap: '0',
        }}
        className="sw-box"
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
          groupedTasks.map((group, index) => {
            return (
              <div className="task-group" key={index}>
                {group.label && (
                  <Typography
                    sx={{
                      color: 'primary.main',
                      mb: '10px',
                    }}
                    variant="subtitle1"
                  >
                    {group.label}
                  </Typography>
                )}
                {Tasks(group.tasks)}
              </div>
            );
          })
        )}
      </Box>
    </div>
  );
};

export default TasksList;
