import { SWContractFunctions, SWContractEvents } from 'sw-abi-types';

declare module 'ethers' {
  export class Contract extends BaseContract implements SWContractFunctions {
    activateSkillWallet: (skillWalletId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    addPubKeyToSkillWallet: (skillWalletId: number, pubKey: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    approve: (to: string, tokenId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    balanceOf: (member: string) => Promise<number>;

    baseURI: () => Promise<string>;

    claim: () => Promise<{ wait: () => Promise<SWContractEvents> }>;

    create: (
      url: string,
      template: string,
      roles: number,
      numberOfActions: number,
      contractAddress: string,
      members: number,
      coreTeamMembers: number
    ) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    create: (skillWalletOwner: string, url: string, isClaimable: boolean) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    getActiveCommunity: (skillWalletId: number) => Promise<{ community: string }>;

    getApproved: (tokenId: number) => Promise<string>;

    getClaimableSkillWalletId: (skillWalletOwner: string) => Promise<number>;

    getCommunityHistory: (skillWalletId: number) => Promise<{ communities: string[] }>;

    getSkillWalletIdByOwner: (skillWalletOwner: string) => Promise<number>;

    getTotalSkillWalletsRegistered: () => Promise<number>;

    isApprovedForAll: (owner: string, operator: string) => Promise<boolean>;

    isRequestIdValid: (requestId: string) => Promise<boolean>;

    isSkillWalletActivated: (skillWalletId: number) => Promise<{ status: boolean }>;

    isSkillWalletClaimable: (skillWalletOwner: string) => Promise<{ status: boolean }>;

    isSkillWalletRegistered: (skillWalletOwner: string) => Promise<{ status: boolean }>;

    name: () => Promise<string>;

    onERC721Received: (operator: string, from: string, tokenId: number, data: string) => Promise<string>;

    owner: () => Promise<string>;

    ownerOf: (tokenId: number) => Promise<string>;

    renounceOwnership: () => Promise<{ wait: () => Promise<SWContractEvents> }>;

    safeTransferFrom: (from: string, to: string, tokenId: number, _data: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    setApprovalForAll: (operator: string, approved: boolean) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    skillWalletClaimers: () => Promise<number>;

    skillWalletToPubKey: () => Promise<string>;

    supportsInterface: (interfaceId: string) => Promise<boolean>;

    symbol: () => Promise<string>;

    tokenByIndex: (index: number) => Promise<number>;

    tokenOfOwnerByIndex: (owner: string, index: number) => Promise<number>;

    tokenURI: (tokenId: number) => Promise<string>;

    totalSupply: () => Promise<number>;

    transferFrom: (from: string, to: string, tokenId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    transferOwnership: (newOwner: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    validate: (
      signature: string,
      tokenId: number,
      action: number,
      stringParams: string[],
      intParams: number[],
      addressParams: string[]
    ) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    validationCallback: (_requestId: string, _isValid: boolean) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    activeMembersCount: () => Promise<number>;

    addProjectId: (projectId: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    ditoCreditsAddr: () => Promise<string>;

    ditoCreditsHolder: () => Promise<string>;

    getMemberAddresses: () => Promise<string[]>;

    getMembers: () => Promise<number[]>;

    getProjectTreasuryAddress: (projectId: number) => Promise<string>;

    getProjects: () => Promise<number[]>;

    getSkillWalletAddress: () => Promise<string>;

    getTemplate: () => Promise<number>;

    getTokenId: () => Promise<number>;

    getTreasuryBalance: () => Promise<number>;

    gigsAddr: () => Promise<string>;

    isMember: () => Promise<boolean>;

    join: (skillWalletTokenId: number, credits: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    joinNewMember: (uri: string, credits: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    leave: (memberAddress: string) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    memberAddresses: () => Promise<string>;

    metadataUri: () => Promise<string>;

    scarcityScore: () => Promise<number>;

    skillWalletIds: () => Promise<number>;

    tokenId: () => Promise<number>;

    transferCredits: (to: string, amount: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    transferToCommunity: (from: string, amount: number) => Promise<{ wait: () => Promise<SWContractEvents> }>;

    treasuryAddr: () => Promise<string>;
  }
}
