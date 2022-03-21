import axios from 'axios';
import { environment } from './environment';

export const getPartnersAgreementByCommunity = (communityAddress) => {
  return axios.get(`${environment.apiUrl}/community/${communityAddress}/key`).then((res) => res.data);
};

export const generatePartnersKey = async (communityAddress, partnersAgreementAddress) => {
  const body = {
    communityAddress,
    partnersAgreementAddress,
  };
  return axios.post(`${environment.apiUrl}/community/key`, body).then((res) => res.data.key);
};

export const getCommunityByPartnerKey = (partnerKey) => {
  return axios.get(`${environment.apiUrl}/community/key/${partnerKey}`).then((res) => res.data);
};

export const getCommunityByCommunityAddress = (communityAddress) => {
  return axios.get(`${environment.ditoApiUrl}/community/${communityAddress}`).then((res) => res.data);
};
