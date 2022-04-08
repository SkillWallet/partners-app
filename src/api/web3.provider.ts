/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { ContractInterface, ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { environment } from './environment';

const activitiesAbi = require('./Activities.json').abi;
// eslint-disable-next-line prefer-destructuring
const bytecode = require('./Activities.json').bytecode;

export const changeNetwork = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x13881' }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x13881', // A 0x-prefixed hexadecimal string
              chainName: 'Mumbai',
              nativeCurrency: {
                name: 'Matic',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: environment.rpcUrls.split(','),
              blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/'],
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
};

export const Web3ContractProvider = async (addressOrName: string, contractInterface: ContractInterface) => {
  // await changeNetwork();

  let ethereum;
  try {
    ethereum = await detectEthereumProvider();
  } catch (e) {
    console.log(e);
  }
  if (ethereum) {
    if (!window.ethereum.selectedAddress) {
      await window.ethereum.enable();
    }
  } else {
    throw new Error('Please enable MetaMask and refresh.');
  }

  const webProvider = new ethers.providers.Web3Provider(ethereum);

  const signer = webProvider.getSigner();
  return new ethers.Contract(addressOrName, contractInterface, signer);
};

export const deployActivities = async (communityAddress) => {
  let ethereum;
  try {
    ethereum = await detectEthereumProvider();
  } catch (e) {
    console.log(e);
  }
  if (ethereum) {
    if (!window.ethereum.selectedAddress) {
      await window.ethereum.enable();
    }
  } else {
    throw new Error('Please enable MetaMask and refresh.');
  }

  const webProvider = new ethers.providers.Web3Provider(ethereum);

  const signer = webProvider.getSigner();
  const Contract = new ethers.ContractFactory(activitiesAbi, bytecode, signer);

  const activities = await Contract.deploy(communityAddress, ethers.constants.AddressZero);
  await activities.deployed();
  return activities.address;
};
