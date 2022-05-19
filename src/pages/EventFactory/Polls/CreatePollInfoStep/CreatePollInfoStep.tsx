import { Box, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '@store/store.model';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { pxToRem } from '@utils/text-size';
import './CreatePollInfoStep.scss';
import { CreatePollData, pollUpdateData } from '@store/Activity/create-poll.reducer';
import { countWords } from '@utils/helpers';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import PartnerButton from '@components/Button';

const CreatePollInfoStep = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { title, description, duration } = useSelector(CreatePollData);

  const { control, handleSubmit, watch } = useForm({
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

  const onSubmit = async (data: any) => {
    await dispatch(pollUpdateData(data));
    history.push('/partner/event-factory/polls/options');
  };

  return (
    <>
      <Typography color="primary.main" fontSize={pxToRem(50)} textAlign="center">
        Polls & Proposals
      </Typography>
      <Typography sx={{ mb: pxToRem(35) }} color="primary.main" fontSize={pxToRem(33)} textAlign="center">
        Add Title, Description and Duration for your Community Proposal.
      </Typography>
      <form className="sw-poll-info-wrapper" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            margin: '0 auto',
            maxWidth: pxToRem(637),
          }}
        >
          <div
            className="sw-form-field"
            style={{
              marginBottom: pxToRem(25),
            }}
          >
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
                      rows={8}
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
              fontSize={pxToRem(18)}
            >
              Duration
            </Typography>
            <div
              className="sw-duration-options"
              style={{
                display: 'flex',
                gridGap: pxToRem(25),
              }}
            >
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
                          <PartnerButton
                            mode="light"
                            name={name}
                            type="button"
                            onClick={() => onChange(durationValue)}
                            className={value === durationValue ? 'active-link' : ''}
                            btnStyles={{
                              width: pxToRem(110),
                              height: pxToRem(40),
                              fontSize: pxToRem(18),
                              padding: 0,
                              '.sw-btn-label': {
                                textAlign: 'center',
                              },
                            }}
                          >
                            <Typography variant="body2">{durationName}</Typography>
                          </PartnerButton>
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
          <PartnerButton
            type="submit"
            btnStyles={{
              width: pxToRem(630),
              height: pxToRem(100),
              fontSize: pxToRem(28),
              '.sw-btn-label': {
                textAlign: 'center',
              },
            }}
            disabled={!values?.description || !values.title || !values.duration}
            mode="light"
            label="Next"
          />
        </div>
      </form>
    </>
  );
};

export default CreatePollInfoStep;
