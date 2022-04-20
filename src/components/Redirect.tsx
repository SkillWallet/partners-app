/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { ethers } from 'ethers';
import { getUser, oauthGetToken } from '@api/discord.api';
import { SkillWalletABI, SkillWalletContractEventType, Web3SkillWalletProvider } from '@skill-wallet/sw-abi-types';
import { getSkillwalletAddress, skillWalletExists } from '@api/skillwallet.api';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '@store/ui-reducer';
import { Box } from '@mui/system';
import { CircularProgress, Typography } from '@mui/material';

function Redirect(props) {
  const dispatch = useDispatch();

  const getUserID = async (code) => {
    const accessToken = await oauthGetToken(code);
    const user = await getUser(accessToken);
    console.log(user);
    return user.id;
  };

  const addDiscordIDToSkillWallet = async (discordId) => {
    const skillWalletAddress = await getSkillwalletAddress();

    const contract = await Web3SkillWalletProvider(skillWalletAddress, {
      event: SkillWalletContractEventType.DiscordIDConnectedToSkillWallet,
    });
    const response = await contract.addDiscordIDToSkillWallet(discordId);
    if (response) {
      dispatch(
        openSnackbar({
          message: `Congrats, you've connected your SkillWallet to your Discord ID!`,
          severity: 'success',
          duration: 15000,
        })
      );
    } else {
      dispatch(
        openSnackbar({
          message: `Please try again.`,
          severity: 'error',
          duration: 15000,
        })
      );
    }
  };

  const connectSWToDiscord = async (code) => {
    // await changeNetwork();
    const userID = await getUserID(code);
    if (userID) {
      const exists = await skillWalletExists();
      console.log(exists);
      if (exists) {
        console.log(userID);
        await addDiscordIDToSkillWallet(userID);
      } else {
        dispatch(
          openSnackbar({
            message: `SkillWallet not found. Make sure the correct address is selected.`,
            severity: 'error',
            duration: 15000,
          })
        );
      }
    } else {
      dispatch(
        openSnackbar({
          message: `'Please authetnicate with Discord again!'`,
          severity: 'error',
          duration: 15000,
        })
      );
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <Typography variant="h2">Discord Integration Redirect Page</Typography>
      <CircularProgress />
    </Box>
  );
}

export default Redirect;
