import {
  Web3SkillWalletCommunityProvider,
  SkillWalletCommunityContractEventType,
  Web3SkillWalletProvider,
} from '@skill-wallet/sw-abi-types';
import axios from 'axios';
import { SkillWalletList } from './api.model';
import { Community } from './community.model';
import { Web3ThunkProviderFactory } from './ProviderFactory/web3-thunk.provider';
import { getCoreTeamMemberNames, addCoreTeamName, getSkillwalletAddress } from './skillwallet.api';
import { storeMetadata, ipfsCIDToHttpUrl } from './textile.api';

const partnersCommunityThunkProvider = Web3ThunkProviderFactory('PartnersCommunity', {
  provider: Web3SkillWalletCommunityProvider,
});

export const fetchCommunity = partnersCommunityThunkProvider(
  {
    type: 'partner/community/get',
  },
  (thunkAPI) => {
    const { auth } = thunkAPI.getState();
    return Promise.resolve(auth.userInfo.community);
  },
  async (contract, _) => {
    const uri = await contract.metadataUri();
    const metadata: Community = (await axios.get(uri)).data;
    const community = new Community(metadata);
    community.image = ipfsCIDToHttpUrl(community.image as string);
    return community;
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

export const updatePartnersCommunity = partnersCommunityThunkProvider(
  {
    type: 'partner/community/update',
  },
  (thunkAPI) => {
    const { auth } = thunkAPI.getState();
    return Promise.resolve(auth?.userInfo?.community);
  },
  async (contract, community) => {
    const uri = await storeMetadata(community);
    await contract.setMetadataUri(uri);
    return community;
  }
);

export const fetchMembers = partnersCommunityThunkProvider(
  {
    type: 'partner/community/members/get',
  },
  async (thunkAPI) => {
    const { auth } = thunkAPI.getState();
    return Promise.resolve(auth?.userInfo?.community);
  },
  async (contract, isCoreTeam, thunkAPI) => {
    const state = thunkAPI.getState();
    const skillWalletsResponse: { [role: string]: SkillWalletList[] } = {};

    let { community } = state.community;

    if (!community) {
      const response = await thunkAPI.dispatch(fetchCommunity(null));
      community = response.payload as Community;
    }

    const filteredRoles = (community as Community).properties.skills.roles
      .filter((r) => r.isCoreTeamMember === isCoreTeam)
      .map((r) => r.roleName) as string[];

    for (let i = 0; i < filteredRoles.length; i += 1) {
      skillWalletsResponse[filteredRoles[i]] = [];
    }

    const memberIds = await contract.getMembers();
    const swAddress = await getSkillwalletAddress();
    const swContract = await Web3SkillWalletProvider(swAddress);

    for (let i = 0; i < memberIds.length; i += 1) {
      const tokenId = memberIds[i];
      const isActive = (await swContract.isSkillWalletActivated(Number(tokenId.toString()))) as unknown as boolean;
      if (isActive) {
        const metadataCID = await swContract.tokenURI(Number(tokenId.toString()));
        const jsonUri = ipfsCIDToHttpUrl(metadataCID, true);
        const jsonMetadata = (await axios.get(jsonUri)).data;
        const [role] = jsonMetadata.properties.roles as any[];
        if (filteredRoles.includes(role?.name)) {
          skillWalletsResponse[role?.name].push({
            tokenId: tokenId.toString(),
            imageUrl: ipfsCIDToHttpUrl(jsonMetadata.properties.avatar, false),
            nickname: jsonMetadata.properties.username,
          });
        }
      }
    }

    return skillWalletsResponse;
  }
);
