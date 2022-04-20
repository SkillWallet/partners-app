/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '@store/store.model';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { pxToRem } from '@utils/text-size';
import { SwButton, SwScrollbar } from 'sw-web-shared';
import './CreatePollInfoStep.scss';
import { CreatePollData, pollUpdateData } from '@store/Activity/create-poll.reducer';
import { countWords } from '@utils/helpers';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const CreatePollInfoStep = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { title, description, duration } = useSelector(CreatePollData);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title,
      description,
      duration,
    },
  });

  const durations = [
    { durationName: '1 Day', durationValue: '1d' },
    { durationName: '1 Week', durationValue: '1w' },
    { durationName: '1 Month', durationValue: '1mo' },
  ];

  const values = watch();

  console.log(values, 'values');

  const onSubmit = async (data: any) => {
    console.log(data);
    await dispatch(pollUpdateData(data));
    history.push('/partner/event-factory/polls/options');
  };

  return (
    <>
      <Typography sx={{ mb: pxToRem(15) }} color="primary.main" variant="h1" fontWeight="bold" textAlign="center">
        Polls & Proposals
      </Typography>
      <Typography sx={{ opacity: 0.5, mb: pxToRem(75) }} color="primary.main" variant="h2" textAlign="center">
        Lorem ipsum dolor sit amet, consetetur
      </Typography>
      <form className="sw-poll-info-wrapper" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className="sw-form-field">
            <div className="sw-form-field-content">
              <Controller
                name="title"
                control={control}
                rules={{
                  required: true,
                  validate: {
                    maxWords: (v: string) => countWords(v) <= 6,
                  },
                }}
                render={({ field: { name, value, onChange } }) => {
                  return (
                    <TextField
                      autoFocus
                      required
                      focused
                      name={name}
                      value={value || ''}
                      placeholder="Poll Title"
                      onChange={onChange}
                      inputProps={{ maxLength: 20 }}
                      color="primary"
                      helperText={
                        <Typography color="primary" align="right" component="span" variant="body2">
                          {6 - countWords(value)} Words left
                        </Typography>
                      }
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="sw-form-field">
            <div className="sw-form-field-content">
              <Controller
                name="description"
                control={control}
                rules={{ maxLength: 280 }}
                render={({ field: { name, value, onChange } }) => {
                  return (
                    <TextField
                      required
                      focused
                      name={name}
                      multiline
                      rows={4}
                      value={value || ''}
                      onChange={onChange}
                      inputProps={{ maxLength: 280 }}
                      color="primary"
                      placeholder="Poll Description"
                      helperText={
                        <Typography color="primary" align="right" component="span" variant="body2">
                          {280 - (value?.length || 0)} of 280 characters left
                        </Typography>
                      }
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="sw-form-field">
            <Typography
              sx={{
                color: 'primary.main',
                textAlign: 'start',
                mb: 2,
              }}
              component="div"
              variant="h4"
            >
              Duration
            </Typography>
            <div className="sw-duration-options">
              {durations.map(({ durationName, durationValue }, index) => {
                return (
                  <Fragment key={durationValue}>
                    <Controller
                      rules={{
                        required: true,
                      }}
                      name="duration"
                      control={control}
                      render={({ field: { name, value, onChange } }) => {
                        return (
                          <SwButton
                            mode="light"
                            name={name}
                            type="button"
                            sx={{
                              width: '115px',
                              height: '35px',
                              ml: `${index !== 0 ? pxToRem(5) : '0'}`,
                            }}
                            onClick={() => onChange(durationValue)}
                            className={value === durationValue ? 'active-link' : ''}
                          >
                            <Typography variant="body2">{durationName}</Typography>
                          </SwButton>
                        );
                      }}
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </Box>

        <div
          className="bottom-action"
          style={{ marginBottom: pxToRem(40), marginTop: pxToRem(40), display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <SwButton
            sx={{
              width: pxToRem(450),
              height: pxToRem(70),
              mb: pxToRem(40),
              mt: pxToRem(40),
              border: '1px solid',
            }}
            disabled={!values?.description || !values.title || !values.duration}
            mode="light"
            type="submit"
            label="Next"
          />
        </div>
      </form>
    </>
  );
};

export default CreatePollInfoStep;
