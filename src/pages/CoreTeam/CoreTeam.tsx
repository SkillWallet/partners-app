import { Avatar, Box, Typography } from '@mui/material';
import { ReactComponent as Member } from '@assets/member-card.svg';
import { ReactComponent as Roles } from '@assets/roles.svg';
import { ReactComponent as Share } from '@assets/share.svg';
import { Link } from 'react-router-dom';
import { RootState } from '@store/store.model';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';
import SwGrid from '@components/SwGrid';

const CoreTeam = (props) => {
  const basePath = props.location.pathname;
  const { community } = useSelector((state: RootState) => state.community);

  return (
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
              Core Team
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
          <PartnerButton mode="light" endIcon={<Share />} label="Whitelist" component={Link} to={`${basePath}/whitelist`} />
        </Box>
      }
    />
  );
};

export default memo(CoreTeam);
