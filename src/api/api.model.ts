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
  image: string;
  properties: {
    creator: string;
    creatorSkillWalletId: string;
    role: string;
    roleId: number;
    participants: number;
    allParticipants: boolean;
    description: string;
    isCoreTeamMembersOnly: boolean;
  };
}
