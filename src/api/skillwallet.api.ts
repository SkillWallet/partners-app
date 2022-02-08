import axios from 'axios';
import { environment } from './environment';

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

export const getTasks = async (activitiesAddress: string, skillwalletId = 10) => {
  const params = {
    activitiesAddress,
  };
  return axios.get(`${environment.apiUrl}/skillwallet/${skillwalletId}/tasks`, { params }).then((res) => res.data);
};

export const getTask = async (activityId: string, activitiesAddress: string, skillwalletId = 10) => {
  const params = {
    activitiesAddress,
  };
  return axios.get(`${environment.apiUrl}/skillwallet/${skillwalletId}/tasks/${activityId}`, { params }).then((res) => res.data);
};

export const getMembersByCommunityAddress = async (communityAddress, isCoreTeamMember = false) => {
  const params = {
    coreTeamMembers: isCoreTeamMember,
  };
  return axios.get(`${environment.apiUrl}/community/${communityAddress}/skillwallet`, { params }).then((res) => res.data);
};

export const getCoreTeamMemberNames = async (communityAddress) => {
  return axios.get(`${environment.apiUrl}/community/${communityAddress}/coreTeamMembers`).then((res) => res.data);
};

export const addCoreTeamName = async (communityAddress, memberAddress, memberName) => {
  return axios
    .post(`${environment.apiUrl}/community/${communityAddress}/coreTeamMembers`, {
      memberAddress,
      memberName,
    })
    .then((res) => res.data)
    .catch(() => false);
};

export const getSkillwalletAddress = () => {
  return axios.get(`${environment.apiUrl}/skillwallet/config`, {}).then((res) => res.data);
};

export const partnerAgreementAccess = (partnerKey: string): Promise<boolean> => {
  return axios
    .post(
      `${environment.apiUrl}/skillwallet/access`,
      {},
      {
        headers: {
          authorization: partnerKey,
        },
      }
    )
    .then((res) => res.data)
    .catch(() => false);
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
