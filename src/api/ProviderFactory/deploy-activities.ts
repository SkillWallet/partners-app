import { ActivitiesABI, ActivitiesByteCode } from '@skill-wallet/sw-abi-types';
import { ethers } from 'ethers';
import { EnableAndChangeNetwork } from './web3.network';

console.log(ActivitiesABI, 'ActivitiesABI');
export const deployActivities = async (communityAddress: string, discordBotAddress: string) => {
  await EnableAndChangeNetwork();
  const webProvider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = webProvider.getSigner();
  const Contract = new ethers.ContractFactory(ActivitiesABI, ActivitiesByteCode, signer);

  const activities = await Contract.deploy(communityAddress, discordBotAddress);
  await activities.deployed();
  return activities.address;
};
