import {
  CommunityRegistryContractEventType,
  PartnersRegistryContractEventType,
  Web3CommunityRegistryProvider,
  Web3PartnersRegistryProvider,
  Web3SkillWalletProvider,
} from '@skill-wallet/sw-abi-types';
import { ethers } from 'ethers';
import { Community } from './community.model';
import { generatePartnersKey } from './dito.api';
import { environment, EnvMode } from './environment';
import { Web3ThunkProviderFactory } from './ProviderFactory/web3-thunk.provider';
import { getSkillwalletAddress } from './skillwallet.api';
import { storeMetadata } from './textile.api';

const communityRegistryThunkProvider = Web3ThunkProviderFactory('CommunityRegistry', {
  provider: Web3CommunityRegistryProvider,
});

const partnersRegistryThunkProvider = Web3ThunkProviderFactory('PartnersRegistry', {
  provider: Web3PartnersRegistryProvider,
});

export const createPartnersCommunity = communityRegistryThunkProvider(
  {
    type: 'integrate/create/community',
    event: CommunityRegistryContractEventType.CommunityCreated,
  },
  () => {
    return Promise.resolve(environment.communityRegistryAddress);
  },
  async (contract, requestBody: { metadata: Community; selectedTemplate: number }, { getState }) => {
    const swAddress = await getSkillwalletAddress();
    const swContract = await Web3SkillWalletProvider(swAddress);
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
    const isPermissioned = environment.env === EnvMode.Production;
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
      community: Community;
      numOfActions: number;
      contractAddress: string;
    },
    { getState }
  ) => {
    const { integrate } = getState();
    const { community, numOfActions, contractAddress } = requestBody;

    const totalRoles = community.properties.skills.roles.slice(0, 3).reduce((prev, curr) => {
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
