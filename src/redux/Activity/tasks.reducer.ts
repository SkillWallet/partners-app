import { getTask, getTasks } from '@api/skillwallet.api';
import { finalizeActivityTask, getActivitiesAddress, takeActivityTask } from '@api/smart-contracts.api';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { GroupTask, Task, TaskStatus, TaskTypes } from '@store/model';
import { ResultState } from '@store/result-status';
import { openSnackbar } from '@store/ui-reducer';
import { ErrorParser } from '@utils/error-parser';
import { ethers } from 'ethers';
import { ParseSWErrorMessage } from 'sw-web-shared';

export interface ActivityTaskState {
  status: ResultState;
  refreshingStatus: ResultState;
  tasks: Task[];
  selectedTabIndex: TaskTypes;
  selectedTask: Task;
}

const initialState: ActivityTaskState = {
  status: ResultState.Idle,
  refreshingStatus: ResultState.Idle,
  tasks: [],
  selectedTabIndex: TaskTypes.Open,
  selectedTask: null,
};

export const getAllTasks = createAsyncThunk('event-factory/tasks/getAll', async (_, { dispatch, getState }) => {
  try {
    const { partner }: any = getState();
    const activityAddress = await getActivitiesAddress(partner?.paCommunity?.partnersAgreementAddress);
    console.log('activityAddress: ', activityAddress);
    return getTasks(activityAddress);
  } catch (error) {
    const message = ErrorParser(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const getTaskByActivityId = createAsyncThunk('event-factory/tasks/get', async (activityId: string, { dispatch, getState }) => {
  try {
    const {
      auth: { userInfo },
      tasks: { tasks, selectedTask },
      partner,
    }: any = getState();

    let task = selectedTask;

    if (selectedTask?.activityId === activityId) {
      task = {
        task: selectedTask,
        taker: selectedTask.owner,
      };
    } else {
      task = null;
    }

    if (!task) {
      console.log('sdadsadasda');
      const existingTask: Task = tasks.find((t: Task) => t.activityId === activityId);
      console.log(existingTask);
      if (existingTask?.owner) {
        task = {
          task: existingTask,
          taker: existingTask.owner,
        };
      } else if (existingTask?.taker?.toLowerCase() === window.ethereum.selectedAddress?.toLowerCase()) {
        task = {
          task: existingTask,
          taker: {
            tokenId: userInfo?.tokenId,
            imageUrl: userInfo?.imageUrl,
            nickname: userInfo?.nickname,
          },
        };
      } else {
        task = null;
      }
    }

    if (task) {
      return task;
    }
    const activityAddress = await getActivitiesAddress(partner?.paCommunity?.partnersAgreementAddress);
    return getTask(activityId, activityAddress);
  } catch (error) {
    const message = ErrorParser(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const takeTask = createAsyncThunk('event-factory/tasks/takeTask', async (task: Task, { dispatch, getState }) => {
  try {
    const { partner }: any = getState();
    await takeActivityTask(partner?.paCommunity?.partnersAgreementAddress, task);
    return {
      ...task,
      taker: window.ethereum.selectedAddress,
      status: TaskStatus.Taken,
    };
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const finalizeTask = createAsyncThunk('event-factory/tasks/finalizeTask', async (task: Task, { dispatch, getState }) => {
  try {
    const { partner }: any = getState();
    await finalizeActivityTask(partner?.paCommunity?.partnersAgreementAddress, task);
    return {
      ...task,
      taker: window.ethereum.selectedAddress,
      status: TaskStatus.Finished,
    };
  } catch (error) {
    const message = ParseSWErrorMessage(error);
    dispatch(openSnackbar({ message, severity: 'error' }));
    throw new Error(message);
  }
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    tasksUpdateStatus(state, action) {
      state.status = action.payload;
    },
    tasksUpdateSelectedTab(state, action) {
      state.selectedTabIndex = action.payload;
    },
    resetTasksState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        if (state.tasks.length) {
          state.refreshingStatus = ResultState.Loading;
        } else {
          state.status = ResultState.Loading;
        }
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        if (state.tasks.length) {
          state.refreshingStatus = ResultState.Idle;
        } else {
          state.status = ResultState.Idle;
        }
        state.tasks = [...action.payload];
      })
      .addCase(getAllTasks.rejected, (state) => {
        state.refreshingStatus = ResultState.Idle;
        state.status = ResultState.Failed;
      })
      .addCase(getTaskByActivityId.pending, (state) => {
        state.status = ResultState.Loading;
      })
      .addCase(getTaskByActivityId.fulfilled, (state, action) => {
        state.status = ResultState.Idle;
        const { task, taker } = action.payload;

        const selectedTask = {
          ...task,
          owner: taker,
        };

        state.selectedTask = selectedTask;
        state.tasks = state.tasks.map((t) => {
          if (t.activityId === task.activityId) {
            return selectedTask;
          }
          return t;
        });
      })
      .addCase(getTaskByActivityId.rejected, (state) => {
        state.status = ResultState.Failed;
      })
      .addCase(takeTask.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(takeTask.fulfilled, (state, action) => {
        state.status = ResultState.Idle;
        state.tasks = state.tasks.map((task) => {
          if (task.activityId === action.payload.activityId) {
            return action.payload;
          }
          return task;
        });
      })
      .addCase(takeTask.rejected, (state) => {
        state.status = ResultState.Failed;
      })
      .addCase(finalizeTask.pending, (state) => {
        state.status = ResultState.Updating;
      })
      .addCase(finalizeTask.fulfilled, (state, action) => {
        state.status = ResultState.Success;
        state.selectedTask = action.payload;
        state.selectedTabIndex = TaskTypes.Closed;
        state.tasks = state.tasks.map((task) => {
          if (task.activityId === action.payload.activityId) {
            return action.payload;
          }
          return task;
        });
      })
      .addCase(finalizeTask.rejected, (state) => {
        state.status = ResultState.Failed;
      });
  },
});

export const { tasksUpdateStatus, tasksUpdateSelectedTab } = tasksSlice.actions;

const NotTaken = ethers.constants.AddressZero;

export const Tasks = (state: any) => state.tasks.tasks as Task[];
export const TasksSelectedTab = (state: any) => state.tasks.selectedTabIndex as number;
export const TasksStatus = (state: any) => state.tasks.status as ResultState;
export const TasksRefreshStatus = (state: any) => state.tasks.refreshingStatus as ResultState;
export const SingleTask = (state: any) => state.tasks.selectedTask as Task;

export const FilteredTasks = (status: TaskTypes) =>
  createSelector(Tasks, (state: Task[]): GroupTask[] => {
    const allTasks = state.filter((task) => {
      switch (status) {
        case TaskTypes.MyTasks:
          // the taker is current logged user
          return task.taker.toLocaleLowerCase() === window.ethereum.selectedAddress.toLocaleLowerCase();
        case TaskTypes.Ongoing:
          // someone has claimed it therefore is in progress
          return task.taker !== NotTaken && task.status !== TaskStatus.Finished;
        case TaskTypes.Closed:
          return task.status === TaskStatus.Finished;
        case TaskTypes.Open:
          // are ongoing also considered open ???
          return task.taker === NotTaken;
        default:
          return false;
      }
    });

    if (status === TaskTypes.MyTasks) {
      const { openTasks, closedTasks } = allTasks.reduce(
        (prev, curr) => {
          if (curr.status === TaskStatus.Finished) {
            prev.closedTasks = [...prev.closedTasks, curr];
          } else {
            prev.openTasks = [...prev.openTasks, curr];
          }
          return prev;
        },
        {
          openTasks: [],
          closedTasks: [],
        }
      );
      return [
        {
          label: 'Your Open Tasks',
          tasks: openTasks,
        },
        {
          label: 'Your Closed Tasks',
          tasks: closedTasks,
        },
      ];
    }

    return [
      {
        label: '',
        tasks: allTasks,
      },
    ];
  });

export default tasksSlice.reducer;
