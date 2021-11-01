import { ethers } from 'ethers'
import { pushJSONDocument } from '../api/textile.hub';
import { generatePartnersKey } from './api';

var partnersRegistryABI = require('../contracts/abi/PartnersRegistry.abi.json').abi;

const metadata = [
  {
    properties: {
      template: 'Open-Source & DeFi',
    }
  },
  {
    properties: {
      template: 'Art, Events & NFTs',
    }
  },
  {
    properties: {
      template: 'Local Projects & DAOs',
    }
  }

]

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
          params: [{
            chainId: '0x13881', // A 0x-prefixed hexadecimal string
            chainName: 'Mumbai',
            nativeCurrency: {
              name: 'Matic',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: ['https://matic-mumbai.chainstacklabs.com', 'https://rpc-mumbai.matic.today'],
            blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/']
          }]
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}

export const createPartnersAgreement = async (
  template,
  title,
  description,
  roles,
  numberOfActions,
  contractAddress
) => {
    try {
      console.log('createPartnersAgreement')

      await changeNetwork();

      if (!window.ethereum.selectedAddress) {
        await window.ethereum.enable()
      };

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      console.log(process.env.REACT_APP_PARTNERS_REGISTRY_ADDRESS);
      const contract = new ethers.Contract(
        process.env.REACT_APP_PARTNERS_REGISTRY_ADDRESS,
        partnersRegistryABI,
        signer,
      );

      const jsonMetadata = metadata[template];
      jsonMetadata.title = title;
      jsonMetadata.description = description;
      jsonMetadata.properties.roles = roles;
      jsonMetadata.image = window.sessionStorage.getItem('imageUrl');
      const url = await pushJSONDocument(jsonMetadata);
      console.log(url);

      console.log('calling the SC')
      const createTx = await contract.create(
        url,
        template,
        roles.length,
        numberOfActions, // number of Actions,
        contractAddress ?? ethers.constants.AddressZero, // contract address
        100 // members,
      );

      console.log(createTx);

      try {
        const result = await createTx.wait();
        const { events } = result;
        console.log(events);
      
        const event = events.find(
          e => e.event === 'PartnersAgreementCreated',
        );
      
        const partnersAgreementAddress = event.args[0].toString();
        const communityAddress = event.args[1].toString();
      
        console.log('partnersAgreementAddress', partnersAgreementAddress)
        console.log('communityAddress', communityAddress)
        const key = await generatePartnersKey(communityAddress, partnersAgreementAddress);
        console.log('key', key);
        return {
          key: key,
          communityAddr: communityAddress,
          partnersAddr: partnersAgreementAddress
        };
      } catch (err) {
        console.log(err);
        alert('Failed to create the community!');
      }
  } catch (err) {
    alert('Something went wrong, try again later');
  }
}
