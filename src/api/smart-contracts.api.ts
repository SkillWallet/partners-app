import { ethers } from 'ethers';
import {
  PartnersRegistryContractEventType,
  PartnersAgreementContractEventType,
  Web3SkillWalletProvider,
  Web3CommunityRegistryProvider,
  CommunityRegistryContractEventType,
  CommunityRegistryContractFunctions,
  Web3PartnersRegistryProvider,
  PartnersRegistryContractFunctions,
  SkillWalletCommunityContractFunctions,
  Web3SkillWalletCommunityProvider,
  Web3PartnersAgreementProvider,
  PartnersAgreementContractFunctions,
  Web3ActivitiesProvider,
  ActivitiesContractEventType,
  ActivitiesContractFunctions,
  SkillWalletCommunityContractEventType,
} from '@skill-wallet/sw-abi-types';
import { TaskStatus } from '@store/model';
import { CommunityIntegration } from './api.model';
import { storeMetadata } from './textile.api';
import { generatePartnersKey, getCommunityByCommunityAddress } from './dito.api';
import { environment } from './environment';
import { addCoreTeamName, getCoreTeamMemberNames, getSkillwalletAddress } from './skillwallet.api';
import { Web3ThunkProviderFactory } from './ProviderFactory/web3-thunk.provider';
import { deployActivities } from './ProviderFactory/ActivityDeployment/deploy-activities';

const communityRegistryThunkProvider = Web3ThunkProviderFactory<CommunityRegistryContractFunctions>('CommunityRegistry', {
  provider: Web3CommunityRegistryProvider,
});

const partnersRegistryThunkProvider = Web3ThunkProviderFactory<PartnersRegistryContractFunctions>('PartnersRegistry', {
  provider: Web3PartnersRegistryProvider,
});

const partnersCommunityThunkProvider = Web3ThunkProviderFactory<SkillWalletCommunityContractFunctions>('PartnersCommunity', {
  provider: Web3SkillWalletCommunityProvider,
});

const partnersAgreementThunkProvider = Web3ThunkProviderFactory<PartnersAgreementContractFunctions>('PartnersAgreement', {
  provider: Web3PartnersAgreementProvider,
});

const activitiesThunkProvider = Web3ThunkProviderFactory<ActivitiesContractFunctions>('Activities', {
  provider: Web3ActivitiesProvider,
});

export const createPartnersCommunity = communityRegistryThunkProvider(
  {
    type: 'integrate/create/community',
    event: CommunityRegistryContractEventType.CommunityCreated,
  },
  () => {
    return Promise.resolve(environment.communityRegistryAddress);
  },
  async (contract, requestBody: { metadata: CommunityIntegration; selectedTemplate: number }, { getState }) => {
    const swAddress = await getSkillwalletAddress();
    const swContract = await Web3SkillWalletProvider(swAddress.skillWalletAddress);
    const { selectedAddress } = window.ethereum;
    let tokenId: number;
    try {
      tokenId = await swContract.getSkillWalletIdByOwner(selectedAddress);
    } catch (error) {
      console.error(error);
    }
    if (tokenId) {
      throw new Error('SkillWallet already belongs to a community.');
    }

    const { metadata, selectedTemplate } = requestBody;
    const url = await storeMetadata(metadata);
    console.log('Metadata url: ', url);
    const isPermissioned = environment.env === 'production';
    const totalMembersAllowed = 100;
    const coreTeamMembersCount = 10;
    const response = await contract.createCommunity(
      url,
      selectedTemplate,
      totalMembersAllowed,
      coreTeamMembersCount,
      isPermissioned,
      ethers.constants.AddressZero
    );
    return response[0];
  }
);

export const createPartnersAgreement = partnersRegistryThunkProvider(
  {
    type: 'integrate/create/agreement',
    event: PartnersRegistryContractEventType.PartnersAgreementCreated,
  },
  () => {
    return Promise.resolve(environment.partnersRegistryAdress);
  },
  async (
    contract,
    requestBody: {
      metadata: CommunityIntegration;
      numOfActions: number;
      contractAddress: string;
    },
    { getState }
  ) => {
    const { integrate } = getState();
    const { metadata, numOfActions, contractAddress } = requestBody;

    const totalRoles = metadata.skills.roles.slice(0, 3).reduce((prev, curr) => {
      prev += curr.roleName ? 1 : 0;
      return prev;
    }, 0);

    const response = await contract.create(
      integrate.communityAddr,
      totalRoles,
      numOfActions,
      contractAddress ?? ethers.constants.AddressZero
    );
    const partnersAddr = response[0].toString();
    const key = await generatePartnersKey(integrate.communityAddr, partnersAddr);
    return {
      key,
      communityAddr: integrate.communityAddr,
      partnersAddr,
    };
  }
);

