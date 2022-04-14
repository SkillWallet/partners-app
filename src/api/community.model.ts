import { BaseNFTModel } from './api.model';

export interface CommunityRoleSkill {
  name: string;
  [key: string]: any;
}

export interface CommunityRole {
  id: number;
  roleName: string;
  isCoreTeamMember: boolean;
  skills: CommunityRoleSkill[] | string[];
}

export class CommunityProperties {
  skills: {
    roles: CommunityRole[];
  };

  template: string;

  constructor(data: CommunityProperties) {
    if (!data) {
      this.skills = {
        roles: [],
      };
    } else {
      this.skills = data.skills;
      this.template = data.template;
    }
  }
}

export class Community extends BaseNFTModel<CommunityProperties> {
  constructor(data: Community = {} as Community) {
    super(data);
    this.properties = new CommunityProperties(data.properties);
  }
}

export const DefaultRoles: CommunityRole[] = [
  {
    id: 4,
    roleName: 'Core Team',
    skills: [],
    isCoreTeamMember: true,
  },
  {
    id: 5,
    roleName: 'Advisor',
    skills: [],
    isCoreTeamMember: true,
  },
  {
    id: 6,
    roleName: 'Investor',
    skills: [],
    isCoreTeamMember: true,
  },
];
