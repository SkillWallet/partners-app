/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchMembers } from '@partners-store/Members/members.reducer';
import { useAppDispatch, RootState } from '@partners-store/store.model';
import { ImageListItemBar, IconButton, List, ListItem, Typography, Avatar, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './members.scss';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];

const Members = (props) => {
  const dispatch = useAppDispatch();
  const { members } = useSelector((state: RootState) => state.members);
  const { community } = useSelector((state: RootState) => state.community);
  const [activeTab, setActiveTab] = useState('role1');
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role1, setRole1] = useState({ roleType: '', members: [] });
  const [role2, setRole2] = useState({ roleType: '', members: [] });
  const [role3, setRole3] = useState({ roleType: '', members: [] });

  const [value, setValue] = useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (community) {
      dispatch(fetchMembers(community?.address));
    }
  }, [community, dispatch]);

  useEffect(() => {
    if (members && roles.length === 0) {
      const newRoles = Object.keys(members);

      setRoles(newRoles);
      setRole1({
        roleType: newRoles[0],
        members: members[newRoles[0]],
      });
      setRole2({
        roleType: newRoles[1],
        members: members[newRoles[1]],
      });
      setRole3({
        roleType: newRoles[2],
        members: members[newRoles[2]],
      });

      setIsLoading(false);
    } else if (!members) {
      setIsLoading(true);
    }
  }, [props.state, roles, role1, role2, role3]);

  const changeTab = (newTab) => {
    setActiveTab(newTab);
  };

  const data = {
    activity: {
      maxMembers: 100,
      currentMembers: 10,
      members: [{ name: 'SW 1' }, { name: 'SW 2' }, { name: 'SW 3' }],
    },
  };

  const renderMembers = () => {
    let users = [];
    const components = [];

    if (activeTab === 'role1') {
      users = role1.members;
    } else if (activeTab === 'role2') {
      users = role2.members;
    } else {
      users = role3.members;
    }

    if (users) {
      for (let i = 0; i < users.length; i += 1) {
        components.push(
          <div className="role-avatar-div" key={i}>
            <img src={users[i].imageUrl} alt="user avater" />
            <p>{users[i].nickname}</p>
          </div>
        );
      }
    }
    return components;
  };

  return (
    <Box
      sx={{
        p: 0,
        m: 0,
        gridGap: '30px',
      }}
      className="sw-box"
    >
      <Typography sx={{ color: 'text.primary', textAlign: 'center', pb: 2, mt: 4 }} component="div" variant="h1">
        Members
      </Typography>
      <List
        sx={{
          padding: 4,
          mt: 4,
        }}
      >
        {members &&
          Object.keys(members).map((key, index) => {
            return (
              <ListItem
                sx={{
                  height: '350px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                key={index}
                disablePadding
              >
                <Typography sx={{ mb: 1 }} variant="h2" component="div">
                  {key}
                </Typography>
                <List className="members-grid">
                  {members[key].map(({ imageUrl, nickname }, subIndex) => {
                    return (
                      <ListItem
                        sx={{
                          width: '120px',
                          height: '120px',
                        }}
                        key={subIndex}
                        disablePadding
                      >
                        <Avatar
                          sx={{
                            width: '120px',
                            height: '120px',
                          }}
                          src={imageUrl}
                          variant="square"
                        />
                        <ImageListItemBar
                          sx={{
                            '.MuiImageListItemBar-titleWrap': {
                              p: 0,
                              mt: '5px',
                            },
                          }}
                          title={nickname}
                          actionIcon={
                            <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                              <ContentCopyIcon />
                            </IconButton>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </ListItem>
            );
          })}
      </List>
    </Box>
    // <div className="dashboard-main">
    //   <div className="members-content">
    //     {isLoading ? (
    //       <>'Loading!'</>
    //     ) : (
    //       <>
    //         <div className="tabs">
    //           <div className={activeTab === 'role1' ? 'tab activeTab' : 'tab'} onClick={() => changeTab('role1')}>
    //             {role1.roleType}
    //           </div>
    //           <div className={activeTab === 'role2' ? 'tab activeTab' : 'tab'} onClick={() => changeTab('role2')}>
    //             {role2.roleType}
    //           </div>
    //           <div className={activeTab === 'role3' ? 'tab activeTab' : 'tab'} onClick={() => changeTab('role3')}>
    //             {role3.roleType}
    //           </div>
    //           <div className={activeTab === 'activity' ? 'tab activeTab' : 'tab'} onClick={() => changeTab('activity')}>
    //             Activity & Logs
    //           </div>
    //         </div>

    //         <div className="content-section">
    //           {activeTab === 'activity' ? (
    //             <ActivityAndTasks data={data.activity} />
    //           ) : (
    //             <div className="role-container">
    //               <div className="role-header">
    //                 <h4>
    //                   {10}/{100}
    //                 </h4>
    //               </div>

    //               <div className="avatar-container">{renderMembers()}</div>
    //             </div>
    //           )}
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </div>
  );
};

export default Members;
