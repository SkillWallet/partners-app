import { ethers } from 'ethers';
import {
  Web3SkillWalletProvider,
  Web3PartnersAgreementProvider,
  ActivitiesContractEventType,
  Web3ActivitiesProvider,
} from '@skill-wallet/sw-abi-types';
import { Task, TaskStatus } from '@store/model';
import axios from 'axios';
import { ActivityTypes } from './api.model';
import { ipfsCIDToHttpUrl, storeMetadata } from './textile.api';
import { getSkillwalletAddress } from './skillwallet.api';
import { deployActivities } from './ProviderFactory/deploy-activities';
import { Web3ThunkProviderFactory } from './ProviderFactory/web3-thunk.provider';

const activitiesThunkProvider = Web3ThunkProviderFactory('Activities', {
  provider: Web3ActivitiesProvider,
});

export const getActivitiesAddress = async (address: string) => {
  const contract = await Web3PartnersAgreementProvider(address);
  return contract.activities();
};

export const addActivityTask = activitiesThunkProvider(
  {
    type: 'partner/activities/task/add',
    event: ActivitiesContractEventType.ActivityCreated,
  },
  async (thunkAPI) => {
    const { partner, community } = thunkAPI.getState();
    const paCommunity = partner?.paCommunity;
    const contract = await Web3PartnersAgreementProvider(paCommunity.partnersAgreementAddress);
    let activitiesAddress = await contract.getActivitiesAddress();
    if (activitiesAddress === ethers.constants.AddressZero) {
      activitiesAddress = await deployActivities(community.community.address);
      await contract.setActivities(activitiesAddress, ethers.constants.AddressZero);
    }
    return Promise.resolve(activitiesAddress);
  },
  async (contract, task, { getState }) => {
    const { community, auth } = getState();
    const { userInfo } = auth;
    const { role, isCoreTeamMembersOnly, allParticipants, participants, description, title } = task;

    const selectedRole = community.community.roles.roles.find(({ roleName }) => roleName === role);

    const metadata = {
      name: title,
      description,
      image: community.community.image,
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
    const result = await contract.createTask(uri);
    return result;
  }
);

export const takeActivityTask = activitiesThunkProvider(
  {
    type: 'partner/activities/task/take',
    event: ActivitiesContractEventType.TaskTaken,
  },
  async (thunkAPI) => {
    const { partner } = thunkAPI.getState();
    const paCommunity = partner?.paCommunity;
    const contract = await Web3PartnersAgreementProvider(paCommunity.partnersAgreementAddress);
    const activitiesAddress = await contract.getActivitiesAddress();
    return Promise.resolve(activitiesAddress);
  },
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
    event: ActivitiesContractEventType.ActivityFinalized,
  },
  async (thunkAPI) => {
    const { partner } = thunkAPI.getState();
    const paCommunity = partner?.paCommunity;
    const contract = await Web3PartnersAgreementProvider(paCommunity.partnersAgreementAddress);
    const activitiesAddress = await contract.getActivitiesAddress();
    return Promise.resolve(activitiesAddress);
  },
  async (contract, requestData) => {
    await contract.finilizeTask(+requestData.activityId);
    return {
      ...requestData,
      taker: window.ethereum.selectedAddress,
      status: TaskStatus.Finished,
    };
  }
);

export const getAllTasks = activitiesThunkProvider(
  {
    type: 'partner/activities/tasks/getall',
  },
  async (thunkAPI) => {
    const { partner } = thunkAPI.getState();
    const paCommunity = partner?.paCommunity;
    const contract = await Web3PartnersAgreementProvider(paCommunity.partnersAgreementAddress);
    const activitiesAddress = await contract.getActivitiesAddress();
    return Promise.resolve(activitiesAddress);
  },
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
  async (thunkAPI) => {
    const { partner } = thunkAPI.getState();
    const paCommunity = partner?.paCommunity;
    const contract = await Web3PartnersAgreementProvider(paCommunity.partnersAgreementAddress);
    const activitiesAddress = await contract.getActivitiesAddress();
    return Promise.resolve(activitiesAddress);
  },
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
      const swContract = await Web3SkillWalletProvider(swAddress.skillWalletAddress);
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
