import { ethers } from 'ethers';
import {
  Web3SkillWalletProvider,
  Web3PartnersAgreementProvider,
  ActivitiesContractEventType,
  Web3ActivitiesProvider,
} from '@skill-wallet/sw-abi-types';
import { Task, TaskStatus } from '@store/model';
import axios from 'axios';
import { dateToUnix } from '@utils/date-format';
import { sendDiscordNotification, sendDiscordPoll } from '@store/ui-reducer';
import { format } from 'date-fns';
import { ActivityTypes } from './api.model';
import { ipfsCIDToHttpUrl, storeAsBlob, storeMetadata } from './textile.api';
import { getSkillwalletAddress } from './skillwallet.api';
import { deployActivities } from './ProviderFactory/deploy-activities';
import { Web3ThunkProviderFactory } from './ProviderFactory/web3-thunk.provider';
import { Community } from './community.model';
import { AsyncThunkConfig, GetThunkAPI } from './ProviderFactory/web3.thunk.type';
import { DiscordMessage } from './discord.api';
import { environment } from './environment';

const activitiesThunkProvider = Web3ThunkProviderFactory('Activities', {
  provider: Web3ActivitiesProvider,
});

const contractAddress = async (thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
  const { partner } = thunkAPI.getState();
  const paCommunity = partner?.paCommunity;
  const contract = await Web3PartnersAgreementProvider(paCommunity.partnersAgreementAddress);
  let activitiesAddress = await contract.getActivitiesAddress();
  if (activitiesAddress === ethers.constants.AddressZero) {
    activitiesAddress = await deployActivities(paCommunity.communityAddress, environment.discordBotAddress);
    await contract.setActivities(activitiesAddress, ethers.constants.AddressZero);
  }
  return Promise.resolve(activitiesAddress);
};

export const addActivityTask = activitiesThunkProvider(
  {
    type: 'partner/activities/task/add',
    event: ActivitiesContractEventType.ActivityCreated,
  },
  contractAddress,
  async (contract, task, { getState, dispatch }) => {
    const state = getState();
    const { userInfo } = state.auth;
    const { role, isCoreTeamMembersOnly, allParticipants, participants, description, title } = task;
    const community = state.community.community as Community;
    const selectedRole = community.properties.skills.roles.find(({ roleName }) => roleName === role);

    if (!selectedRole) {
      throw new Error('Role is missing!');
    }

    const metadata = {
      name: title,
      description,
      image: community.image,
      properties: {
        creator: userInfo.nickname,
        creatorSkillWalletId: window.ethereum.selectedAddress,
        role: selectedRole,
        roleId: role,
        participants,
        allParticipants,
        description,
        title,
        isCoreTeamMembersOnly,
      },
    };
    const uri = await storeMetadata(metadata);
    console.log('CreateTask - uri: ', uri);
    const result = await contract.createTask(selectedRole.id, uri);
    const discordMessage: DiscordMessage = {
      title: `New Community Task`,
      description: `${allParticipants ? 'All' : participants} **${selectedRole.roleName}** participants can claim the task`,
      fields: [
        {
          name: 'Title',
          value: title,
        },
        {
          name: 'Description',
          value: description,
        },
      ],
    };
    await dispatch(sendDiscordNotification(discordMessage));
    return result;
  }
);

export const takeActivityTask = activitiesThunkProvider(
  {
    type: 'partner/activities/task/take',
    event: ActivitiesContractEventType.TaskTaken,
  },
  contractAddress,
  async (contract, requestData) => {
    await contract.takeTask(+requestData.activityId);
    return {
      ...requestData,
      taker: window.ethereum.selectedAddress,
      status: TaskStatus.Taken,
    };
  }
);

export const finalizeActivityTask = activitiesThunkProvider(
  {
    type: 'partner/activities/task/finalize',
    event: ActivitiesContractEventType.TaskFinalized,
  },
  contractAddress,
  async (contract, requestData) => {
    await contract.finilizeTask(+requestData.activityId);
    return {
      ...requestData,
      taker: window.ethereum.selectedAddress,
      status: TaskStatus.Finished,
    };
  }
);

export const submitActivityTask = activitiesThunkProvider(
  {
    type: 'partner/activities/task/submit',
    event: ActivitiesContractEventType.TaskSubmitted,
  },
  contractAddress,
  async (contract, { task, values }) => {
    const metadata = {
      title: task.title,
      description: values.description,
    };
    console.log('task: ', task);
    console.log('metadata: ', metadata);
    const uri = await storeAsBlob(metadata);
    console.log('activityId: ', +task.activityId);
    console.log('uri: ', uri);
    await contract.submitTask(+task.activityId, uri);
    console.log('here!!!');
    return {
      ...task,
      taker: window.ethereum.selectedAddress,
      status: TaskStatus.Submitted,
    };
  }
);

