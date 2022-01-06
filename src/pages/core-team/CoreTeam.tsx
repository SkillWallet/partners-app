import { SwButton } from 'sw-web-shared';
import { Avatar, Box, Typography } from '@mui/material';
import { ReactComponent as Member } from '@assets/member-card.svg';
import { ReactComponent as Roles } from '@assets/roles.svg';
import { ReactComponent as Share } from '@assets/share.svg';
import { Link } from 'react-router-dom';
import { RootState } from '@store/store.model';
import { memo, useEffect } from 'react';
import { setPreviusRoute } from '@store/ui-reducer';
import { useDispatch, useSelector } from 'react-redux';
import './core-team-dashboard.scss';

const CoreTeam = (props) => {
  const dispatch = useDispatch();
  const basePath = props.location.pathname;
  const { community } = useSelector((state: RootState) => state.community);

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/dashboard'));
  }, [dispatch]);

  return (
    <Box
      className="sw-core-team-dashboard"
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        p: '12px',
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
          <Typography variant="h2">Core Team</Typography>
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
          <SwButton mode="light" btnType="large" endIcon={<Share />} label="Invite & Share" component={Link} to={`${basePath}/whitelist`} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(CoreTeam);
