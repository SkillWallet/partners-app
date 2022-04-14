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

const RoleSkills = ({ control, activeRoleIndex }) => {
  const classes = useStyles();
  const skillsFields = useFieldArray({
    control,
    name: `roles[${activeRoleIndex}].skills`,
  });

  useEffect(() => {
    console.log(control);
    // skillsFields.remove();
    // skillsFields.insert(0, defaultSkills);
  }, []);

  return (
    <>
      {skillsFields.fields.map((_, index) => {
        return (
          <Controller
            key={`roles[${activeRoleIndex}].skills[${index}].name`}
            name={`roles[${activeRoleIndex}].skills[${index}].name`}
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
                  placeholder="Add a skill"
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
      })}
    </>
  );
};

export default RoleSkills;
