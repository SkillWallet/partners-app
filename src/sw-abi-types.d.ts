import { SWContractFunctions, SWContractEvents } from '@skill-wallet/sw-abi-types';

declare module 'ethers' {
  export class Contract extends BaseContract implements SWContractFunctions {
    readonly [key: string]: ContractFunction | any;

    approve: (to: string, tokenId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    balanceOf: (owner: string) => Promise<number>;

    baseURI: () => Promise<string>;

    completeGig: (_gigId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    createGig: (_ditoCredits: number, _metadataUrl: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    getApproved: (tokenId: number) => Promise<string>;

    gigs: () => Promise<{
      creator: string;
      taker: string;
      ditoCredits: number;
      status: string;
    }>;

    gigsCount: () => Promise<number>;

    isApprovedForAll: (owner: string, operator: string) => Promise<boolean>;

    name: () => Promise<string>;

    ownerOf: (tokenId: number) => Promise<string>;

    safeTransferFrom: (from: string, to: string, tokenId: number, _data: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setApprovalForAll: (operator: string, approved: boolean) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setCommunityAddress: (_newCommunityAddress: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    submitGig: (_gigId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    supportsInterface: (interfaceId: string) => Promise<boolean>;

    symbol: () => Promise<string>;

    takeGig: (_gigId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    tokenByIndex: (index: number) => Promise<number>;

    tokenOfOwnerByIndex: (owner: string, index: number) => Promise<number>;

    tokenURI: (tokenId: number) => Promise<string>;

    totalSupply: () => Promise<number>;

    transferFrom: (from: string, to: string, tokenId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    addNewCoreTeamMembers: (member: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    coreTeamMembersCount: () => Promise<number>;

    getCoreTeamMembers: () => Promise<string[]>;

    getMemberAddresses: () => Promise<string[]>;

    getMembers: () => Promise<number[]>;

    getSkillWalletAddress: () => Promise<string>;

    getTemplate: () => Promise<number>;

    isCoreTeamMember: (member: string) => Promise<boolean>;

    isMember: (member: string) => Promise<boolean>;

    joinNewMember: (uri: string, role: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setMetadataUri: (uri: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setPermissionBadgeAddress: (_permissionBadgeAddr: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    activateSkillWallet: (skillWalletId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    addDiscordIDToSkillWallet: (discordID: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    addPubKeyToSkillWallet: (skillWalletId: number, pubKey: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    claim: () => Promise<{ wait: () => Promise<SWContractEvents> }>;

    create: (
      communityAddress: string,
      rolesCount: number,
      commitmentLevel: number,
      partnersContractAddress: string
    ) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    getActiveCommunity: (skillWalletId: number) => Promise<{ community: string }>;

    getClaimableSkillWalletId: (skillWalletOwner: string) => Promise<number>;

    getCommunityHistory: (skillWalletId: number) => Promise<{ communities: string[] }>;

    getContractAddressPerAction: (action: string, caller: string) => Promise<string>;

    getOSMAddress: () => Promise<string>;

    getPubKeyBySkillWalletId: (skillWalletId: number) => Promise<string>;

    getSkillWalletIdByOwner: (skillWalletOwner: string) => Promise<number>;

    getTotalSkillWalletsRegistered: () => Promise<number>;

    initialize: (_skillWalletAddress: string, _interactionNFTFactory: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    isRequestIdValid: (requestId: string) => Promise<boolean>;

    isSkillWalletActivated: (skillWalletId: number) => Promise<{ status: boolean }>;

    isSkillWalletClaimable: (skillWalletOwner: string) => Promise<{ status: boolean }>;

    isSkillWalletRegistered: (skillWalletOwner: string) => Promise<{ status: boolean }>;

    onERC721Received: () => Promise<string>;

    osmAddress: () => Promise<string>;

    owner: () => Promise<string>;

    renounceOwnership: () => Promise<{ wait: () => Promise<SWContractEvents> }>;

    skillWalletClaimers: () => Promise<number>;

    skillWalletToDiscordID: () => Promise<string>;

    skillWalletToPubKey: () => Promise<string>;

    transferOwnership: (newOwner: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    activities: () => Promise<string>;

    addNewContractAddressToAgreement: (contractAddress: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    addURL: (_url: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    commitmentLevel: () => Promise<number>;

    communityAddress: () => Promise<string>;

    createActivity: (_type: number, _uri: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    deployActivities: (_factory: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    finilizeTask: (_activityId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    getActivitiesAddress: () => Promise<string>;

    getAgreementData: () => Promise<undefined>;

    getAllMembers: () => Promise<string[]>;

    getImportedAddresses: () => Promise<string[]>;

    getURLs: () => Promise<string[]>;

    interactionNFT: () => Promise<string>;

    interactionNFTFactory: () => Promise<string>;

    isActive: () => Promise<boolean>;

    isURLListed: (_url: string) => Promise<boolean>;

    onERC1155BatchReceived: () => Promise<string>;

    onERC1155Received: () => Promise<string>;

    partnersContracts: () => Promise<string>;

    removeURL: (_url: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    rolesCount: () => Promise<number>;

    takeTask: (_activityId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    transferInteractionNFTs: (user: string, amountOfInteractions: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    urls: () => Promise<string>;

    version: () => Promise<number>;

    agreementIds: () => Promise<number>;

    agreements: () => Promise<string>;

    deployer: () => Promise<string>;

    getPartnerAgreementAddresses: () => Promise<string[]>;

    migrate: (_agreement: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setVersion: (_version: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    skillWalletAddress: () => Promise<string>;
  }
}
