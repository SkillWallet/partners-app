import { Box, Divider, Typography } from '@mui/material';
import { useAppDispatch } from '@store/store.model';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SwButton } from 'sw-web-shared';
import { useEffect } from 'react';
import { ResultState } from '@store/result-status';
import { useForm } from 'react-hook-form';
import {
  ActivityCurrentStep,
  ActivityCurrentTask,
  ActivityStatus,
  activitySetCurrentStep,
  activityUpdateTask,
  activityUpdateTaskStatus,
} from '@store/Activity/create-task.reducer';
import './CalendarStep.scss';
import { sendDiscordNotificaiton } from '@api/discord.api';
import { openSnackbar } from '@store/ui-reducer';
import { DiscordWebHookUrl } from '@store/Partner/partner.reducer';
import { addActivityTask } from '@api/activities.api';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { SwCalendarPicker } from '@components/Fields';
import { pxToRem } from '@utils/text-size';

const CalendarStep = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { activeStep } = useSelector(ActivityCurrentStep);
  const status = useSelector(ActivityStatus);
  const webhookUrl = useSelector(DiscordWebHookUrl);
  const { role, isCoreTeamMembersOnly, allParticipants, participants, description, title } = useSelector(ActivityCurrentTask);

  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      title,
      description,
    },
  });
  const values = watch();

  const onSubmit = async (data: any) => {
    await dispatch(activityUpdateTask(data));
    const result = await dispatch(
      addActivityTask({
        role,
        isCoreTeamMembersOnly,
        allParticipants,
        participants,
        description: values.description,
        title: values.title,
      })
    );

    if (result.meta.requestStatus === 'fulfilled' && webhookUrl) {
      try {
        await sendDiscordNotificaiton(webhookUrl, { name: values.title, role, description: values.description });
      } catch (error) {
        dispatch(
          openSnackbar({
            message: 'Failed to send discord message.',
            severity: 'error',
            duration: 5000,
          })
        );
      }
      history.push('/partner/event-factory/create-task-success');
    }
  };

  const handleDialogClose = () => {
    dispatch(activityUpdateTaskStatus(ResultState.Idle));
  };

  useEffect(() => {
    if (activeStep !== 2) {
      dispatch(
        activitySetCurrentStep({
          activeStep: 2,
          title: null,
          description: null,
          toPrevBtnPath: '/partner/event-factory/create-task/roles',
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <>
      <Typography sx={{ mb: pxToRem(15) }} color="primary.main" variant="h1" fontWeight="bold" textAlign="center">
        Group Call
      </Typography>
      <Typography sx={{ opacity: 0.5, mb: pxToRem(75) }} color="primary.main" variant="h2" textAlign="center">
        Lorem ipsum dolor sit amet, consetetur
      </Typography>
      <form className="sw-calendar-wrapper" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flex: 1, mb: pxToRem(40) }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: pxToRem(65) }}>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="sw-form-field">
                  <div className="sw-form-field-content">
                    <SwCalendarPicker control={control} name="startDate" minDate={new Date()} />
                  </div>
                </div>
              </LocalizationProvider>
            </Box>
          </Box>
          <Divider sx={{ height: `calc(100% + ${pxToRem(40)})`, borderColor: '#707070' }} orientation="vertical" />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: pxToRem(65) }}>
            <div className="sw-form-field">
              <div className="sw-form-field-content">test</div>
            </div>
          </Box>
        </Box>

        <div
          className="bottom-action"
          style={{ marginBottom: pxToRem(40), marginTop: pxToRem(40), display: 'flex', justifyContent: 'flex-end' }}
        >
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
            label="Next"
          />
        </div>
      </form>
    </>
  );
};

export default CalendarStep;
