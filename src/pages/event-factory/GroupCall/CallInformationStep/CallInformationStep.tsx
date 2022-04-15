import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '@store/store.model';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SwButton, SwScrollbar } from 'sw-web-shared';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { pxToRem } from '@utils/text-size';
import { generateDurationInterval } from '@utils/helpers';
import {
  ActivityGroupCallData,
  ActivityGroupCallError,
  ActivityGroupCallStatus,
  activityUpdateGroupCallData,
  activityUpdateGroupCallStatus,
} from '@store/Activity/group-call.reducer';
import { format } from 'date-fns';
import { makeStyles } from '@mui/styles';
import { allRoles } from '@store/Community/community.reducer';
import { addGroupCall } from '@api/activities.api';
import { ResultState } from '@store/result-status';
import ErrorDialog from '@components/ErrorPopup';
import LoadingDialog from '@components/LoadingPopup';
import './CallInformationStep.scss';
import { DiscordWebHookUrl } from '@store/Partner/partner.reducer';
import { openSnackbar } from '@store/ui-reducer';

const useStyles = makeStyles({
  select: {
    '& ul': {
      color: '#000',
    },
    '& li': {
      fontSize: pxToRem(18),
      '&:hover:not(.Mui-selected)': {
        backgroundColor: '#000',
        color: '#fff',
      },
    },
  },
});

