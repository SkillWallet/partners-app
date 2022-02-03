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
import { pushImage, pushJSONDocument } from './textile.api';
import { ActivityTask, ActivityTypes, CommunityContractError, CommunityIntegration } from './api.model';
import { generatePartnersKey } from './dito.api';

function NoEventException(value: CommunityContractError) {
  this.value = value;
  this.message = 'No event found!';
  // eslint-disable-next-line func-names
  this.toString = function () {
    return this.value + this.message;
  };
}

export const createPartnersAgreement = async (
  communityRegistryAddress: string,
  partnersRegistryAdress: string,
  metadata: CommunityIntegration,
  numOfActions: number,
  contractAddress: string,
  selectedtemplate: number
) => {
  const partnersRegistryContract = await Web3ContractProvider(partnersRegistryAdress, PartnersRegistryABI);
  const communityRegistryContract = await Web3ContractProvider(communityRegistryAddress, CommunityRegistryAbi);

  if (metadata.image) {
    const arrayBuffer = await (metadata.image as File).arrayBuffer();
    metadata.image = await pushImage(arrayBuffer);
  }

  const url = await pushJSONDocument(metadata, `metadata.json`);
  console.log('Metadata url: ', url);

  const totalRoles = metadata.skills.roles.slice(0, 3).reduce((prev, curr) => {
    prev += curr.roleName ? 1 : 0;
    return prev;
  }, 0);

  const isPermissioned = process.env.REACT_APP_NODE_ENV === 'production';

  const createCommunityTx = await communityRegistryContract.createCommunity(
    url,
    selectedtemplate,
    100,
    10,
    isPermissioned,
    ethers.constants.AddressZero
  );

  const createComRes = await createCommunityTx.wait();
  const createComEvent = createComRes.events.find((e) => e.event === 'CommunityCreated');
  const communityAddress = createComEvent.args[0];

  const createTx = await partnersRegistryContract.create(
    communityAddress,
    totalRoles,
    numOfActions,
    contractAddress ?? ethers.constants.AddressZero
  );

  const result = await createTx.wait();
  const { events } = result;
  const event = events.find((e) => e.event === SWContractEventType.PartnersAgreementCreated);

  const partnersAgreementAddress = event.args[0].toString();
  const key = await generatePartnersKey(communityAddress, partnersAgreementAddress);
  return {
    key,
    communityAddr: communityAddress,
    partnersAddr: partnersAgreementAddress,
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

  const uri = await pushJSONDocument(jsonMetadata, `metadata.json`);
  console.log(uri);

  const contract = await Web3ContractProvider(community.address, DitoCommunityAbi);
  const tx = await contract.setMetadataUri(uri);
  return tx.wait();
};

// Create Task
export const createActivityTask = async (partnersAgreementAddress: string, requestData: ActivityTask) => {
  console.log('CreateTask - metadata: ', requestData);

  const uri = await pushJSONDocument(requestData, `metadata.json`);
  console.log('CreateTask - uri: ', uri);

  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  const tx = await contract.createActivity(ActivityTypes.CoreTeamTask, uri);
  return tx.wait();
};

export const takeActivityTask = async (partnersAgreementAddress: string, requestData: Task) => {
  console.log('TakeTask: ', requestData);

  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  const tx = await contract.takeTask(+requestData.activityId);
  const result = await tx.wait();
  const { events } = result;
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

console.log(PartnersAgreementABI, 'PartnersAgreementABI');
