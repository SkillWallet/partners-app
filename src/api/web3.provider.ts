import { ContractInterface, ethers } from 'ethers';
import { environment } from './environment';

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

let provider = new ethers.providers.Web3Provider(window.ethereum);

export const Web3ContractProvider = async (addressOrName: string, contractInterface: ContractInterface) => {
  // await changeNetwork();

  if (!window.ethereum.selectedAddress) {
    await window.ethereum.enable();
  }

  if (!provider) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
  const signer = provider.getSigner();
  return new ethers.Contract(addressOrName, contractInterface, signer);
};
