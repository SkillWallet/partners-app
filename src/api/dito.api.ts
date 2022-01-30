import axios from 'axios';
import { environment } from './environment';

export const getPartnersAgreementByCommunity = (communityAddress) => {
  return axios.get(`${environment.ditoApiUrl}/community/${communityAddress}/key`).then((res) => res.data);
};

export const generatePartnersKey = async (communityAddress, partnersAgreementAddress) => {
  const body = {
    communityAddress,
    partnersAgreementAddress,
  };
  return axios.post(`${environment.ditoApiUrl}/community/key`, body).then((res) => res.data.key);
};

export const getCommunityByPartnerKey = (partnerKey) => {
  console.log('aaaaa here');
  console.log(environment.ditoApiUrl);
  return axios.get(`${process.env.REACT_APP_DITO_API_URL}/community/key/${partnerKey}`).then((res) => res.data);
};

export const getCommunityByCommunityAddress = (communityAddress) => {
  return axios.get(`${process.env.REACT_APP_DITO_API_URL}/community/${communityAddress}`).then((res) => res.data);
};
