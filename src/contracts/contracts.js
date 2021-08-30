import { ethers } from 'ethers'
import { pushJSONDocument }  from '../api/textile.hub';
import { generatePartnersKey } from './api';

var communityABI = require('../contracts/abi/ICommunity.abi.json').abi;
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

export const validateMumbaiNet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const network = await provider.getNetwork();
  if (network.name !== 'mumbai') {
    return false;
  }
  return true;
}

export const createPartnersAgreement = async (
  template,
  title,
  description, 
  roles,
  numberOfActions
  ) => {
  console.log('createPartnersAgreement')
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
  jsonMetadata.image = localStorage.getItem('imageUrl');
  const url = await pushJSONDocument(jsonMetadata);
  console.log(url);

  console.log('calling the SC')
  const createTx = await contract.create(
    url,
    template,
    roles.length,
    numberOfActions, // number of Actions,
    localStorage.getItem('contractAddress'), // contract address
    100 // members,
  );

  console.log(createTx);

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
}

export const createNewUser = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const network = await provider.getNetwork();
  if (network.name !== 'mumbai') {
    return false;
  }
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    '',
    communityABI,
    signer,
  );

  const newUser = await contract.joinNewMember(
    1,
    10,
    0,
    0,
    0,
    0,
    '', //uri... again - leave empty, don't have the textle part
    240
  );

  return newUser;
}