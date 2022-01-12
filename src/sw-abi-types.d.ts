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

    isMember: (member: string) => Promise<boolean>;

    joinNewMember: (uri: string, role: number, credits: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    markAsMigrated: (_migratedTo: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    memberAddresses: () => Promise<string>;

    metadataUri: () => Promise<string>;

    migrateData: () => Promise<{ wait: () => Promise<SWContractEvents> }>;

    migratedFrom: () => Promise<string>;

    migratedTo: () => Promise<string>;

    projectIds: () => Promise<number>;

    scarcityScore: () => Promise<number>;

    setMetadataUri: (uri: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    skillWalletIds: () => Promise<number>;

    status: () => Promise<undefined>;

    tokenId: () => Promise<number>;

    totalMembersAllowed: () => Promise<number>;

    transferCredits: (to: string, amount: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    transferToCommunity: (from: string, amount: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    treasuryAddr: () => Promise<string>;

    version: () => Promise<number>;

    activateSkillWallet: (skillWalletId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    addDiscordIDToSkillWallet: (discordID: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    addPubKeyToSkillWallet: (skillWalletId: number, pubKey: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    approve: (to: string, tokenId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    baseURI: () => Promise<string>;

    claim: () => Promise<{ wait: () => Promise<SWContractEvents> }>;

    create: (
      metadata: string,
      template: number,
      rolesCount: number,
      numberOfActions: number,
      partnersContractAddress: string,
      membersAllowed: number,
      coreTeamMembers: number
    ) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    getActiveCommunity: (skillWalletId: number) => Promise<{ community: string }>;

    getApproved: (tokenId: number) => Promise<string>;

    getClaimableSkillWalletId: (skillWalletOwner: string) => Promise<number>;

    getCommunityHistory: (skillWalletId: number) => Promise<{ communities: string[] }>;

    getContractAddressPerAction: (action: string, caller: string) => Promise<string>;

    getOSMAddress: () => Promise<string>;

    getPubKeyBySkillWalletId: (skillWalletId: number) => Promise<string>;

    getSkillWalletIdByOwner: (skillWalletOwner: string) => Promise<number>;

    getTotalSkillWalletsRegistered: () => Promise<number>;

    initialize: (
      _distributedTownAddress: string,
      _partnersAgreementFactoryAddress: string,
      _membershipFactory: string,
      _interactionsQueryServer: string
    ) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    isApprovedForAll: (owner: string, operator: string) => Promise<boolean>;

    isRequestIdValid: (requestId: string) => Promise<boolean>;

    isSkillWalletActivated: (skillWalletId: number) => Promise<{ status: boolean }>;

    isSkillWalletClaimable: (skillWalletOwner: string) => Promise<{ status: boolean }>;

    isSkillWalletRegistered: (skillWalletOwner: string) => Promise<{ status: boolean }>;

    name: () => Promise<string>;

    onERC721Received: () => Promise<string>;

    osmAddress: () => Promise<string>;

    owner: () => Promise<string>;

    ownerOf: (tokenId: number) => Promise<string>;

    renounceOwnership: () => Promise<{ wait: () => Promise<SWContractEvents> }>;

    safeTransferFrom: (from: string, to: string, tokenId: number, _data: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setApprovalForAll: (operator: string, approved: boolean) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    skillWalletClaimers: () => Promise<number>;

    skillWalletToDiscordID: () => Promise<string>;

    skillWalletToPubKey: () => Promise<string>;

    supportsInterface: (interfaceId: string) => Promise<boolean>;

    symbol: () => Promise<string>;

    tokenByIndex: (index: number) => Promise<number>;

    tokenOfOwnerByIndex: (owner: string, index: number) => Promise<number>;

    tokenURI: (tokenId: number) => Promise<string>;

    totalSupply: () => Promise<number>;

    transferFrom: (from: string, to: string, tokenId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    transferOwnership: (newOwner: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    activatePA: () => Promise<{ wait: () => Promise<SWContractEvents> }>;

    activities: () => Promise<string>;

    addNewContractAddressToAgreement: (contractAddress: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    addNewCoreTeamMembers: (member: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    addURL: (_url: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    communityAddress: () => Promise<string>;

    coreTeamMembersCount: () => Promise<number>;

    createActivity: (_type: number, _uri: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    deployActivities: (_factory: string, _bot: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    finilizeTask: (_activityId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    getAgreementData: () => Promise<undefined>;

    getAllMembers: () => Promise<string[]>;

    getCoreTeamMembers: () => Promise<string[]>;

    getImportedAddresses: () => Promise<string[]>;

    getInteractionNFT: (user: string) => Promise<number>;

    getInteractionNFTContractAddress: () => Promise<string>;

    getURLs: () => Promise<string[]>;

    isActive: () => Promise<boolean>;

    isCoreTeamMember: () => Promise<boolean>;

    isURLListed: (_url: string) => Promise<boolean>;

    membershipAddress: () => Promise<string>;

    partnersContracts: () => Promise<string>;

    removeURL: (_url: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    rolesCount: () => Promise<number>;

    takeTask: (_activityId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    transferInteractionNFTs: (user: string, amountOfInteractions: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    urls: () => Promise<string>;

    agreementIds: () => Promise<number>;

    agreements: () => Promise<string>;

    getPartnerAgreementAddresses: () => Promise<string[]>;

    migrate: (_agreement: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setVersion: (_version: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;
  }
}
