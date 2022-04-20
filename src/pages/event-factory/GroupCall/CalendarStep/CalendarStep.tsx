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
import PartnerButton from '@components/Button';

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
      <Typography sx={{ mb: pxToRem(20) }} color="primary.main" fontSize={pxToRem(50)} textAlign="center">
        Group Call
      </Typography>
      <Typography sx={{ mb: pxToRem(35) }} color="primary.main" fontSize={pxToRem(33)} textAlign="center">
        Hello friend 🖖 I’m your Web3 scheduling assistant 📞 <br /> Set a date and time for your Community Call & let’s make it official.
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
              sx={{ height: '20px', margin: `0 auto ${pxToRem(20)} auto`, fontSize: pxToRem(25) }}
              color="primary.main"
              textAlign="center"
            >
              {values.startDate ? format(new Date(values.startDate), 'PPPP') : 'Select date'}
            </Typography>
            <SwScrollbar
              sx={{
                height: pxToRem(400),
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
                            sx={{
                              width: pxToRem(300),
                              height: pxToRem(60),
                            }}
                            disabled={!values.startDate}
                            selected={isEqual(new Date(!!value ? value : startTime), slot)}
                            onClick={() => onChange(slot)}
                          >
                            <ListItemText
                              sx={{
                                color: 'primary.main',
                                fontSize: pxToRem(21),
                              }}
                              primary={format(slot, 'hh:mm a')}
                            />
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
          <PartnerButton
            btnStyles={{
              width: pxToRem(300),
              height: pxToRem(60),
              mb: pxToRem(40),
              mt: pxToRem(40),
              border: '1px solid',
              '.sw-btn-label': {
                textAlign: 'center',
              },
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
