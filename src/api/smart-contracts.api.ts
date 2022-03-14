import { ethers } from 'ethers';
import {
  DitoCommunityAbi,
  PartnersRegistryABI,
  SWContractEventType,
  PartnersAgreementABI,
  CommunityRegistryAbi,
} from '@skill-wallet/sw-abi-types';
import { Task } from '@store/model';
import { Web3ContractProvider } from './web3.provider';
import { ActivityTask, ActivityTypes, CommunityContractError, CommunityIntegration } from './api.model';
import { storeMetadata } from './textile.api';
import { generatePartnersKey } from './dito.api';
import { environment } from './environment';

function NoEventException(value: CommunityContractError) {
  this.value = value;
  this.message = 'No event found!';
  // eslint-disable-next-line func-names
  this.toString = function () {
    return this.value + this.message;
  };
}

export const createPartnersCommunity = async (
  communityRegistryAddress: string,
  metadata: CommunityIntegration,
  selectedtemplate: number
): Promise<string> => {
  const communityRegistryContract = await Web3ContractProvider(communityRegistryAddress, CommunityRegistryAbi);

  console.log(metadata);
  const url = await storeMetadata(metadata);
  console.log('Metadata url: ', url);

  const isPermissioned = environment.env === 'production';

  const createTx = await communityRegistryContract.createCommunity(
    url,
    selectedtemplate,
    100,
    10,
    isPermissioned,
    ethers.constants.AddressZero
  );

  const result = await createTx.wait();
  const event = result.events.find((e) => e.event === 'CommunityCreated');
  if (!event) {
    throw new NoEventException({
      code: -32603,
      message: 'Internal JSON-RPC error.',
      data: {
        code: 3,
        data: '',
        message: 'SkillWallet:CommunityCreatedEventMissing',
      },
    });
  }
  return event.args[0];
};

export const createPartnersAgreement = async (
  communityAddr: string,
  partnersRegistryAdress: string,
  metadata: CommunityIntegration,
  numOfActions: number,
  contractAddress: string
) => {
  const partnersRegistryContract = await Web3ContractProvider(partnersRegistryAdress, PartnersRegistryABI);

  const totalRoles = metadata.skills.roles.slice(0, 3).reduce((prev, curr) => {
    prev += curr.roleName ? 1 : 0;
    return prev;
  }, 0);

  const createTx = await partnersRegistryContract.create(
    communityAddr,
    totalRoles,
    numOfActions,
    contractAddress ?? ethers.constants.AddressZero
  );

  const result = await createTx.wait();
  const { events } = result;
  const event = events.find((e) => e.event === SWContractEventType.PartnersAgreementCreated);
  if (!event) {
    throw new NoEventException({
      code: -32603,
      message: 'Internal JSON-RPC error.',
      data: {
        code: 3,
        data: '',
        message: `SkillWallet:${SWContractEventType.PartnersAgreementCreated}`,
      },
    });
  }

  const partnersAddr = event.args[0].toString();

  const key = await generatePartnersKey(communityAddr, partnersAddr);
  return {
    key,
    communityAddr,
    partnersAddr,
  };
};

export const addAddressToWhitelist = async (communityAddress, memberAddress) => {
  const contract = await Web3ContractProvider(communityAddress, DitoCommunityAbi);
  const createTx = await contract.addNewCoreTeamMembers(memberAddress);
  const result = await createTx.wait();
  const event = result.events.find((e) => e.event === SWContractEventType.CoreTeamMemberAdded);
  if (!event) {
    throw new NoEventException({
      code: -32603,
      message: 'Internal JSON-RPC error.',
      data: {
        code: 3,
        data: '',
        message: 'SkillWallet:CoreTeamMemberAddedEventMissing',
      },
    });
  }
  return event.args;
};