export const getWhitelistedAddresses = partnersCommunityThunkProvider(
  {
    type: 'partner/addresses/get',
  },
  (thunkAPI) => {
    const { auth } = thunkAPI.getState();
    return Promise.resolve(auth.userInfo.community);
  },
  async (contract, _, { getState }) => {
    const { auth } = getState();
    const memberAddresses = await contract.getCoreTeamMembers();
    const names = await getCoreTeamMemberNames(auth.userInfo.community);
    return memberAddresses.map((a) => ({
      address: a,
      name: names.coreTeamMembers.find((c) => c.memberAddress === a)?.memberName || 'N/A',
    }));
  }
);

export const addNewWhitelistedAddresses = partnersCommunityThunkProvider(
  {
    type: 'partner/addresses/add',
    event: SkillWalletCommunityContractEventType.CoreTeamMemberAdded,
  },
  (thunkAPI) => {
    const { auth } = thunkAPI.getState();
    return Promise.resolve(auth?.userInfo?.community);
  },
  async (contract, newMembers, { dispatch, getState }) => {
    const { auth } = getState();
    for (const newMember of newMembers) {
      await contract.addNewCoreTeamMembers(newMember.address);
      await addCoreTeamName(auth?.userInfo?.community, newMember.address, newMember.name);
    }
    return dispatch(getWhitelistedAddresses(auth.userInfo.community));
  }
);

export const getPAUrl = partnersAgreementThunkProvider(
  {
    type: 'partner/url/get',
  },
  (thunkAPI) => {
    const { partner } = thunkAPI.getState();
    const paCommunity = partner?.paCommunity;
    return Promise.resolve(paCommunity.partnersAgreementAddress);
  },
  async (contract) => {
    const urls = await contract.getURLs();
    return urls?.length > 0 ? urls[urls.length - 1] : undefined;
  }
);

export const addPAUrl = partnersAgreementThunkProvider(
  {
    type: 'partner/url/add',
    event: PartnersAgreementContractEventType.UrlAdded,
  },
  (thunkAPI) => {
    const { partner } = thunkAPI.getState();
    const paCommunity = partner?.paCommunity;
    return Promise.resolve(paCommunity.partnersAgreementAddress);
  },
  async (contract, daoUrl, { dispatch, getState }) => {
    await contract.addURL(daoUrl);
    return dispatch(getPAUrl(null));
  }
);

export const getPAContracts = partnersAgreementThunkProvider(
  {
    type: 'partner/contracts/get',
  },
  (thunkAPI) => {
    const { partner } = thunkAPI.getState();
    const paCommunity = partner?.paCommunity;
    return Promise.resolve(paCommunity.partnersAgreementAddress);
  },
  async (contract) => {
    const contracts = await contract.getImportedAddresses();
    return contracts;
  }
);

export const addPAContracts = partnersAgreementThunkProvider(
  {
    type: 'partner/contracts/add',
    event: PartnersAgreementContractEventType.PartnersContractAdded,
  },
  (thunkAPI) => {
    const { partner } = thunkAPI.getState();
    const paCommunity = partner?.paCommunity;
    return Promise.resolve(paCommunity.partnersAgreementAddress);
  },
  async (contract, payload: any, { dispatch }) => {
    const { newItems } = payload;
    for (const item of newItems) {
      await contract.addNewContractAddressToAgreement(item.address);
    }
    return dispatch(getPAContracts(null));
  }
);

export const getActivitiesAddress = async (address: string) => {
  const contract = await Web3PartnersAgreementProvider(address);
  return contract.activities();
};

export const updatePartnersCommunity = partnersCommunityThunkProvider(
  {
    type: 'partner/community/update',
  },
  (thunkAPI) => {
    const { auth } = thunkAPI.getState();
    return Promise.resolve(auth?.userInfo?.community);
  },
  async (contract, payload: any) => {
    const { editedRole, community } = payload;
    const updatedRoles = community.roles.roles.map((r) => {
      if (r.roleName === editedRole.roleName) {
        return editedRole;
      }
      return r;
    });

    const jsonMetadata = {
      properties: {
        template: community.template,
      },
      title: community.name,
      description: community.description,
      image: community.image,
      skills: {
        roles: updatedRoles,
      },
    };
    console.log('metadata: ', jsonMetadata);

    const uri = await storeMetadata(jsonMetadata);
    await contract.setMetadataUri(uri);
    return getCommunityByCommunityAddress(community.address);
  }
);

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
  async (contract, task: any, { getState }) => {
    const { community, auth }: any = getState();
    const { userInfo } = auth;
    const { role, isCoreTeamMembersOnly, allParticipants, participants, description, title } = task;
    const selectedRole = community.roles.find(({ roleName }) => roleName === role);

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
  async (contract, requestData: any) => {
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
  async (contract, requestData: any) => {
    await contract.finilizeTask(+requestData.activityId);
    return {
      ...requestData,
      taker: window.ethereum.selectedAddress,
      status: TaskStatus.Finished,
    };
  }
);
