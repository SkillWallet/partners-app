import { memo, useState } from 'react';
import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material';
import { SwButton } from 'sw-web-shared';
import { Community } from '@api/community.model';
import { useSelector } from 'react-redux';
import { pxToRem } from '@utils/text-size';
import { communityUpdateState, getCommunityRoles } from '@store/Community/community.reducer';
import { RootState, useAppDispatch } from '@store/store.model';
import { updatePartnersCommunity } from '@api/community.api';
import { ResultState } from '@store/result-status';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import ErrorDialog from '@components/ErrorPopup';
import LoadingDialog from '@components/LoadingPopup';
import RoleSkills from './RoleSkills';
import './Roles.scss';
import EditRole from './EditRole';

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

  console.log(values, 'VALUES');

  const onSubmit = async (data: typeof values) => {
    const allRoles = community.properties.skills.roles.map((r) => {
      const role = data.roles.find((updatedRole) => updatedRole.id === r.id);
      if (role) {
        return role;
      }
      return r;
    });
    // community.properties.skills.roles = [...allRoles];
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
        <Typography sx={{ my: 2 }} color="primary.main" fontSize={pxToRem(50)} textAlign="center">
          {props.isCoreTeam ? 'Core Team' : 'Community'} - Roles & Skills
        </Typography>
        <Typography sx={{ my: 2 }} color="primary.main" variant="h3" textAlign="center">
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
              <Typography sx={{ flex: 1, fontSize: '21px' }} color="primary.main" fontWeight="bold" textAlign="center">
                Pick Your Role
              </Typography>

              <Typography sx={{ flex: 1, fontSize: '21px' }} color="primary.main" fontWeight="bold" textAlign="center">
                Add Your skills
              </Typography>
            </Box>
            <Divider sx={{ borderColor: '#707070', width: '80%', margin: '0 auto' }} />
            <Box sx={{ display: 'flex', flex: 1, mb: '40px' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: '40px' }}>
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
                        <SwButton
                          mode="light"
                          name={name}
                          className={activeRoleIndex === index ? 'active-link' : ''}
                          label={role.roleName}
                          onClick={() => {
                            setActiveRoleIndex(index);
                            onChange(value);
                          }}
                          sx={{
                            width: '290px',
                            height: '60px',
                            marginTop: '65px',
                            border: '1px solid',
                          }}
                        />
                      );
                    }}
                  />
                ))}
              </Box>
              <Divider sx={{ borderColor: '#707070', height: `calc(100% + ${'40px'})` }} orientation="vertical" />
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: '40px' }}>
                <EditRole control={control} activeRoleIndex={activeRoleIndex} />
                {roles.length && values.roles?.length ? <RoleSkills control={control} activeRoleIndex={activeRoleIndex} /> : null}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <SwButton
                sx={{
                  width: '290px',
                  height: '60px',
                  mb: '40px',
                  mt: '40px',
                  border: '1px solid',
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
