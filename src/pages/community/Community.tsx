/* eslint-disable max-len */
import { SwButton, SwShare } from 'sw-web-shared';
import { memo, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { ReactComponent as Member } from '@assets/member-card.svg';
import { ReactComponent as Roles } from '@assets/roles.svg';
import { ReactComponent as Share } from '@assets/share.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store.model';
import './community-dashboard.scss';

const Community = (props) => {
  const basePath = props.location.pathname;
  const { community } = useSelector((state: RootState) => state.community);

  const [openShare, setOpenShare] = useState(false);

  const handleShareClose = () => {
    setOpenShare(false);
  };

  const shareMessage = `Hey there! We've just deployed ${community?.name} on SkillWallet - choose your Role in our Community, pick your Skills, and let's build something great together!`;

  return (
    <>
      <SwShare
        mode="light"
        url="https://skillwallet.id/"
        title="with friends"
        sx={{
          '.MuiTypography-h2': {
            mt: 0,
          },
        }}
        twitterProps={{
          title: shareMessage,
          hashtags: ['SkillWallet', 'DAO', 'Blockchain'],
        }}
        linkedinProps={{
          title: shareMessage,
          summary: 'Do more with DAO',
          source: 'https://skillwallet.id',
        }}
        telegramProps={{
          title: shareMessage,
        }}
        open={openShare}
        onClose={handleShareClose}
      />
      <Box
        className="sw-community-dashboard"
        sx={{
          height: '100%',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Avatar
            sx={{
              height: '111px',
              width: '111px',
            }}
            variant="square"
            src={community?.image}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              ml: '21px',
            }}
          >
            <Typography variant="h1">{community?.name}</Typography>
            <Typography variant="h2">Community</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
          className="sw-box"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gridGap: '20px',
            }}
          >
            <SwButton mode="light" btnType="large" endIcon={<Member />} label="Members" component={Link} to={`${basePath}/members`} />
            <SwButton mode="light" btnType="large" endIcon={<Roles />} label="Roles & Skills" component={Link} to={`${basePath}/roles`} />
            <SwButton mode="light" btnType="large" onClick={() => setOpenShare(true)} endIcon={<Share />} label="Invite & Share" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(Community);
