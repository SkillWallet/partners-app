/* eslint-disable react/no-unstable-nested-components */
import { SwButton, SwSlider } from 'sw-web-shared';
import { ReactComponent as ContractIcon } from '@assets/import-contract.svg';
import { ReactComponent as PaperIcon } from '@assets/paper.svg';
import { ReactComponent as OpenSourceIcon } from '@assets/open-source.svg';
import { ReactComponent as LocalProjectIcon } from '@assets/local-project.svg';
import { ReactComponent as ArtNftIcon } from '@assets/art-nft.svg';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material';
import { Controller, useFieldArray } from 'react-hook-form';
import { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import './TemplateStep.scss';

export const IntegrationTemplates = [
  {
    icon: OpenSourceIcon,
    title: 'Open-Source & DeFi',
    description: `For researchers & web3, open-source teams, that innovate in a liberal fashion - 
    for a more sustainable, meritocratic world.`,
  },
  {
    icon: ArtNftIcon,
    title: 'Art, Events & NFTs',
    description: `From support for people in need, to innovative 
    local hubs to get together & create something greater than oneself.`,
  },
  {
    icon: LocalProjectIcon,
    title: 'Local Projects & DAOs',
    description: `These are the Smart Contracts you’ll be tracking interactions
    with. Make sure you own them, as you will have to sign a
    transaction.`,
  },
];

const useStyles = makeStyles((theme) => ({
  input: {
    '&::placeholder': {
      color: 'white',
    },
  },
}));

const TemplateStep = ({ values, control }) => {
  const classes = useStyles();
  const { fields } = useFieldArray({
    control,
    name: 'roles',
  });

  const getColor = (value: number): string => {
    return +value < 45 ? 'primary.main' : +value >= 45 && +value <= 55 ? 'text.secondary' : 'background.paper';
  };

  const Template = ({ title, icon, description }, index: number) => {
    if (values.template !== null && values.template !== index) {
      return null;
    }
    return (
      <Controller
        name="template"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Card
              onClick={() => onChange(value === index ? null : index)}
              className={`sw-card ${value === index ? 'active' : ''}`}
              sx={{
                boxShadow: 3,
                height: 'calc(290px - 40px)',
                width: 'calc(240px - 70px)',
                mb: '20px',
                p: '15px 35px',
                border: '1px solid',
                borderColor: 'primary.main',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardHeader
                avatar={<Avatar component={icon} />}
                sx={{
                  px: 0,
                  '.MuiAvatar-root': {
                    backgroundColor: 'transparent',
                  },
                }}
                title={title}
                titleTypographyProps={{
                  variant: 'h3',
                  color: 'primary.main',
                  mt: '6px',
                }}
              />
              <CardContent
                sx={{
                  px: 0,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography color="primary.main" variant="body1" component="div">
                  {description}
                </Typography>

                <Divider
                  sx={{
                    borderColor: 'primary.main',
                  }}
                />
              </CardContent>
            </Card>
          );
        }}
      />
    );
  };

  return (
    <div className="sw-template-wrapper">
      <div
        className="sw-cards"
        style={{
          marginTop: '30px',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
          gridGap: '20px',
        }}
      >
        {IntegrationTemplates.map((t, index: number) => (
          <Fragment key={index}>{Template(t, index)}</Fragment>
        ))}
        {values.template !== null && (
          <>
            <Card
              className="sw-card-form"
              sx={{
                boxShadow: 0,
                height: 'calc(290px - 40px)',
                width: 'calc(240px - 15px)',
                mb: '20px',
                p: '15px 0 15px 15px',
                border: '1px solid',
                borderColor: 'text.primary',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="sw-role-fields">
                <Typography color="primary" sx={{ mb: '5px' }} component="div" variant="h3">
                  Name 2/3 Roles/Skills.
                </Typography>
                <Typography color="primary" sx={{ mb: '20px' }} component="div" variant="body2">
                  The Roles you envision in your community (i.e.: dev, validator, etc.)
                </Typography>
                {fields.map((item, index) => (
                  <Controller
                    key={`roles.${index}.roleName`}
                    name={`roles.${index}.roleName`}
                    control={control}
                    rules={{ min: 0 }}
                    render={({ field: { name, value, onChange } }) => {
                      return (
                        <TextField
                          placeholder={`Role/Skill ${index + 1}`}
                          autoFocus={index === 0}
                          required={index !== 2}
                          focused
                          id={name}
                          name={name}
                          value={value}
                          onChange={onChange}
                          InputProps={{ classes: { input: classes.input } }}
                        />
                      );
                    }}
                  />
                ))}
              </div>
            </Card>
            <Card
              className="sw-card-form"
              sx={{
                boxShadow: 0,
                height: 'calc(290px - 40px)',
                width: 'calc(240px - 15px)',
                mb: '20px',
                p: '15px 0 15px 15px',
                border: '1px solid',
                borderColor: 'text.primary',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="sw-role-fields">
                <Typography color="primary" sx={{ mb: '5px' }} component="div" variant="h3">
                  Nr. of Actions
                </Typography>
                <Typography color="primary" sx={{ mb: '20px' }} component="div" variant="body2">
                  How many initial Actions you expect. No worries, you can always add more later :)
                </Typography>
                <div className="num-of-actions">
                  <Controller
                    name="numOfActions"
                    control={control}
                    rules={{ min: 0 }}
                    render={({ field: { name, value, onChange } }) => {
                      return (
                        <div>
                          <div style={{ position: 'relative' }}>
                            <SwSlider variant="filled" name={name} value={value || 0} onChange={onChange} min={0} max={100} />
                            <Typography
                              sx={{
                                position: 'absolute',
                                transform: 'translate(-50%, -50%)',
                                left: '50%',
                                top: '50%',
                              }}
                              color={getColor(value)}
                              variant="body1"
                            >
                              {value}
                            </Typography>
                          </div>
                          <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography color="primary" variant="body1">
                              0
                            </Typography>
                            <Typography color="primary" variant="body1">
                              100
                            </Typography>
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
      <Box
        sx={{
          width: 'calc(240px * 3)',
          margin: '0 auto',
          border: '1px solid',
          height: '102px',
          p: '24px',
        }}
      >
        <Typography align="center" color="primary.main" variant="h3" component="div">
          Bootstrap your Community Economy
        </Typography>

        <div className="sw-contract-options">
          <Controller
            name="startFromScratch"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <SwButton
                  mode="light"
                  sx={{
                    fontSize: '16px',
                    height: '65px',
                    width: '255px',
                  }}
                  onClick={() => onChange(!value)}
                  className={value ? 'active-link' : ''}
                  endIcon={<PaperIcon />}
                  label="Start from Scratch"
                />
              );
            }}
          />

          <Controller
            name="importedContract"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <SwButton
                  mode="light"
                  sx={{
                    fontSize: '16px',
                    height: '65px',
                    width: '255px',
                  }}
                  disabled
                  onClick={() => onChange(!value)}
                  className={value ? 'active-link' : ''}
                  endIcon={<ContractIcon />}
                  label="Import your Contract"
                />
              );
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default TemplateStep;
