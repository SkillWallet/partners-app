/* eslint-disable max-len */
import { SwShare } from 'sw-web-shared';
import { memo, useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { ReactComponent as Member } from '@assets/member-card.svg';
import { ReactComponent as Roles } from '@assets/roles.svg';
import { ReactComponent as Share } from '@assets/share.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store/store.model';
import { getPAUrl } from '@api/agreement.api';
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';
import SwGrid from '@components/SwGrid';

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

  const shareMessage = `Hey there! We've just deployed ${community?.name} on SkillWallet - choose your Role in our Community, pick your Skills, and let's build something great together!`;

  return (
    <>
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
      <SwGrid
        left={
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
                height: pxToRem(155),
                width: pxToRem(155),
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
                ml: pxToRem(35),
              }}
            >
              <Typography color="primary" fontSize={pxToRem(50)}>
                {community?.name}
              </Typography>
              <Typography color="primary" fontSize={pxToRem(35)}>
                Community
              </Typography>
            </Box>
          </Box>
        }
        right={
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gridGap: '20px',
            }}
          >
            <PartnerButton mode="light" endIcon={<Member />} label="Members" component={Link} to={`${basePath}/members`} />
            <PartnerButton mode="light" endIcon={<Roles />} label="Roles & Skills" component={Link} to={`${basePath}/roles`} />
            <PartnerButton mode="light" endIcon={<Share />} label="Share" onClick={() => setOpenShare(true)} />
          </Box>
        }
      />
    </>
  );
};

export default memo(Community);
