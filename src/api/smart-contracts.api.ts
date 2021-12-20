import { ethers } from 'ethers';
import { communityABI } from './abis/ICommunity.abi';
import { partnersAgreementABI } from './abis/PartnersAgreement.abi';
import { partnersRegistryABI } from './abis/PartnersRegistry.abi';
import { environment } from './environment';
import { Web3ContractProvider } from './web3.provider';
import { generatePartnersKey } from './skillwallet.api';
import { pushJSONDocument } from './textile.api';

const metadata = [
  {
    properties: {
      template: 'Open-Source & DeFi',
    },
  },
  {
    properties: {
      template: 'Art, Events & NFTs',
    },
  },
  {
    properties: {
      template: 'Local Projects & DAOs',
    },
  },
];

export const createPartnersAgreement = async (template, title, description, roles, numberOfActions, contractAddress) => {
  const contract = await Web3ContractProvider(environment.partnersRegistryAdress, partnersRegistryABI);

  // here's where my metadata is set.
  const jsonMetadata: any = metadata[template];
  jsonMetadata.title = title;
  jsonMetadata.description = description;
  console.log('roles setter: ', roles);
  jsonMetadata.skills = {
    roles: [
      {
        credits: 24,
        roleName: roles[0],
        skills: [],
        isCoreTeamMember: false,
      },
      {
        credits: 12,
        roleName: roles[1],
        skills: [],
        isCoreTeamMember: false,
      },
      {
        credits: 6,
        roleName: roles[2],
        skills: [],
        isCoreTeamMember: false,
      },
      {
        credits: 24,
        roleName: 'Founder',
        skills: [],
        isCoreTeamMember: true,
      },
      {
        credits: 12,
        roleName: 'Investor',
        skills: [],
        isCoreTeamMember: true,
      },
      {
        credits: 6,
        roleName: 'Contributor',
        skills: [],
        isCoreTeamMember: true,
      },
    ],
  };
  jsonMetadata.image = window.sessionStorage.getItem('imageUrl');

  console.log('metadata: ', jsonMetadata);

  const url = await pushJSONDocument(jsonMetadata, `metadata.json`);
  console.log(url);

  console.log('calling the SC');
  const createTx = await contract.create(
    url,
    template,
    roles.length,
    // @ts-ignore
    numberOfActions, // number of Actions,
    contractAddress ?? ethers.constants.AddressZero, // contract address
    100, // members
    10 // coreTeamMembers
  );

  console.log(createTx);

  const result = await createTx.wait();
  const { events } = result;
  console.log(events);

  // @ts-ignore
  const event = events.find((e) => e.event === 'PartnersAgreementCreated');

  const partnersAgreementAddress = event.args[0].toString();
  const communityAddress = event.args[1].toString();

  console.log('partnersAgreementAddress', partnersAgreementAddress);
  console.log('communityAddress', communityAddress);
  const key = await generatePartnersKey(communityAddress, partnersAgreementAddress);
  console.log('key', key);
  return {
    key,
    communityAddr: communityAddress,
    partnersAddr: partnersAgreementAddress,
  };
};

export const addAddressToWhitelist = async (partnersAgreementAddress, memberAddress) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, partnersAgreementABI);
  const createTx = await contract.addNewCoreTeamMembers(memberAddress);
  console.log(createTx);
  return createTx.wait();
};

export const addUrlToPA = async (partnersAgreementAddress, url) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, partnersAgreementABI);
  const createTx = await contract.addURL(url);
  return createTx.wait();
};

export const importContractToPA = async (partnersAgreementAddress: string, contractAddress: string) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, partnersAgreementABI);
  const createTx = await contract.addNewContractAddressToAgreement(contractAddress);

  return createTx.wait();
};

export const getPAUrl = async (partnersAgreementAddress) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, partnersAgreementABI);
  const urls = await contract.getURLs();
  console.log('urls', urls);
  return urls?.length > 0 ? urls[urls.length - 1] : undefined;
};

export const getImportedContracts = async (partnersAgreementAddress) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, partnersAgreementABI);
  return contract.getImportedAddresses();
};

export const getWhitelistedAddresses = async (partnersAgreementAddress: string) => {
  const contract = await Web3ContractProvider(partnersAgreementAddress, partnersAgreementABI);
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

  const contract = await Web3ContractProvider(community.address, communityABI);
  const tx = await contract.setMetadataUri(uri);
  return tx.wait();
};
