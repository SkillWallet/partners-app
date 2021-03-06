import Typography from '@mui/material/Typography';
import { List, ListItem, Avatar } from '@mui/material';

const Members = ({ members }) => {
  return (
    <List
      className="members-grid"
      sx={{
        padding: 0,
        display: 'grid',
        width: '100%',
        gridGap: '20px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
        gridAutoRows: 'minmax(105px, auto)',
      }}
    >
      {members.map(({ imageUrl, nickname }, subIndex) => {
        return (
          <ListItem
            sx={{
              width: '85px',
              height: '85px',
              display: 'flex',
              flexDirection: 'column',
            }}
            key={subIndex}
            disablePadding
          >
            <Avatar
              sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                boxSizing: 'border-box',
                width: '85px',
                height: '85px',
              }}
              src={imageUrl}
              variant="square"
            />
            <Typography
              sx={{
                color: 'primary.main',
                textAlign: 'center',
                mt: '4px',
              }}
              variant="body2"
            >
              {nickname}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Members;
