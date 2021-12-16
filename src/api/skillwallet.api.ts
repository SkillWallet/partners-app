import axios from 'axios';
import { environment } from './environment';

export const generatePartnersKey = async (communityAddress, partnersAgreementAddress) => {
  const body = {
    communityAddress,
    partnersAgreementAddress,
  };
  return axios.post(`${environment.apiUrl}/community/key`, body).then((res) => res.data.key);
};

export const getUsersData = () => {
  const params = {
    startDate: '1622592571001',
    perMonth: true,
  };
  const headers = {
    key: '193485710394857',
  };
  return axios
    .get(`${environment.apiUrl}/analytics/activeUsers`, {
      params,
      headers,
    })
    .then((res) => res.data);
};

export const getMembersByCommunityAddress = async (communityAddress, isCoreTeamMember = false) => {
  const params = {
    coreTeamMembers: isCoreTeamMember,
  };
  return axios.get(`${environment.apiUrl}/community/${communityAddress}/skillwallet`, { params }).then((res) => res.data);
};

export const getSkillwalletAddress = () => {
  return axios.get(`${environment.apiUrl}skillwallet/config`, {}).then((res) => res.data);
};

// @OTOD: Milena to implement method for fetching logs
export const getLogs = (): Promise<any[]> => {
  return new Promise((resolve) => {
    resolve([
      {
        img: '',
        title: 'SW 1',
        sign: '@',
        source: '',
        role: 'Role',
        timestamp: new Date(),
      },
      {
        img: '',
        title: 'SW 1',
        sign: '@',
        source: '',
        role: 'Role',
        timestamp: new Date(),
      },
      {
        img: '',
        title: 'SW 1',
        sign: '@',
        role: 'Role',
        source: '',
        timestamp: new Date(),
      },
      {
        img: '',
        title: 'SW 1',
        sign: '@',
        source: '',
        role: 'Role',
        timestamp: new Date(),
      },
      {
        img: '',
        title: 'SW 1',
        sign: '@',
        source: '',
        role: 'Role',
        timestamp: new Date(),
      },
      {
        img: '',
        title: 'SW 1',
        sign: '@',
        source: '',
        role: 'Role',
        timestamp: new Date(),
      },
    ]);
  });
};