export const addUrlToPA = async (partnersAgreementAddress, url) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  const createTx = await contract.addURL(url);
  const result = await createTx.wait();
  const { events } = result;
  const event = events.find((e) => e.event === SWContractEventType.UrlAdded);

  if (!event) {
    throw new NoEventException({
      code: -32603,
      message: 'Internal JSON-RPC error.',
      data: {
        code: 3,
        data: '',
        message: 'SkillWallet:UrlAddedEventMissing',
      },
    });
  }
  return event.args;
};

export const importContractToPA = async (partnersAgreementAddress: string, contractAddress: string) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  const createTx = await contract.addNewContractAddressToAgreement(contractAddress);

  const result = await createTx.wait();
  const { events } = result;
  const event = events.find((e) => e.event === SWContractEventType.PartnersContractAdded);

  if (!event) {
    throw new NoEventException({
      code: -32603,
      message: 'Internal JSON-RPC error.',
      data: {
        code: 3,
        data: '',
        message: 'SkillWallet:PartnersContractAddedEventMissing',
      },
    });
  }
  return event.args;
};

export const getPAUrl = async (partnersAgreementAddress) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  const urls = await contract.getURLs();
  console.log('urls', urls);
  return urls?.length > 0 ? urls[urls.length - 1] : undefined;
};

export const getActivitiesAddress = async (partnersAgreementAddress: string) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  return contract.activities();
};

export const getImportedContracts = async (partnersAgreementAddress) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  return contract.getImportedAddresses();
};

export const getWhitelistedAddresses = async (communityAddress: string) => {
  const contract = await Web3ContractProvider(communityAddress, DitoCommunityAbi);
  return contract.getCoreTeamMembers();
};

export const updateAndSaveSkills = async (editedRole, community) => {
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
  console.log(uri);

  const contract = await Web3ContractProvider(community.address, DitoCommunityAbi);
  const tx = await contract.setMetadataUri(uri);
  return tx.wait();
};

// Create Task
export const createActivityTask = async (partnersAgreementAddress: string, requestData: ActivityTask) => {
  console.log('CreateTask - metadata: ', requestData);

  const convertBlobToFile = (blob: Blob) => new File([blob], 'community_image.jpeg');
  const uri = await storeMetadata(requestData, convertBlobToFile);
  console.log('CreateTask - uri: ', uri);

  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  const activitiesAddress = await contract.getActivitiesAddress();
  if (activitiesAddress === ethers.constants.AddressZero) {
    const depTx = await contract.deployActivities('0xcB42EB843a6136bFB759d3C4aF3FE14A7e5C123C');
    await depTx.wait();
  }
  const tx = await contract.createActivity(ActivityTypes.CoreTeamTask, uri);
  return tx.wait();
};

export const takeActivityTask = async (partnersAgreementAddress: string, requestData: Task) => {
  console.log('TakeTask: ', requestData);

  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  const tx = await contract.takeTask(+requestData.activityId);
  const result = await tx.wait();
  const { events } = result;
  // @ts-ignore
  const event = events.find((e) => e.event === 'TaskTaken');
  // if (!event) {
  //   throw new NoEventException({
  //     code: -32603,
  //     message: 'Internal JSON-RPC error.',
  //     data: {
  //       code: 3,
  //       data: '',
  //       message: 'SkillWallet:TaskTakenEventMissing',
  //     },
  //   });
  // }
  // return event.args;
};

export const finalizeActivityTask = async (partnersAgreementAddress: string, requestData: Task) => {
  console.log('FinalizeTask: ', requestData);

  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  const tx = await contract.finilizeTask(+requestData.activityId);
  const result = await tx.wait();
  const { events } = result;
  // @ts-ignore
  const event = events.find((e) => e.event === 'TaskTaken');
  // if (!event) {
  //   throw new NoEventException({
  //     code: -32603,
  //     message: 'Internal JSON-RPC error.',
  //     data: {
  //       code: 3,
  //       data: '',
  //       message: 'SkillWallet:TaskTakenEventMissing',
  //     },
  //   });
  // }
  // return event.args;
};
