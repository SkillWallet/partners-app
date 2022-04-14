import { environment, EnvMode } from '@api/environment';

const nativeCurrency = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
};

const prodConfigParams = [
  {
    chainId: '0x89',
    chainName: 'Polygon',
    nativeCurrency,
    rpcUrls: environment.rpcUrls?.split(','),
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
];

const devConfigParams = [
  {
    chainId: '0x13881',
    chainName: 'Mumbai',
    nativeCurrency,
    rpcUrls: environment.rpcUrls?.split(','),
    blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/'],
  },
];

export const EnableAndChangeNetwork = async () => {
  console.info('Changing Network');
  const production = environment.env === EnvMode.Production;
  const params = production ? prodConfigParams : devConfigParams;
  const [{ chainId }] = params;

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params,
        });
      } catch (addError) {
        throw new Error(addError);
      }
    } else {
      throw new Error(switchError);
    }
  }
};
