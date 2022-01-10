import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SwButton } from 'sw-web-shared';
import { ReactComponent as ContractIcon } from '@assets/import-contract.svg';
import { ReactComponent as PaperIcon } from '@assets/paper.svg';
import { ReactComponent as OpenSourceIcon } from '@assets/open-source.svg';
import { ReactComponent as LocalProjectIcon } from '@assets/local-project.svg';
import { ReactComponent as ArtNftIcon } from '@assets/art-nft.svg';

import { RootState } from '@store/store.model';
import { Avatar, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { integrateSelecteTemplate, integrateSetCurrentStep, integrateUpdateStartFromScratch } from '@store/Integrate/integrate';
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

const TemplateStep = () => {
  const dispatch = useDispatch();
  const { activeStep } = useSelector((state: RootState) => state.integrate.currentStep);
  const { selectedTemplate, startFromScratch } = useSelector((state: RootState) => state.integrate);

  useEffect(() => {
    if (activeStep !== 0) {
      dispatch(
        integrateSetCurrentStep({
          activeStep: 0,
          title: 'Step 1',
          description: 'Select the template that best represents your project / protocol.',
          toPrevBtnPath: null,
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <>
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
          {IntegrationTemplates.map(({ title, icon, description }, index: number) => (
            <div key={index}>
              <Card
                onClick={() => dispatch(integrateSelecteTemplate(index))}
                className={`sw-card ${selectedTemplate === index ? 'active' : ''}`}
                sx={{
                  boxShadow: 3,
                  height: '240px',
                  width: '260px',
                  mb: '20px',
                  p: '15px 34px',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardHeader
                  avatar={<Avatar component={icon} />}
                  sx={{
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
            </div>
          ))}
        </div>
        <Typography align="center" sx={{ mt: 4 }} color="primary.main" variant="h3" component="div">
          Bootstrap your Community Economy
        </Typography>

        <div className="sw-contract-options">
          <SwButton
            mode="light"
            sx={{
              height: '55px',
              width: '310px',
            }}
            onClick={() => dispatch(integrateUpdateStartFromScratch(true))}
            className={startFromScratch ? 'active-link' : ''}
            startIcon={<PaperIcon />}
            label="Start from Scratch"
          />
          <SwButton
            mode="light"
            sx={{
              height: '55px',
              width: '310px',
            }}
            disabled
            onClick={() => dispatch(integrateUpdateStartFromScratch(false))}
            className={!startFromScratch ? 'active-link' : ''}
            startIcon={<ContractIcon />}
            label="Import your Contract"
          />
        </div>

        <div className="bottom-action">
          <SwButton disabled={selectedTemplate === null} mode="light" component={Link} to="/integrate/roles" label="Next: Assign Roles" />
        </div>
      </div>
    </>
  );
};

export default TemplateStep;
