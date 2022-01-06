import { memo, useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store/store.model';
import {
  toggleActiveRoleSkill,
  getCommunityRoles,
  setActiveRole,
  updateCommunity,
  fetchCommunity,
} from '@store/Community/community.reducer';
import { ResultState } from '@store/result-status';
import { setPreviusRoute } from '@store/ui-reducer';
import LoadingDialog from '@components/LoadingPopup';
import './roles.scss';

const skillData = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'];

const Roles = (props) => {
  const dispatch = useAppDispatch();
  const { status, community, activeRole } = useSelector((state: RootState) => state.community);
  const [roles] = useState(useSelector(getCommunityRoles(props.isCoreTeam)));

  const changeRole = ({ roleName }) => {
    dispatch(setActiveRole(roleName));
  };

  const updateSkills = async () => {
    await dispatch(
      updateCommunity({
        editedRole: activeRole,
        community,
      })
    );
    await dispatch(fetchCommunity(community?.address));
  };

  const addSelectedSkill = (selectedSkill: string) => {
    dispatch(toggleActiveRoleSkill(selectedSkill));
  };

  useEffect(() => {
    const url = props.isCoreTeam ? '/partner/dashboard/core-team' : '/partner/dashboard/community';
    dispatch(setPreviusRoute(url));
  }, [dispatch, props.isCoreTeam]);

  useEffect(() => {
    const [{ roleName }] = roles;
    dispatch(setActiveRole(roleName));
  }, [dispatch, roles]);

  return (
    <>
      <LoadingDialog open={status === ResultState.Updating} message="Updating community roles..." />
      <Box className="sw-roles-wrapper">
        <Typography sx={{ my: 2 }} variant="h1">
          Roles & Skills
        </Typography>
        <Typography sx={{ my: 2 }} variant="h3">
          Add Skills for each Role, and assign them to your {props.isCoreTeam ? 'Core Team' : 'Community Members'}
        </Typography>
        <Box
          className="sw-roles"
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              gridGap: '30px',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {roles.map((role: any, n) => {
              return (
                <SwButton
                  mode="light"
                  btnType="large"
                  key={n}
                  className={activeRole?.roleName === role?.roleName ? 'active-link' : ''}
                  label={role.roleName}
                  onClick={() => changeRole(role)}
                />
              );
            })}
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                mb: '20px',
                width: '415px',
                border: '1px solid',
                borderColor: 'primary.main',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.dark',
              }}
            >
              <CardHeader
                title={`Select up to 4 skills for "${activeRole?.roleName}"`}
                titleTypographyProps={{
                  mx: 'auto',
                  variant: 'h2',
                  align: 'center',
                  color: 'primary.main',
                  mt: '6px',
                }}
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  gridGap: '10px',
                  justifyContent: 'center',
                  p: '5px',
                }}
              >
                {skillData.map((skill, i) => {
                  return (
                    <SwButton
                      mode="light"
                      sx={{
                        height: '60px',
                        width: '105px',
                        borderWidth: '1px',
                        borderColor: 'primary.main',
                      }}
                      disabled={!activeRole?.skills?.includes(skill) && activeRole?.skills?.length === 4}
                      className={activeRole?.skills?.includes(skill) ? 'active-link' : ''}
                      key={i}
                      onClick={() => addSelectedSkill(skill)}
                    >
                      <Typography variant="h3">{skill}</Typography>
                    </SwButton>
                  );
                })}
              </CardContent>
            </Card>
            <SwButton
              mode="light"
              sx={{
                mt: '20px',
                height: '70px',
                width: '415px',
              }}
              disabled={status === ResultState.Loading}
              label="Confirm & Add Skills"
              onClick={() => updateSkills()}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(Roles);
