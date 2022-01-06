/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { ethers } from 'ethers';
import { getUser, oauthGetToken } from '@api/discord.api';
import { SkillWalletAbi } from 'sw-abi-types';

const Redirect = () => {
  const skillWalletAddress = '0xC048276176B8D6541ac0b39B853067202b571E08';

  const changeNetwork = async () => {
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
                rpcUrls: ['https://matic-mumbai.chainstacklabs.com', 'https://rpc-mumbai.matic.today'],
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

  const connectWallet = async () => {
    const { ethereum } = window;
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      alert(error);
    }
  };

  const getUserID = async (code) => {
    const accessToken = await oauthGetToken(code);
    const user = await getUser(accessToken);
    console.log(user);
    return user.id;
  };

  const addDiscordIDToSkillWallet = async (discordId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(skillWalletAddress, SkillWalletAbi, signer);
    console.log('cntrct: ', contract);

    const createTx = await contract.addDiscordIDToSkillWallet(discordId);

    const res = await createTx.wait();
    const { events } = res;
    const discordIDAdded = events.find((e) => e.event === 'DiscordIDConnectedToSkillWallet');
    if (discordIDAdded) {
      // return tokenID.
      alert(`Congrats ${discordId}!`);
    } else {
      alert('Please try again!');
    }
  };

  const connectSWToDiscord = async (code) => {
    await changeNetwork();
    const userID = await getUserID(code);
    if (userID) {
      await connectWallet();
      console.log(userID);
      await addDiscordIDToSkillWallet(userID);
    } else {
      alert('Please authetnicate with Discord again!');
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    console.log(code);
    if (!code) return;
    connectSWToDiscord(code);
  }, []);

  return <div />;
};

export default Redirect;
