import { Box, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as Network } from '@assets/dao-management.svg';
import { ReactComponent as Coins } from '@assets/coins.svg';
import { RootState } from '@store/store.model';
import { setDashboardBtn } from '@store/Partner/partner.reducer';
import { useDispatch, useSelector } from 'react-redux';
import DAOSummaryCard from './DAOSummaryCard';
import DAOManagementCard from './DAOManagementCard';
import './dashboard.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { selectedDashboardBtn } = useSelector((state: RootState) => state.partner);

  const selectBtn = (btn: string) => {
    dispatch(setDashboardBtn(btn === selectedDashboardBtn ? null : btn));
  };

  return (
    <Box
      className="sw-main-dashboard-wrapper"
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="sw-box"
      >
        <Box sx={{ pb: 'auto' }}>
          <Typography textAlign="center" component="div" variant="h1">
            Welcome to your Partner Dashboard <br />
            <small> where your Community happens.</small>
          </Typography>
        </Box>
        <Box
          sx={{
            mx: 'auto',
            flex: 1,
            display: 'flex',
            width: '350px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gridGap: '20px',
          }}
        >
          <SwButton
            mode="light"
            btnType="large"
            endIcon={<Network />}
            label="DAO Management"
            className={selectedDashboardBtn === 'dao' ? 'active-link' : ''}
            onClick={() => selectBtn('dao')}
          />
          <SwButton mode="light" btnType="large" disabled endIcon={<Coins />} label="Rewards">
            <Typography variant="h2" textAlign="center">
              Rewards <br />
              <small> (coming soon)</small>
            </Typography>
          </SwButton>
        </Box>
      </Box>
      {selectedDashboardBtn ? <DAOManagementCard /> : <DAOSummaryCard />}
    </Box>
  );
};

export default Dashboard;
