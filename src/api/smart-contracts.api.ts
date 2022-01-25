import { ethers } from 'ethers';
import { DitoCommunityAbi, JsonFragment, PartnersRegistryABI, SWContractEventType } from '@skill-wallet/sw-abi-types';
import { Task } from '@store/model';
import { Web3ContractProvider } from './web3.provider';
import { pushImage, pushJSONDocument } from './textile.api';
import { ActivityTask, ActivityTypes, CommunityContractError, CommunityIntegration } from './api.model';
import { generatePartnersKey } from './dito.api';

export const PartnersAgreementABI: JsonFragment[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_membershipFactory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_interactionNFTFactory',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'version',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'communityAddress',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: 'partnersContracts',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'rolesCount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'interactionContract',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'membershipContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'interactionsCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'coreTeamMembersCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'whitelistedTeamMembers',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: 'interactionsQueryServer',
            type: 'address',
          },
        ],
        internalType: 'struct Types.PartnersAgreementData',
        name: 'pa',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_member',
        type: 'address',
      },
    ],
    name: 'CoreTeamMemberAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_contract',
        type: 'address',
      },
    ],
    name: 'PartnersContractAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: '_url',
        type: 'string',
      },
    ],
    name: 'UrlAdded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'activatePA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'activities',
    outputs: [
      {
        internalType: 'contract IActivities',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
    ],
    name: 'addNewContractAddressToAgreement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
    ],
    name: 'addNewCoreTeamMembers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_url',
        type: 'string',
      },
    ],
    name: 'addURL',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'communityAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'coreTeamMembersCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_type',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_uri',
        type: 'string',
      },
    ],
    name: 'createActivity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_factory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_bot',
        type: 'address',
      },
    ],
    name: 'deployActivities',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_activityId',
        type: 'uint256',
      },
    ],
    name: 'finilizeTask',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAgreementData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'version',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'communityAddress',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: 'partnersContracts',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'rolesCount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'interactionContract',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'membershipContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'interactionsCount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'coreTeamMembersCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'whitelistedTeamMembers',
            type: 'address[]',
          },
          {
            internalType: 'address',
            name: 'interactionsQueryServer',
            type: 'address',
          },
        ],
        internalType: 'struct Types.PartnersAgreementData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllMembers',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCoreTeamMembers',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getImportedAddresses',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getInteractionNFT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getInteractionNFTContractAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getURLs',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isActive',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isCoreTeamMember',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_url',
        type: 'string',
      },
    ],
    name: 'isURLListed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'membershipAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'partnersContracts',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_url',
        type: 'string',
      },
    ],
    name: 'removeURL',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rolesCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_activityId',
        type: 'uint256',
      },
    ],
    name: 'takeTask',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'TaskTaken',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amountOfInteractions',
        type: 'uint256',
      },
    ],
    name: 'transferInteractionNFTs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'urls',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

function NoEventException(value: CommunityContractError) {
  this.value = value;
  this.message = 'No event found!';
  // eslint-disable-next-line func-names
  this.toString = function () {
    return this.value + this.message;
  };
}

export const createPartnersAgreement = async (
  partnersRegistryAdress: string,
  metadata: CommunityIntegration,
  numOfActions: number,
  contractAddress: string,
  selectedtemplate: number
) => {
  const contract = await Web3ContractProvider(partnersRegistryAdress, PartnersRegistryABI);
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

  const createTx = await contract.create(
    url,
    selectedtemplate,
    totalRoles,
    numOfActions,
    contractAddress ?? ethers.constants.AddressZero,
    100,
    10,
    true
  );

  const result = await createTx.wait();
  const { events } = result;
  const event = events.find((e) => e.event === SWContractEventType.PartnersAgreementCreated);

  const partnersAgreementAddress = event.args[0].toString();
  const communityAddress = event.args[1].toString();
  const key = await generatePartnersKey(communityAddress, partnersAgreementAddress);
  return {
    key,
    communityAddr: communityAddress,
    partnersAddr: partnersAgreementAddress,
  };
};

export const addAddressToWhitelist = async (partnersAgreementAddress, memberAddress) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
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

export const getWhitelistedAddresses = async (partnersAgreementAddress: string) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
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
  const event = events.find((e) => e.event === SWContractEventType.TaskTaken);
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
  const event = events.find((e) => e.event === SWContractEventType.TaskTaken);
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
