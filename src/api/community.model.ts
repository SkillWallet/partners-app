import { BaseNFTModel } from './api.model';

export interface CommunityRoleSkill {
  name: string;
  [key: string]: any;
}

interface OldCommunity {
  skills: OldCommunityRoles[];
}
interface OldCommunityRoles extends Omit<CommunityRole, 'id'> {
  credits: number;
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

    if ((data as unknown as OldCommunity).skills) {
      this.properties.skills = (data as unknown as OldCommunity).skills as unknown as typeof this.properties.skills;

      /* Sort by  isCoreTeamMember=false so that community roles are first 
         to make use of index as Id

          Example of old roles:
          [
            {
              credits: 20,
              roleName: 'Role 1,
              isCoreTeamMember: false,
            }
          ]

          becomes:
          [
            {
              id: 1,
              roleName: 'Role 1,
              isCoreTeamMember: false,
            }
          ]
      
      */
      this.properties.skills.roles = this.properties.skills.roles
        .sort((a, b) => (a.isCoreTeamMember === b.isCoreTeamMember ? 0 : a.isCoreTeamMember ? 1 : -1))
        .map((role, index) => {
          delete (role as unknown as OldCommunityRoles).credits;
          return {
            ...role,
            id: index + 1,
          };
        });
    }
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
