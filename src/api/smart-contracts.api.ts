import { ethers } from 'ethers';
import {
  DitoCommunityAbi,
  PartnersRegistryABI,
  SWContractEventType,
  PartnersAgreementABI,
  CommunityRegistryAbi,
  SkillWalletAbi,
} from '@skill-wallet/sw-abi-types';
import { Task } from '@store/model';
import { deployActivities, Web3ContractProvider } from './web3.provider';
import { ActivityTask, ActivityTypes, CommunityContractError, CommunityIntegration } from './api.model';
import { storeMetadata } from './textile.api';
import { generatePartnersKey } from './dito.api';
import { environment } from './environment';
import { getSkillwalletAddress } from './skillwallet.api';

const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_community",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_discordBotAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum Activities.Type",
        "name": "_type",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      }
    ],
    "name": "ActivityCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum Activities.Type",
        "name": "_type",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      }
    ],
    "name": "ActivityFinalized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_activityId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_taskId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_taker",
        "type": "address"
      }
    ],
    "name": "TaskFinalized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_activityId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_taskId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_taker",
        "type": "address"
      }
    ],
    "name": "TaskTaken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "activityToTask",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "baseURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "community",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_type",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      }
    ],
    "name": "createActivity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      }
    ],
    "name": "createTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "discordBotAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_uri",
        "type": "string"
      },
      {
        "internalType": "address[]",
        "name": "members",
        "type": "address[]"
      }
    ],
    "name": "finalizeActivity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_activityId",
        "type": "uint256"
      }
    ],
    "name": "finilizeTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_type",
        "type": "uint256"
      }
    ],
    "name": "getActivitiesByType",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getInteractionsAddr",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_activityId",
        "type": "uint256"
      }
    ],
    "name": "getTaskByActivityId",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "activityId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "createdOn",
            "type": "uint256"
          },
          {
            "internalType": "enum Activities.TaskStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "taker",
            "type": "address"
          }
        ],
        "internalType": "struct Activities.Task",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "idTypes",
    "outputs": [
      {
        "internalType": "enum Activities.Type",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "isFinalized",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_activityId",
        "type": "uint256"
      }
    ],
    "name": "takeTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tasks",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "activityId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "createdOn",
        "type": "uint256"
      },
      {
        "internalType": "enum Activities.TaskStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "taker",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

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
  const swAddress = await getSkillwalletAddress();

  const skillWalletContract = await Web3ContractProvider(swAddress.skillWalletAddress, SkillWalletAbi);
  const { selectedAddress } = window.ethereum;
  let tokenId;
  try {
    tokenId = await skillWalletContract.getSkillWalletIdByOwner(selectedAddress);
  } catch (e) {
    console.log(e);
  }
  if (tokenId) {
    throw new Error('SkillWallet already belongs to a community.');
  }

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
export const createActivityTask = async (communityAddress: string, partnersAgreementAddress: string, requestData: ActivityTask) => {
  console.log('CreateTask - metadata: ', requestData);

  const convertBlobToFile = (blob: Blob) => new File([blob], 'community_image.jpeg');
  const uri = await storeMetadata(requestData, convertBlobToFile);
  console.log('CreateTask - uri: ', uri);

  const contract = await Web3ContractProvider(partnersAgreementAddress, PartnersAgreementABI);
  let activitiesAddress = await contract.getActivitiesAddress();
  if (activitiesAddress === ethers.constants.AddressZero) {
     activitiesAddress = await deployActivities(communityAddress);
  }

  const activitiesContract = await Web3ContractProvider(activitiesAddress, abi);
  const tx = await activitiesContract.createActivity(ActivityTypes.CoreTeamTask, uri);
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
