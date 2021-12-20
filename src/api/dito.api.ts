import axios from 'axios';
import { environment } from './environment';

export const getPartnersAgreementByCommunity = (communityAddress) => {
  return axios.get(`${environment.ditoApiUrl}/community/${communityAddress}/key`).then((res) => res.data);
};

export const getCommunityByPartnerKey = (partnerKey) => {
  return axios.get(`${environment.ditoApiUrl}/community/key/${partnerKey}`).then((res) => res.data);
};

export const getCommunityByCommunityAddress = (communityAddress) => {
  return axios.get(`${environment.ditoApiUrl}/community/${communityAddress}`).then((res) => res.data);
};
