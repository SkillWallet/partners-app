import { SWContractFunctions, SWContractEvents } from '@skill-wallet/sw-abi-types';

declare module 'ethers' {
  export class Contract extends BaseContract implements SWContractFunctions {
    activeMembersCount: () => Promise<number>;

    addProjectId: (projectId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    balanceOf: (owner: string) => Promise<number>;

    claimableSkillWallets: () => Promise<boolean>;

    creditsToTransfer: () => Promise<number>;

    distributedTownAddr: () => Promise<string>;

    ditoCreditsAddr: () => Promise<string>;

    ditoCreditsHolder: () => Promise<string>;

    getMemberAddresses: () => Promise<string[]>;

    getMembers: () => Promise<number[]>;

    getProjects: () => Promise<number[]>;

    getSkillWalletAddress: () => Promise<string>;

    getTemplate: () => Promise<number>;

    getTokenId: () => Promise<number>;

    getTreasuryBalance: () => Promise<number>;

    gigsAddr: () => Promise<string>;

    isMember: () => Promise<boolean>;

    joinNewMember: (uri: string, role: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    markAsMigrated: (_migratedTo: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    memberAddresses: () => Promise<string>;

    metadataUri: () => Promise<string>;

    migrateData: () => Promise<{ wait: () => Promise<SWContractEvents> }>;

    migratedFrom: () => Promise<string>;

    migratedTo: () => Promise<string>;

    projectIds: () => Promise<number>;

    roleMembershipsLeft: () => Promise<number>;

    rolesCount: () => Promise<number>;

    scarcityScore: () => Promise<number>;

    setMetadataUri: (uri: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    skillWalletIds: () => Promise<number>;

    status: () => Promise<number>;

    tokenId: () => Promise<number>;

    totalMembersAllowed: () => Promise<number>;

    transferCredits: (to: string, amount: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    transferToCommunity: (from: string, amount: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    treasuryAddr: () => Promise<string>;

    version: () => Promise<number>;

    addNewCoreTeamMembers: (member: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    coreTeamMembersCount: () => Promise<number>;

    getCoreTeamMembers: () => Promise<string[]>;

    isCoreTeamMember: () => Promise<boolean>;

    isPermissioned: () => Promise<boolean>;

    owner: () => Promise<string>;

    setPermissionBadgeAddress: (_permissionBadgeAddr: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    skillWallet: () => Promise<string>;

    template: () => Promise<number>;

    testMapping: () => Promise<number>;

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

    onERC721Received: () => Promise<string>;

    partnersContracts: () => Promise<string>;

    removeURL: (_url: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setActivities: (_activity: string, _interactionNFT: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    supportsInterface: (interfaceId: string) => Promise<boolean>;

    takeTask: (_activityId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    transferInteractionNFTs: (user: string, amountOfInteractions: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    urls: () => Promise<string>;

    agreementIds: () => Promise<number>;

    agreements: () => Promise<string>;

    create: (
      communityAddress: string,
      rolesCount: number,
      commitmentLevel: number,
      partnersContractAddress: string
    ) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    deployer: () => Promise<string>;

    getPartnerAgreementAddresses: () => Promise<string[]>;

    initialize: (_skillWalletAddress: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    migrate: (_agreement: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setVersion: (_version: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    skillWalletAddress: () => Promise<string>;

    createCommunity: (
      url: string,
      template: number,
      totalMembersAllowed: number,
      coreTeamMembersCount: number,
      isPermissioned: boolean,
      migrateFrom: string
    ) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    approve: (to: string, tokenId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    baseURI: () => Promise<string>;

    completeGig: (_gigId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    createGig: (_ditoCredits: number, _metadataUrl: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    getApproved: (tokenId: number) => Promise<string>;

    gigs: () => Promise<{
      creator: string;
      taker: string;
      ditoCredits: number;
      status: number;
    }>;

    gigsCount: () => Promise<number>;

    isApprovedForAll: (owner: string, operator: string) => Promise<boolean>;

    name: () => Promise<string>;

    ownerOf: (tokenId: number) => Promise<string>;

    safeTransferFrom: (from: string, to: string, tokenId: number, _data: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setApprovalForAll: (operator: string, approved: boolean) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setCommunityAddress: (_newCommunityAddress: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    submitGig: (_gigId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    symbol: () => Promise<string>;

    takeGig: (_gigId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    tokenByIndex: (index: number) => Promise<number>;

    tokenOfOwnerByIndex: (owner: string, index: number) => Promise<number>;

    tokenURI: (tokenId: number) => Promise<string>;

    totalSupply: () => Promise<number>;

    transferFrom: (from: string, to: string, tokenId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    checkpoints: () => Promise<string>;

    closeCompetition: (competitionAddress: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    community: () => Promise<string>;

    createCompetition: (
      role: number,
      skill1: number,
      skill2: number,
      skill3: number,
      metadata: string,
      checkpointsAmount: number
    ) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    getCompetitions: () => Promise<string[]>;
  }
}