export const addGroupCall = activitiesThunkProvider(
  {
    type: 'partner/activities/group-call/add',
    event: ActivitiesContractEventType.ActivityCreated,
  },
  contractAddress,
  async (contract, callData, { getState, dispatch }) => {
    const state = getState();
    const { startDate, startTime, duration, allParticipants, participants, role } = callData;
    const community = state.community.community as Community;
    const selectedRole = community.properties.skills.roles.find(({ roleName }) => roleName === role);

    if (!selectedRole) {
      throw new Error('Role is missing!');
    }

    const start = new Date(startDate);
    const time = new Date(startTime);
    start.setHours(time.getHours());
    start.setMinutes(time.getMinutes());
    start.setSeconds(0);
    const metadata = {
      startTime: dateToUnix(start),
      duration,
      roleId: selectedRole.id,
      allParticipants,
      participants,
    };
    const uri = await storeAsBlob(metadata);
    console.log('CreateTask - uri: ', uri);
    const result = await contract.createActivity(ActivityTypes.CommunityCall, selectedRole.id, uri);
    const discordMessage: DiscordMessage = {
      title: 'New Community Call',
      description: `${allParticipants ? 'All' : participants} **${selectedRole.roleName}** participants can join the call`,
      fields: [
        {
          name: 'Date',
          value: format(start, 'PPPP'),
          inline: true,
        },
        {
          name: 'Time',
          value: format(time, 'hh:mm a'),
          inline: true,
        },
        {
          name: 'Duration',
          value: duration,
          inline: true,
        },
      ],
    };
    await dispatch(sendDiscordNotification(discordMessage));
    return result;
  }
);

export const publishPoll = (poll) => {
  return axios.post(`${environment.discordBotUrl}/poll`, poll).then((res) => res);
};

export const addPoll = activitiesThunkProvider(
  {
    type: 'partner/activities/poll/add',
    event: ActivitiesContractEventType.ActivityCreated,
  },
  contractAddress,
  async (contract, callData, { getState, dispatch }) => {
    const state = getState();
    const { title, description, duration, options, emojis, role, allRoles } = callData;

    const community = state.community.community as Community;
    const selectedRole = community.properties.skills.roles.find(({ roleName }) => roleName === role);
    let roleId = 0;
    let roleName = 'All';
    if (!allRoles) {
      roleId = selectedRole.id;
      roleName = selectedRole.roleName;
    }

    if (roleId === undefined || roleId === null) {
      throw new Error('RoleId missing!');
    }

    const metadata = {
      role: roleId,
      roleName,
      title,
      description,
      duration,
      options,
      emojis,
    };
    const uri = await storeAsBlob(metadata);
    console.log('CreatePoll - uri: ', uri);
    const result = await contract.createActivity(ActivityTypes.CommunityCall, roleId, uri);

    publishPoll({
      ...metadata,
      activitiesAddress: contract.contract.address,
      activityId: result[0].toString(),
    });

    return result;
  }
);

export const getAllTasks = activitiesThunkProvider(
  {
    type: 'partner/activities/tasks/getall',
  },
  contractAddress,
  async (contract, type: ActivityTypes) => {
    if (contract.contract.address === ethers.constants.AddressZero) {
      return [];
    }
    const activityIds = await contract.getActivitiesByType(type);
    const tasks = [];

    for (let i = 0; i < activityIds.length; i += 1) {
      const tokenCID = await contract.tokenURI(activityIds[i]);
      const response = await axios.get(tokenCID);
      const task: any = await contract.getTaskByActivityId(activityIds[i]);
      tasks.push({
        activityId: task.activityId.toString(),
        title: response.data.name,
        createdOn: task.createdOn.toString(),
        status: task.status,
        creator: task.creator.toString(),
        taker: task.taker.toString(),
        description: response.data.properties.description,
        isCoreTeamMembersOnly: response.data.properties.isCoreTeamMembersOnly,
      });
    }

    return tasks;
  }
);

export const getTaskById = activitiesThunkProvider(
  {
    type: 'partner/activities/tasks/get',
  },
  contractAddress,
  async (contract, activityID: string, { getState }) => {
    const {
      auth: { userInfo },
      tasks: { tasks, selectedTask },
    } = getState();

    let task = selectedTask;

    if (selectedTask?.activityId === activityID) {
      task = {
        task: selectedTask,
        taker: selectedTask.owner,
      };
    } else {
      task = null;
    }

    if (!task) {
      const existingTask: Task = tasks.find((t: Task) => t.activityId === activityID);
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

    const tokenCID = await contract.tokenURI(+activityID);
    const response = await axios.get(tokenCID);
    task = await contract.getTaskByActivityId(+activityID);
    const taskDetails = {
      taker: {},
      task: {
        task: undefined,
        activityId: task.activityId.toString(),
        title: response.data.name,
        createdOn: task.createdOn.toString(),
        status: task.status,
        creator: task.creator.toString(),
        taker: task.taker.toString(),
        description: response.data.properties.description,
        isCoreTeamMembersOnly: response.data.properties.isCoreTeamMembersOnly,
      },
    };

    if (taskDetails.task.status > 0) {
      const swAddress = await getSkillwalletAddress();
      const swContract = await Web3SkillWalletProvider(swAddress);
      const takerTokenId = await swContract.getSkillWalletIdByOwner(taskDetails.task.taker);
      const jsonUriCID = await swContract.tokenURI(takerTokenId);
      const response = await axios.get(ipfsCIDToHttpUrl(jsonUriCID, true));
      taskDetails.taker = {
        tokenId: takerTokenId.toString(),
        imageUrl: ipfsCIDToHttpUrl(response.data.image, false),
        nickname: response.data.properties.username,
        timestamp: undefined,
      };
    }
    return taskDetails;
  }
);
