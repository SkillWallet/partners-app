import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store.model';

const DAOSummaryCard = () => {
  const { community, status } = useSelector((state: RootState) => state.community);
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        my: 'auto',
      }}
    >
      {status === 'Idle' ? (
        <>
          <Card
            sx={{
              height: '313px',
              width: '415px',
              mb: '20px',
              p: '40px',
              border: '1px solid',
              borderColor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.dark',
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    height: '54px',
                    width: '54px',
                  }}
                  variant="square"
                  src={community?.image as string}
                />
              }
              sx={{
                '.MuiAvatar-root': {
                  backgroundColor: 'transparent',
                },
              }}
              title={community?.name}
              titleTypographyProps={{
                mx: 'auto',
                variant: 'h3',
                color: 'primary.main',
                mt: '6px',
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
              <Typography color="primary.main" variant="body1" component="div">
                {community?.description}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              border: '1px solid',
              width: '412px',
              borderColor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardHeader
              title={community?.properties.template}
              titleTypographyProps={{
                variant: 'h3',
                color: 'primary.main',
              }}
            />
          </Card>
        </>
      ) : (
        <CircularProgress
          sx={{
            justifyContent: 'center',
            alignContent: 'center',
          }}
        />
      )}
    </Box>
  );
};

export default DAOSummaryCard;
