import { TextField } from '@mui/material';
import { useFieldArray, Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';

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

  useEffect(() => {
    console.log(control);
  }, []);

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
              marginTop: '55px',
              width: '290px',
              '.MuiInput-root': {
                width: '290px',
                color: 'primary.main',
                fontSize: '21px',
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
