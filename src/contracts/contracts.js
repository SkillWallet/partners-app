import { ethers } from 'ethers'
import { pushJSONDocument } from '../api/textile.hub';
import { generatePartnersKey, getCommunityByCommunityAddress } from './api';

const partnersRegistryABI = require('../contracts/abi/PartnersRegistry.abi.json').abi;
const communityABI = require('../contracts/abi/ICommunity.abi.json').abi;
const partnersAgreementABI = require('../contracts/abi/PartnersAgreement.abi.json').abi;

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

    // here's where my metadata is set.
    const jsonMetadata = metadata[template];
    jsonMetadata.title = title;
    jsonMetadata.description = description;
    console.log('roles setter: ', roles);
    jsonMetadata.skills = {
      roles: [
        {
          credits: 24,
          roleName: roles[0],
          skills: [],
          isCoreTeamMember: false
        },
        {
          credits: 12,
          roleName: roles[1],
          skills: [],
          isCoreTeamMember: false
        },
        {
          credits: 6,
          roleName: roles[2],
          skills: [],
          isCoreTeamMember: false
        },
        {
          credits: 24,
          roleName: "Founder",
          skills: [],
          isCoreTeamMember: true
        },
        {
          credits: 12,
          roleName: "Investor",
          skills: [],
          isCoreTeamMember: true
        },
        {
          credits: 6,
          roleName: "Contributor",
          skills: [],
          isCoreTeamMember: true
        }
      ]
    }
    jsonMetadata.image = window.sessionStorage.getItem('imageUrl');

    console.log('metadata: ', jsonMetadata);

    const url = await pushJSONDocument(jsonMetadata, `metadata.json`);
    console.log(url);

    console.log('calling the SC')
    const createTx = await contract.create(
      url,
      template,
      roles.length,
      numberOfActions, // number of Actions,
      contractAddress ?? ethers.constants.AddressZero, // contract address
      100, // members
      10 // coreTeamMembers
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


export const addAddressToWhitelist = async (
  partnersAgreementAddress,
  memberAddress,
) => {
  try {

    await changeNetwork();

    if (!window.ethereum.selectedAddress) {
      await window.ethereum.enable()
    };

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      partnersAgreementAddress,
      partnersAgreementABI,
      signer,
    );


    const createTx = await contract.addNewCoreTeamMembers(
      memberAddress
    );

    console.log(createTx);

    try {
      const result = await createTx.wait();
      console.log(result);
    } catch (err) {
      console.log(err);
      alert('Failed to whitelist this address!');
    }
  } catch (err) {
    console.log(err);
    alert('Something went wrong, try again later');
  }
}


export const addUrlToPA = async (
  partnersAgreementAddress,
  url,
) => {
  try {

    await changeNetwork();

    if (!window.ethereum.selectedAddress) {
      await window.ethereum.enable()
    };

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      partnersAgreementAddress,
      partnersAgreementABI,
      signer,
    );

    const createTx = await contract.addURL(
      url
    );

    try {
      const result = await createTx.wait();
      console.log(result);
    } catch (err) {
      console.log(err);
      alert('Failed to import new address!');
    }

  } catch (err) {
    alert('Something went wrong, try again later');
  }
}

export const importContractToPA = async (
  partnersAgreementAddress,
  contractAddress,
) => {
  try {

    await changeNetwork();

    if (!window.ethereum.selectedAddress) {
      await window.ethereum.enable()
    };

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      partnersAgreementAddress,
      partnersAgreementABI,
      signer,
    );

    const createTx = await contract.addNewContractAddressToAgreement(
      contractAddress
    );


    try {
      const result = await createTx.wait();
      console.log(result);
    } catch (err) {
      console.log(err);
      alert('Failed to import new address!');
    }
  } catch (err) {
    alert('Something went wrong, try again later');
  }
}



export const getPAUrl = async (partnersAgreementAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    partnersAgreementAddress,
    partnersAgreementABI,
    signer,
  );

  const urls = await contract.getURLs();
  console.log('urls', urls)
  return urls.length > 0 ? urls[urls.length - 1] : undefined;
};

export const getImportedContracts = async (partnersAgreementAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    partnersAgreementAddress,
    partnersAgreementABI,
    signer,
  );

  const importedContracts = await contract.getImportedAddresses();
  console.log(importedContracts);
  return importedContracts;
};

export const getWhitelistedAddresses = async (partnersAgreementAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    partnersAgreementAddress,
    partnersAgreementABI,
    signer,
  );

  const whitelist = await contract.getCoreTeamMembers();
  return whitelist;
};


export const updateAndSaveSkills = async (editedRole, community) => {   
  let updatedRoles = [];

  community.roles.roles.forEach(r => {
    if (r['roleName'] === editedRole['roleName']) {
        updatedRoles.push(editedRole)
    } else {
      updatedRoles.push(r);
    }
  })

  const jsonMetadata = {
    properties: {
      template: community.template
    },
    title: community.name,
    description: community.description,
    image: community.image,
    skills: {
      roles: updatedRoles
    }
  };
  console.log('metadata: ', jsonMetadata);
  
  const uri = await pushJSONDocument(jsonMetadata, `metadata.json`);
  console.log(uri);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    community.address,
    communityABI,
    signer,
  );
  const tx = await contract.setMetadataUri(uri);
  const metadataURI = await tx.wait();
  console.log(metadataURI);
  return await getCommunityByCommunityAddress(community.address);
};