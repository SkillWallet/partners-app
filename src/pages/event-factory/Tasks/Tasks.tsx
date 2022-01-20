import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { resetActivityTaskState } from '@store/Activity/create-task.reducer';
import { setPreviusRoute } from '@store/ui-reducer';
import { SwButton } from 'sw-web-shared';
import { Link } from 'react-router-dom';
import SwTabs from '@components/tabs/SwTabs';
import {
  getAllTasks,
  takeTask,
  TasksRefreshStatus,
  TasksSelectedTab,
  TasksStatus,
  tasksUpdateSelectedTab,
  tasksUpdateStatus,
} from '@store/Activity/tasks.reducer';
import { Task, TaskTypes } from '@store/model';
import { useAppDispatch } from '@store/store.model';
import ErrorDialog from '@components/ErrorPopup';
import LoadingDialog from '@components/LoadingPopup';
import { ResultState } from '@store/result-status';
import TasksList from './TasksList';
import './Tasks.scss';

const Tasks = () => {
  const [tabs, setTabs] = useState([]);
  const [message, setLoadingMessage] = useState('');
  const dispatch = useAppDispatch();
  const selectedTabIndex = useSelector(TasksSelectedTab);
  const status = useSelector(TasksStatus);
  const refreshStatus = useSelector(TasksRefreshStatus);

  const handleDialogClose = () => {
    dispatch(tasksUpdateStatus(ResultState.Idle));
  };

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard/core-team'));
    console.log('Previous route from Event Factory Tasks');
  }, [dispatch]);

  useEffect(() => {
    const handleTask = async (s: TaskTypes, task: Task) => {
      switch (s) {
        case TaskTypes.Open:
          setLoadingMessage('Claiming task...');
          await dispatch(takeTask(task));
          break;
        default:
          break;
      }
    };
    setTabs([
      {
        label: 'Open Tasks',
        hideTop: true,
        props: {
          status: TaskTypes.Open,
          handleTask,
        },
        component: TasksList,
      },
      {
        label: 'Ongoing Tasks',
        hideTop: true,
        props: {
          status: TaskTypes.Ongoing,
          handleTask,
        },
        component: TasksList,
      },
      {
        label: 'Closed Tasks',
        hideTop: true,
        props: {
          status: TaskTypes.Closed,
          handleTask,
        },
        component: TasksList,
      },
      {
        label: 'Your Tasks',
        hideTop: true,
        props: {
          status: TaskTypes.MyTasks,
          handleTask,
        },
        component: TasksList,
      },
    ]);
    dispatch(getAllTasks());
    return () => {
      dispatch(resetActivityTaskState());
    };
  }, [dispatch]);

  return (
    <>
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message="Something went wrong" />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message={message} />
      <div className="sw-tasks-base-container">
        <Box
          sx={{
            p: 0,
            m: 0,
            gridGap: '0',
          }}
          className="sw-box"
        >
          <SwTabs
            tabs={tabs}
            selectedTabIndex={selectedTabIndex}
            selectedTab={(selectedIndex: number) => {
              dispatch(tasksUpdateSelectedTab(selectedIndex));
            }}
            tabPanelStyles={{
              p: 0,
            }}
            scrollbarStyles={{
              border: '0px',
              p: 0,
            }}
          />
        </Box>
      </div>
      {refreshStatus === ResultState.Loading && (
        <div className="refreshing-loading-spinner">
          <CircularProgress
            size="30px"
            sx={{
              justifyContent: 'center',
              alignContent: 'center',
            }}
          />
          <Typography
            sx={{
              color: 'primary.main',
            }}
            variant="h6"
          >
            Updating tasks...
          </Typography>
        </div>
      )}

      <div className="create-task-btn">
        <SwButton
          mode="light"
          sx={{
            width: '180px',
            height: '60px',
          }}
          to="/partner/event-factory/create-task"
          component={Link}
          label="Create task"
        />
      </div>
    </>
  );
};

export default Tasks;
