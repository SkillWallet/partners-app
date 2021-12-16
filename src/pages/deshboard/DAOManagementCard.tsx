import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { ReactComponent as CoreTeam } from '@assets/core-team.svg';
import { ReactComponent as Community } from '@assets/community.svg';
import { SwButton } from 'sw-web-shared';
import { Link } from 'react-router-dom';

const DAOManagementCard = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          mb: '20px',
          width: '475px',
          p: '30px',
          border: '1px solid',
          borderColor: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.dark',
        }}
      >
        <CardHeader
          title={
            <span>
              Design Roles, Skills & <br /> Membership for your DAO
            </span>
          }
          titleTypographyProps={{
            mx: 'auto',
            align: 'center',
            variant: 'h3',
            color: 'primary.main',
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gridGap: '20px',
            }}
          >
            <SwButton mode="light" btnType="large" component={Link} to="/partner/dashboard/core-team" endIcon={<CoreTeam />}>
              Core Team
            </SwButton>
            <SwButton
              mode="light"
              btnType="large"
              component={Link}
              to="/partner/dashboard/community"
              endIcon={<Community />}
              label="Community"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DAOManagementCard;
