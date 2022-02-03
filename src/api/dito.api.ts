import axios from 'axios';
import { environment } from './environment';

// TODO: move this endpoint in SkillWallet
export const getPartnersAgreementByCommunity = (communityAddress) => {
  return axios.get(`${environment.ditoApiUrl}/community/${communityAddress}/key`).then((res) => res.data);
};

// TODO: move this endpoint in SkillWallet
export const generatePartnersKey = async (communityAddress, partnersAgreementAddress) => {
  const body = {
    communityAddress,
    partnersAgreementAddress,
  };
  return axios.post(`${environment.ditoApiUrl}/community/key`, body).then((res) => res.data.key);
};

// TODO: move this endpoint in SkillWallet
export const getCommunityByPartnerKey = (partnerKey) => {
  return axios.get(`${process.env.REACT_APP_DITO_API_URL}/community/key/${partnerKey}`).then((res) => res.data);
};