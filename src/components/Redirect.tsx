/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { ethers } from 'ethers';
import { getUser, oauthGetToken } from '@api/discord.api';
import { SkillWalletABI } from '@skill-wallet/sw-abi-types';

const Redirect = () => {
  const skillWalletAddress = '0xfb19708dEc0c84b739F98D9AAAE719D236Af3B32';

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

    const contract = new ethers.Contract(skillWalletAddress, SkillWalletABI, signer);
    console.log('cntrct: ', contract);

    console.log(discordId);
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
    // await changeNetwork();
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
