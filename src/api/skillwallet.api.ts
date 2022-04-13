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

export const getPartnersAgreementByKey = async (partnerKey) => {
  return axios.get(`${environment.apiUrl}/community/key/${partnerKey}`);
};

export const addDiscordUrl = async (partnerKey, discordWebhook) => {
  return axios
    .post(`${environment.apiUrl}/community/key/${partnerKey}/discordWebhook`, {
      discordWebhook,
    })
    .then(() => discordWebhook);
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

export const activatePaCommunity = (data) => {
  const event = new CustomEvent('activateSkillwalletCommunity', {
    detail: data,
  });
  window.dispatchEvent(event);
  return new Promise((resolve, reject) => {
    const handleResponse = ({ detail }: any) => {
      console.log(detail);
      resolve(detail);
      window.removeEventListener('activateSkillWalletCommunitySuccess', handleResponse);
    };
    const handleError = ({ detail }: any) => {
      reject(detail || 'Could not activate community, please try again');
      window.removeEventListener('activateSkillWalletCommunityError', handleError);
    };
    window.addEventListener('activateSkillWalletCommunitySuccess', handleResponse);
    window.addEventListener('activateSkillWalletCommunityError', handleError);
  });
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
