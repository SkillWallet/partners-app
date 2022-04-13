/* eslint-disable no-shadow */
export enum ActivityTypes {
  None,
  CoreTeamTask,
  DiscordPoll,
  CommunityCall,
}

export interface ActivityTask {
  name: string;
  description: string;
  image: File;
  properties: {
    creator: string;
    creatorSkillWalletId: string;
    role: string;
    roleId: number;
    participants: number;
    allParticipants: boolean;
    description: string;
    title: string;
    isCoreTeamMembersOnly: boolean;
  };
}

export interface CommunityRole {
  credits: number;
  roleName: string;
  skills: any[];
  isCoreTeamMember: boolean;
}
export interface CommunityIntegration {
  properties: {
    template: string;
  };
  name: string;
  title: string;
  description: string;
  image: File;
  skills: {
    roles: CommunityRole[];
  };
}

export interface Community {
  name: string;
  address: string;
  description: string;
  roles: {
    roles: CommunityRole[];
  };
  template: string;
  image: string;
  isDiToNativeCommunity: boolean;
}

export interface CommunityContractError {
  code: number;
  message: string;
  data: {
    code: number;
    data: any;
    message: string;
  };
}

export interface SkillWallet {
  tokenId: string;
  nickname: string;
  imageUrl: string;
  diToCredits: number;
  repScore: number;
  currentCommunities: CommunityList[];
  pastCommunities: CommunityList[];
  skills: Skill[];
}
export interface SkillWalletTask {
  tokenId: string;
  nickname: string;
  imageUrl: string;
  timestamp: string;
}
export interface SkillWalletList {
  tokenId: string;
  nickname: string;
  imageUrl: string;
}
export interface SkillWalletListPerRole {
  role: string;
  skillWallets: SkillWalletList[];
}

interface CommunityList {
  name: string;
  address: string;
  members?: number;
  description?: string;
  scarcityScore?: number;
  comScore?: number;
  repCredits?: number;
}

interface Skill {
  name: string;
  value: number;
}
