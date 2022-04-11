import { ActivitiesABI, ActivitiesByteCode } from '@skill-wallet/sw-abi-types';
import { ethers } from 'ethers';
import { EnableAndChangeNetwork } from './web3.network';

export const deployActivities = async (communityAddress) => {
  await EnableAndChangeNetwork();
  const webProvider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = webProvider.getSigner();
  const Contract = new ethers.ContractFactory(ActivitiesABI, ActivitiesByteCode, signer);

  const activities = await Contract.deploy(communityAddress, ethers.constants.AddressZero);
  await activities.deployed();
  return activities.address;
};
