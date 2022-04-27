import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { pxToRem } from '@utils/text-size';

const useStyles = makeStyles(() => ({
  input: {
    // '&::placeholder': {
    //   color: '#000',
    //   opacity: 0.6,
    // },
  },
}));

const EditRole = ({ control, activeRoleIndex }) => {
  const classes = useStyles();

  return (
    <Controller
      key={`roles[${activeRoleIndex}].roleName`}
      name={`roles[${activeRoleIndex}].roleName`}
      control={control}
      render={({ field: { name, value, onChange } }) => {
        return (
          <TextField
            variant="standard"
            sx={{
              width: pxToRem(350),
              '.MuiInput-root': {
                width: pxToRem(350),
                color: 'primary.main',
                fontSize: pxToRem(21),
                '&:hover:not(.Mui-disabled):before': {
                  borderBottom: '1px solid #000000',
                },
              },
            }}
            placeholder="Name your role"
            name={name}
            value={value || ''}
            onChange={onChange}
            InputProps={{ classes: { input: classes.input } }}
            color="primary"
          />
        );
      }}
    />
  );
};

export default EditRole;
