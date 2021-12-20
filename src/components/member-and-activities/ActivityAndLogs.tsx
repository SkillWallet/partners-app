import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { List, ListItem, Avatar, SvgIcon } from '@mui/material';
import Link from '@mui/material/Link';
import { ReactComponent as TagIcon } from '@assets/tag.svg';

const ActivityAndLogs = ({ logs }) => {
  return (
    <List
      className="members-grid"
      sx={{
        padding: 0,
        display: 'flex',
        width: '100%',
        gridGap: '20px',
        flexDirection: 'column',
      }}
    >
      {logs.map(({ img, title, sign, source, timestamp, role }, subIndex) => {
        return (
          <ListItem
            sx={{
              height: '65px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            key={subIndex}
            disablePadding
          >
            <Box
              sx={{
                px: '45px',
                border: '1px solid',
                borderColor: 'primary.main',
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Avatar
                sx={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid',
                  backgroundColor: 'white',
                }}
                src={img}
              />
              <Typography
                sx={{
                  color: 'primary.main',
                  textAlign: 'center',
                }}
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  color: 'primary.main',
                  textAlign: 'center',
                }}
                variant="body1"
              >
                {sign}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: 'primary.main',
                    textAlign: 'center',
                  }}
                  variant="body2"
                >
                  {timestamp?.toDateString && timestamp?.toDateString()}
                </Typography>
                <Link variant="body2" underline="always" target="_blank" rel="noopener" href="source">
                  see transaction
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                width: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SvgIcon
                sx={{
                  height: '23px',
                }}
                component={TagIcon}
              />
              <Typography
                sx={{
                  color: 'primary.main',
                  textAlign: 'center',
                  mt: '4px',
                }}
                variant="body1"
              >
                {role}
              </Typography>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ActivityAndLogs;
