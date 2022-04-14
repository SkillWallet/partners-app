import { TokenInput } from 'nft.storage/dist/src/lib/interface';

/* eslint-disable no-shadow */
export enum ActivityTypes {
  None,
  CoreTeamTask,
  DiscordPoll,
  CommunityCall,
}

export class BaseNFTModel<Properties> implements Omit<TokenInput, 'image'> {
  name: string;

  description: string;

  image: File | string;

  properties: Properties;

  constructor(data: BaseNFTModel<Properties>) {
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.properties = data.properties;
  }
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
