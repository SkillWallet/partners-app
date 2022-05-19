import { memo, useState } from 'react';
import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material';
import { Community } from '@api/community.model';
import { useSelector } from 'react-redux';
import PartnerButton from '@components/Button';
import { pxToRem } from '@utils/text-size';
import { communityUpdateState, getCommunityRoles } from '@store/Community/community.reducer';
import { RootState, useAppDispatch } from '@store/store.model';
import { updatePartnersCommunity } from '@api/community.api';
import { ResultState } from '@store/result-status';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import ErrorDialog from '@components/ErrorPopup';
import LoadingDialog from '@components/LoadingPopup';
import RoleSkills from './RoleSkills';
import EditRole from './EditRole';
import './Roles.scss';

const Roles = (props) => {
  const dispatch = useAppDispatch();
  const { status, community } = useSelector((state: RootState) => state.community);
  const roles = useSelector(getCommunityRoles(props.isCoreTeam));
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      roles,
    },
  });

  const rolesFields = useFieldArray({
    control,
    name: 'roles',
  });

  const values = watch();

  const onSubmit = async (data: typeof values) => {
    const allRoles = community.properties.skills.roles.map((r) => {
      const role = data.roles.find((updatedRole) => updatedRole.id === r.id);
      if (role) {
        return role;
      }
      return r;
    });
    await dispatch(
      updatePartnersCommunity(
        new Community({
          ...community,
          properties: {
            ...community.properties,
            skills: {
              roles: allRoles,
            },
          },
        })
      )
    );
  };

  const handleDialogClose = () => {
    dispatch(communityUpdateState(ResultState.Idle));
  };

  return (
    <form
      style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message="Something went wrong" />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message="Updating community roles..." />
      <Container className="sw-roles-wrapper" maxWidth="md" sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography color="primary.main" fontSize={pxToRem(50)} textAlign="center">
          {props.isCoreTeam ? 'Core Team' : 'Community'} - Roles & Skills
        </Typography>
        <Typography sx={{ mb: pxToRem(35) }} color="primary.main" fontSize={pxToRem(33)} textAlign="center">
          Customize Skills & Roles for your {props.isCoreTeam ? 'Core Team' : 'Community'} Members.
        </Typography>

        {status === ResultState.Loading ? (
          <div className="sw-loading-spinner">
            <CircularProgress
              sx={{
                justifyContent: 'center',
                alignContent: 'center',
              }}
            />
          </div>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', my: 2 }}>
              <Typography
                sx={{ flex: 1, fontSize: pxToRem(21), textTransform: 'uppercase' }}
                color="primary.main"
                fontWeight="bold"
                textAlign="center"
              >
                Pick Your Role
              </Typography>

              <Typography
                sx={{ flex: 1, fontSize: pxToRem(21), textTransform: 'uppercase' }}
                color="primary.main"
                fontWeight="bold"
                textAlign="center"
              >
                Add Your skills
              </Typography>
            </Box>
            <Divider sx={{ borderColor: '#707070', width: '80%', margin: '0 auto' }} />
            <Box sx={{ display: 'flex', flex: 1, mb: pxToRem(40) }}>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  mr: pxToRem(100),
                  justifyContent: 'center',
                }}
              >
                {rolesFields.fields.map((role, index) => (
                  <Controller
                    rules={{
                      required: true,
                    }}
                    key={`roles.${index}.roleName`}
                    name={`roles.${index}`}
                    control={control}
                    render={({ field: { name, value, onChange } }) => {
                      return (
                        <PartnerButton
                          mode="light"
                          name={name}
                          className={activeRoleIndex === index ? 'active-link' : ''}
                          label={role.roleName}
                          onClick={() => {
                            setActiveRoleIndex(index);
                            onChange(value);
                          }}
                          btnStyles={{
                            width: pxToRem(300),
                            height: pxToRem(60),
                            mt: pxToRem(68),
                            p: 0,
                            border: '1px solid',
                            '.sw-btn-label': {
                              textAlign: 'center',
                            },
                          }}
                        />
                      );
                    }}
                  />
                ))}
              </Box>
              <Divider sx={{ borderColor: '#707070', height: `calc(100% + ${'40px'})` }} orientation="vertical" />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: pxToRem(100) }}>
                <Typography
                  sx={{
                    color: 'primary.main',
                    mt: pxToRem(50),
                    mb: pxToRem(15),
                    fontSize: pxToRem(21),
                  }}
                  component="div"
                  fontWeight="bold"
                >
                  ROLE:
                </Typography>
                <EditRole control={control} activeRoleIndex={activeRoleIndex} />
                <Typography
                  sx={{
                    color: 'primary.main',
                    mt: pxToRem(50),
                    mb: pxToRem(15),
                    fontSize: pxToRem(21),
                  }}
                  component="div"
                  fontWeight="bold"
                >
                  SKILLS:
                </Typography>
                {roles.length && values.roles?.length ? <RoleSkills control={control} activeRoleIndex={activeRoleIndex} /> : null}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <PartnerButton
                btnStyles={{
                  width: pxToRem(300),
                  height: pxToRem(60),
                  mb: pxToRem(40),
                  mt: pxToRem(40),
                  p: 0,
                  border: '1px solid',
                  '.sw-btn-label': {
                    textAlign: 'center',
                  },
                }}
                mode="light"
                type="submit"
                label="Confirm & Rename Skills"
              />
            </Box>
          </Box>
        )}
      </Container>
    </form>
  );
};

export default memo(Roles);
