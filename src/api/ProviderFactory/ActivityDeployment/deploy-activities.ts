import { ethers } from 'ethers';
import { EnableAndChangeNetwork } from '../web3.network';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { abi, bytecode } = require('./Activities.json');

export const deployActivities = async (communityAddress) => {
  await EnableAndChangeNetwork();
  const webProvider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = webProvider.getSigner();
  const Contract = new ethers.ContractFactory(abi, bytecode, signer);

  const activities = await Contract.deploy(communityAddress, ethers.constants.AddressZero);
  await activities.deployed();
  return activities.address;
};
