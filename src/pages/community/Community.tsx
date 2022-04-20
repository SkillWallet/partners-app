/* eslint-disable max-len */
import { SwButton, SwShare } from 'sw-web-shared';
import { memo, useEffect, useState } from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { ReactComponent as Member } from '@assets/member-card.svg';
import { ReactComponent as Roles } from '@assets/roles.svg';
import { ReactComponent as Share } from '@assets/share.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store/store.model';
import { setPreviusRoute } from '@store/ui-reducer';
import { getPAUrl } from '@api/agreement.api';
import './community-dashboard.scss';

const Community = (props) => {
  const dispatch = useAppDispatch();
  const basePath = props.location.pathname;
  const { community } = useSelector((state: RootState) => state.community);
  const { paUrl } = useSelector((state: RootState) => state.partner);

  const [openShare, setOpenShare] = useState(false);

  const handleShareClose = () => {
    setOpenShare(false);
  };

  useEffect(() => {
    const promise = dispatch(getPAUrl(null));
    return () => promise.abort();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard'));
    console.log('Previous route from Community Dashboard');
  }, [dispatch]);

  const shareMessage = `Hey there! We've just deployed ${community?.name} on SkillWallet - choose your Role in our Community, pick your Skills, and let's build something great together!`;

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <SwShare
        mode="light"
        url={paUrl || 'https://skillwallet.id/'}
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
          source: paUrl || 'https://skillwallet.id/',
        }}
        telegramProps={{
          title: shareMessage,
        }}
        open={openShare}
        onClose={handleShareClose}
      />
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
          src={community?.image as string}
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
          <Typography color="primary" variant="h1">
            {community?.name}
          </Typography>
          <Typography color="primary" variant="h2">
            Community
          </Typography>
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
          <SwButton mode="light" btnType="large" onClick={() => setOpenShare(true)} endIcon={<Share />} label="Whitelist" />
        </Box>
      </Box>
    </Container>
  );
};

export default memo(Community);
