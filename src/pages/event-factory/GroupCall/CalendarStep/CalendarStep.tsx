import { Box, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useAppDispatch } from '@store/store.model';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SwButton, SwScrollbar } from 'sw-web-shared';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { SwCalendarPicker } from '@components/Fields';
import { pxToRem } from '@utils/text-size';
import { generateTimeSlots } from '@utils/helpers';
import { ActivityGroupCallData, activityUpdateGroupCallData } from '@store/Activity/group-call.reducer';
import { format, isEqual } from 'date-fns';
import './CalendarStep.scss';

const CalendarStep = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { startDate, startTime } = useSelector(ActivityGroupCallData);
  const [timeSlots] = useState(
    generateTimeSlots({
      start: 10,
      end: 24,
      interval: 30,
    })
  );

  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      startDate,
      startTime,
    },
  });
  const values = watch();

  const onSubmit = async () => {
    dispatch(activityUpdateGroupCallData(values));
    history.push('/partner/event-factory/group-call/info');
  };

  return (
    <>
      <Typography sx={{ mb: pxToRem(15) }} color="primary.main" variant="h1" fontWeight="bold" textAlign="center">
        Group Call
      </Typography>
      <Typography sx={{ opacity: 0.5, mb: pxToRem(75) }} color="primary.main" variant="h2" textAlign="center">
        Lorem ipsum dolor sit amet, consetetur
      </Typography>
      <form className="sw-calendar-wrapper" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: pxToRem(65) }}>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
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
            <Typography
              sx={{ height: '20px', margin: `0 auto ${pxToRem(20)} auto`, fontSize: '25px' }}
              color="primary.main"
              textAlign="center"
            >
              {values.startDate ? format(new Date(values.startDate), 'PPPP') : 'Select date'}
            </Typography>
            <SwScrollbar
              sx={{
                height: '400px',
                flex: 1,
              }}
            >
              <List>
                {timeSlots.map((slot, index) => {
                  return (
                    <Controller
                      key={`slot-key-${index}`}
                      name="startTime"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <ListItemButton
                            disabled={!values.startDate}
                            selected={isEqual(new Date(!!value ? value : startTime), slot)}
                            onClick={() => onChange(slot)}
                          >
                            <ListItemText primary={format(slot, 'hh:mm a')} />
                          </ListItemButton>
                        );
                      }}
                    />
                  );
                })}
              </List>
            </SwScrollbar>
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
            label="Next"
          />
        </div>
      </form>
    </>
  );
};

export default CalendarStep;