const CallInformationStep = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const roles = useSelector(allRoles);
  const status = useSelector(ActivityGroupCallStatus);
  const errorMessage = useSelector(ActivityGroupCallError);
  const webhookUrl = useSelector(DiscordWebHookUrl);
  const { startDate, duration, startTime, forCoreTeamRoles, role, allParticipants, participants } = useSelector(ActivityGroupCallData);
  const [timeSlots] = useState(generateDurationInterval());

  const { control, handleSubmit, watch, resetField } = useForm({
    mode: 'onChange',
    defaultValues: {
      duration,
      startTime,
      forCoreTeamRoles,
      role,
      allParticipants,
      participants,
    },
  });
  const values = watch();

  const onSubmit = async () => {
    const metadata = {
      startDate,
      startTime,
      ...values,
    };
    await dispatch(activityUpdateGroupCallData(values));
    const result = await dispatch(addGroupCall(metadata));
    if (result.meta.requestStatus === 'fulfilled') {
      history.push('/partner/event-factory/group-call/success');
    }
  };

  const handleDialogClose = () => {
    dispatch(activityUpdateGroupCallStatus(ResultState.Idle));
  };

  return (
    <>
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message={errorMessage || 'Something went wrong'} />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message="Creating community call activity..." />
      <Typography sx={{ mb: pxToRem(15) }} color="primary.main" variant="h1" fontWeight="bold" textAlign="center">
        Group Call
      </Typography>
      <Typography sx={{ opacity: 0.5, mb: pxToRem(75) }} color="primary.main" variant="h2" textAlign="center">
        Lorem ipsum dolor sit amet, consetetur
      </Typography>
      <form className="sw-info-wrapper" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: pxToRem(65) }}>
            <Typography sx={{ mb: pxToRem(20), fontSize: '25px' }} color="primary.main">
              {startDate && format(new Date(startDate), 'PPPP')}
            </Typography>
            <Typography sx={{ mb: pxToRem(20) }} color="primary.main" variant="h3">
              How long would you like the call to be?
            </Typography>
            <SwScrollbar
              sx={{
                height: '400px',
                flex: 1,
              }}
            >
              <List
                sx={{
                  alignItems: 'flex-start',
                }}
              >
                {timeSlots.map((slot, index) => {
                  return (
                    <Controller
                      key={`duration-key-${index}`}
                      name="duration"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <ListItemButton selected={value === slot.value} onClick={() => onChange(slot.value)}>
                            <ListItemText primary={slot.label} />
                          </ListItemButton>
                        );
                      }}
                    />
                  );
                })}
              </List>
            </SwScrollbar>
          </Box>
          <Divider sx={{ borderColor: '#707070' }} orientation="vertical" />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: pxToRem(65) }}>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography sx={{ mb: pxToRem(20), fontSize: '25px' }} color="primary.main">
                Lorem ipsum dolor sit
              </Typography>
              <Typography sx={{ mb: pxToRem(20) }} color="primary.main" variant="h3">
                Who will be joining the call?
              </Typography>
              <FormControl sx={{ mb: '20px' }}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="forCoreTeamRoles"
                  render={({ field: { value, onChange } }) => (
                    <RadioGroup
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.defaultValue === 'true');
                        resetField('role');
                      }}
                    >
                      <FormControlLabel
                        sx={{
                          '.MuiTypography-root': {
                            fontSize: '19px',
                          },
                        }}
                        value
                        control={<Radio />}
                        label="Core Team"
                      />
                      <FormControlLabel
                        sx={{
                          '.MuiTypography-root': {
                            fontSize: '19px',
                          },
                        }}
                        value={false}
                        control={<Radio />}
                        label="Community"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
              <div className="sw-form-field">
                <div className="sw-form-field-content">
                  <Controller
                    rules={{
                      required: true,
                    }}
                    name="role"
                    control={control}
                    render={({ field: { name, value, onChange } }) => {
                      return (
                        <Select
                          name={name}
                          color="primary"
                          value={value || ''}
                          displayEmpty
                          disabled={values.forCoreTeamRoles === undefined || values.forCoreTeamRoles === null}
                          required
                          renderValue={(selected) => {
                            if (!selected) {
                              return 'Select One';
                            }
                            return selected;
                          }}
                          MenuProps={{ classes: { paper: classes.select } }}
                          onChange={onChange}
                        >
                          {roles
                            .filter((r) => r.isCoreTeamMember === values.forCoreTeamRoles)
                            .map((r, index) => (
                              <MenuItem color="primary" key={`role-option-key-${r.roleName}-${index}`} value={r.roleName}>
                                {r.roleName}
                              </MenuItem>
                            ))}
                        </Select>
                      );
                    }}
                  />
                </div>
              </div>

              <Typography
                sx={{
                  color: 'primary.main',
                  py: 2,
                  mt: 2,
                }}
                component="div"
                variant="h4"
              >
                How many Members should participate?
              </Typography>
              <div className="form-fields">
                <div className="sw-form-field">
                  <div className="sw-form-field-content">
                    <Controller
                      name="participants"
                      control={control}
                      rules={{ min: 0 }}
                      render={({ field: { name, value, onChange } }) => {
                        return (
                          <TextField
                            type="number"
                            autoFocus
                            required
                            disabled={values.allParticipants}
                            focused
                            id={name}
                            name={name}
                            value={value || ''}
                            onChange={onChange}
                            inputProps={{ min: 0 }}
                            color="primary"
                            placeholder="Number"
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="sw-form-field">
                  <div className="sw-form-field-content">
                    <Controller
                      name="allParticipants"
                      control={control}
                      render={({ field: { name, value, onChange } }) => {
                        return (
                          <SwButton
                            name={name}
                            mode="light"
                            type="button"
                            sx={{
                              width: '120px',
                              height: '40px',
                              ml: '10px',
                            }}
                            onClick={() => onChange(!value)}
                            className={value ? 'active-link' : ''}
                          >
                            <Typography variant="body2">All</Typography>
                          </SwButton>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Box>

        <div className="bottom-action" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SwButton
            sx={{
              width: pxToRem(290),
              height: pxToRem(60),
              mb: pxToRem(40),
              mt: pxToRem(40),
              border: '1px solid',
            }}
            mode="light"
            type="submit"
            label="Submit"
          />
        </div>
      </form>
    </>
  );
};

export default CallInformationStep;
