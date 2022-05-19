/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Link, Typography } from '@mui/material';
import { useAppDispatch } from '@store/store.model';
import { useHistory } from 'react-router-dom';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { pxToRem } from '@utils/text-size';
import EmojiInputPicker, { hasEmoji } from '@components/EmojiInputPicker/EmojiInputPicker';
import { SwButton } from 'sw-web-shared';
import DeleteIcon from '@mui/icons-material/Delete';
import './CreatePollOptionsStep.scss';
import { CreatePollData, pollUpdateData } from '@store/Activity/create-poll.reducer';
import { useSelector } from 'react-redux';
import PartnerButton from '@components/Button';
import { Fragment } from 'react';

function FormArrayHelperText({ errors, name, children = null, value }) {
  const [key, index] = name.split('.');

  const error = errors && errors[key] && errors[key][+index] && errors[key][+index];
  if (error) {
    let message = '';
    const { type } = error;
    switch (type) {
      case 'required':
        message = 'Field is required!';
        break;
      case 'missingEmoji':
        message = `Whoops! You forgot to add an emoji 🤭`;
        break;
      default:
        return null;
    }
    return (
      <Typography whiteSpace="nowrap" color="red" align="right" component="span" variant="body2">
        {message}
      </Typography>
    );
  }
  return (
    <Typography color="primary" align="right" component="span" variant="body2">
      {children || ''}
    </Typography>
  );
}

const CreatePollOptionsStep = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const data = useSelector(CreatePollData);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      options: data.options,
    },
  });

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'options',
  });

  const values = watch();

  const onSubmit = async () => {
    await dispatch(pollUpdateData(values));
    history.push('/partner/event-factory/polls/participants');
  };

  return (
    <>
      <Typography color="primary.main" fontSize={pxToRem(50)} textAlign="center">
        Polls & Proposals
      </Typography>
      <Typography sx={{ mb: pxToRem(35) }} color="primary.main" fontSize={pxToRem(33)} textAlign="center">
        Add 2-to-5 options & pick an emoji for each!
      </Typography>
      <form className="sw-polls-wrapper" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            margin: '0 auto',
            maxWidth: pxToRem(490),
          }}
        >
          {fields.map((field, index) => (
            <div className="field-with-delete-btn" key={field.id}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: {
                    missingEmoji: ({ option, emoji }) => {
                      return hasEmoji(option);
                    },
                  },
                }}
                name={`options.${index}`}
                render={({ field: { value, onChange } }) => {
                  return (
                    <div className="sw-form-field">
                      <div className="sw-form-field-content">
                        <EmojiInputPicker
                          type="text"
                          value={value}
                          onChange={onChange}
                          placeholder={`Option ${index + 1}`}
                          autoFocus={index === 0}
                          color="primary"
                          helperText={<FormArrayHelperText value={value} name={`options.${index}`} errors={errors} />}
                        />
                      </div>
                    </div>
                  );
                }}
              />
              <>
                {index > 1 ? (
                  <DeleteIcon
                    fontSize="small"
                    color="error"
                    onClick={() => remove(index)}
                    sx={{ cursor: 'pointer', ml: pxToRem(15), width: pxToRem(25), height: pxToRem(25) }}
                  />
                ) : (
                  <Box sx={{ ml: pxToRem(15), width: pxToRem(25), height: pxToRem(25) }} />
                )}
              </>
            </div>
          ))}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              mt: pxToRem(25),
            }}
          >
            <Link
              underline="none"
              disabled={values?.options?.length > 4}
              component="button"
              type="button"
              fontSize={pxToRem(18)}
              onClick={() => {
                append({ option: '', emoji: '' });
              }}
            >
              + Add Option
            </Link>
          </Box>
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
            mode="light"
            label="Next"
          />
        </div>
      </form>
    </>
  );
};

export default CreatePollOptionsStep;
