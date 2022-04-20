/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '@store/store.model';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { pxToRem } from '@utils/text-size';
import { SwButton, SwScrollbar } from 'sw-web-shared';
import './CreatePollParticipantsStep.scss';
import {
  CreatePollData,
  CreatePollError,
  CreatePollStatus,
  createPollUpdateStatus,
  pollUpdateData,
} from '@store/Activity/create-poll.reducer';
import { countWords } from '@utils/helpers';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommunityRoles } from '@store/Community/community.reducer';
import { makeStyles } from '@mui/styles';
import ErrorDialog from '@components/ErrorPopup';
import LoadingDialog from '@components/LoadingPopup';
import { ResultState } from '@store/result-status';
import { removeEmoji } from '@components/EmojiInputPicker/EmojiInputPicker';
import { addPoll } from '@api/activities.api';

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

const CreatePollParticipantsStep = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [roles] = useState(useSelector(getCommunityRoles(false)));
  const classes = useStyles();
  const status = useSelector(CreatePollStatus);
  const errorMessage = useSelector(CreatePollError);
  const data = useSelector(CreatePollData);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      role: data.role,
      allRoles: data.allRoles,
    },
  });

  const values = watch();
  const handleDialogClose = () => {
    dispatch(createPollUpdateStatus(ResultState.Idle));
  };

  console.log(values, 'values');

  const onSubmit = async () => {
    const { emojis, options } = data.options.reduce(
      (prev, { option, emoji }) => {
        prev.emojis = [...prev.emojis, emoji];
        prev.options = [...prev.options, removeEmoji(option)];
        return prev;
      },
      {
        emojis: [],
        options: [],
      }
    );
    const metadata = {
      ...data,
      ...values,
      options,
      emojis,
    };

    console.log(metadata, 'METADATA');

    await dispatch(pollUpdateData(values));
    const result = await dispatch(addPoll(metadata));
    if (result.meta.requestStatus === 'fulfilled') {
      history.push('/partner/event-factory/polls/success');
    }
  };

  return (
    <>
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message={errorMessage || 'Something went wrong'} />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message="Creating community poll..." />
      <Typography sx={{ mb: pxToRem(15) }} color="primary.main" variant="h1" fontWeight="bold" textAlign="center">
        Polls & Proposals
      </Typography>
      <Typography sx={{ opacity: 0.5, mb: pxToRem(75) }} color="primary.main" variant="h2" textAlign="center">
        Lorem ipsum dolor sit amet, consetetur
      </Typography>
      <form className="sw-poll-participants-wrapper" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Typography
            sx={{
              color: 'primary.main',
              textAlign: 'start',
              mb: 2,
            }}
            component="div"
            variant="h4"
          >
            Who will participate in this Poll?
          </Typography>

          <div className="sw-form-field">
            <div className="sw-form-field-content">
              <Controller
                rules={{
                  required: !values.allRoles,
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
                      disabled={values.allRoles}
                      required={!values.allRoles}
                      renderValue={(selected) => {
                        if (!selected) {
                          return 'Select One';
                        }
                        return selected;
                      }}
                      MenuProps={{ classes: { paper: classes.select } }}
                      onChange={onChange}
                    >
                      {roles.map((r, index) => (
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

          <div className="sw-form-field">
            <div className="sw-form-field-content">
              <Controller
                name="allRoles"
                control={control}
                render={({ field: { name, value, onChange } }) => {
                  return (
                    <SwButton
                      name={name}
                      mode="light"
                      type="button"
                      sx={{
                        width: '20rem',
                        height: '50px',
                      }}
                      onClick={() => {
                        reset({
                          role: null,
                          allRoles: !value,
                        });
                      }}
                      className={value ? 'active-link' : ''}
                    >
                      All
                    </SwButton>
                  );
                }}
              />
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
            disabled={!values?.role && !values.allRoles}
            mode="light"
            type="submit"
            label="Submit"
          />
        </div>
      </form>
    </>
  );
};

export default CreatePollParticipantsStep;
