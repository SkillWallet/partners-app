/* eslint-disable max-len */
import { TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { SwUploadFile } from 'sw-web-shared';
import { ReactComponent as UploadIcon } from '@assets/upload.svg';
import './CommunityInfoStep.scss';
import { countWords } from '@utils/helpers';
import { pxToRem } from '@utils/text-size';

function FormHelperText({ errors, name, children, value }) {
  if (errors[name]) {
    let message = '';
    const { type } = errors[name];
    switch (type) {
      case 'maxWords':
        message = `Words cannot be more than 3`;
        break;
      case 'maxLength':
        message = `Characters cannot be more than 280`;
        break;
      case 'required':
        message = 'Field is required!';
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
      {children}
    </Typography>
  );
}

const CommunityInfoStep = ({ errors, values, control }) => {
  return (
    <div className="sw-community-description">
      <Typography color="text.primary" lineHeight="1" sx={{ mb: '60px' }} component="div" fontSize={pxToRem(32)}>
        This is your DAO. Tell members all about it 🙌
      </Typography>
      <div
        className="sw-form-field"
        // style={{
        //   height: '80px',
        // }}
      >
        <Typography color="primary" sx={{ mb: '4px' }} component="div" fontSize={pxToRem(20)}>
          Name
        </Typography>
        <div className="sw-form-field-content">
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
              validate: {
                maxWords: (v: string) => countWords(v) <= 3,
              },
            }}
            render={({ field: { name, value, onChange }, fieldState }) => {
              return (
                <TextField
                  required
                  autoFocus
                  name={name}
                  value={value || ''}
                  onChange={onChange}
                  sx={{
                    '.MuiInputBase-input': {
                      height: '35px',
                      p: 0,
                      color: 'black',
                      '&::placeholder': {
                        opacity: 1,
                        color: '#707070',
                      },
                      '&::-webkit-input-placeholder': {
                        color: '#707070',
                        opacity: 1,
                        fontSize: pxToRem(18),
                      },
                      '&::-moz-placeholder': {
                        color: '#707070',
                        opacity: 1,
                      },
                    },
                  }}
                  placeholder="Show off with a great Community Name!"
                  helperText={
                    <FormHelperText value={value} name={name} errors={errors}>
                      {3 - countWords(value)} Words left
                    </FormHelperText>
                  }
                />
              );
            }}
          />
        </div>
      </div>
      <div
        className="sw-form-field upload-field"
        // style={{
        //   height: '80px',
        // }}
      >
        <div>
          <Typography color="primary" sx={{ mb: '4px' }} component="div" fontSize={pxToRem(20)}>
            Avatar
          </Typography>
          <Typography sx={{ color: '#707070', mb: '12px' }} component="div" fontSize={pxToRem(18)}>
            Your public Logo - that’s how others will know it’s really you.
          </Typography>
        </div>
        <div className="sw-image-upload">
          <Controller
            name="avatar"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, value, onChange }, fieldState, formState }) => {
              return (
                <>
                  <SwUploadFile
                    mode="dark"
                    variant="rounded"
                    name={name}
                    initialPreviewUrl={value}
                    fileChange={onChange}
                    defaulUploadIcon={<UploadIcon style={{ fontSize: 30, fill: 'black' }} />}
                    sx={{
                      width: '50px',
                      height: '50px',
                    }}
                  />
                  <FormHelperText value={value} name={name} errors={errors}>
                    {!values.avatar ? (
                      <div style={{ textAlign: 'center', lineHeight: '1', fontSize: pxToRem(16) }}>
                        .svg, .png, <br /> or .jpg
                      </div>
                    ) : (
                      ''
                    )}
                  </FormHelperText>
                </>
              );
            }}
          />
        </div>
      </div>

      <div
        className="sw-form-field"
        // style={{
        //   height: '145px',
        // }}
      >
        <Typography fontSize={pxToRem(20)} color="primary" sx={{ mb: '4px' }} component="div">
          Description
        </Typography>
        <div className="sw-form-field-content">
          <Controller
            name="description"
            control={control}
            rules={{ required: true, maxLength: 280 }}
            render={({ field: { name, value, onChange } }) => {
              return (
                <TextField
                  name={name}
                  value={value || ''}
                  onChange={onChange}
                  color="primary"
                  sx={{
                    '.MuiInputBase-input': {
                      p: 0,
                      color: 'black',
                      '&::placeholder': {
                        color: '#707070',
                        opacity: 1,
                      },
                      '&::-webkit-input-placeholder': {
                        color: '#707070',
                        opacity: 1,
                        fontSize: pxToRem(18),
                      },
                      '&::-moz-placeholder': {
                        color: '#707070',
                        opacity: 1,
                      },
                    },
                  }}
                  multiline
                  rows={5}
                  required
                  focused
                  placeholder="Introduce your community to the world. It can be a one-liner, common values, goals, or even the story behind it!"
                  helperText={
                    <FormHelperText value={value} name={name} errors={errors}>
                      Max characters {280 - (value?.length || 0)}
                    </FormHelperText>
                  }
                />
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityInfoStep;
