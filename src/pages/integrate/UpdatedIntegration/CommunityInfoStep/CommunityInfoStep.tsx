import { TextField, Typography } from '@mui/material';
import { RootState, useAppDispatch } from '@store/store.model';
import { useDispatch, useSelector } from 'react-redux';
import { SwButton, SwUploadFile, toBase64 } from 'sw-web-shared';
import { useEffect, useState } from 'react';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';
import ErrorDialog from '@components/ErrorPopup';
import { Field } from 'react-final-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SwForm from '@components/form-components/SwForm';
import {
  getRoles,
  integrateCommunityInfo,
  integratePartnerAgreement,
  integrateSetCurrentStep,
  integrateUpdateStatus,
} from '@store/Integrate/integrate';
import { CommunityIntegration } from '@api/api.model';
import ActivateCommunityDialog from './ActivateCommunityDialog';
import { IntegrationTemplates } from '../TemplateStep/TemplateStep';
import './CommunityInfoStep.scss';

const CommunityInfoStep = () => {
  const dispatch = useAppDispatch();
  const {
    currentStep: { activeStep },
    status,
    numOfActions,
    selectedTemplate,
    communityInfo,
    agreement,
  } = useSelector((state: RootState) => state.integrate);
  const allRoles = useSelector(getRoles);
  const [agreementPromise, setAgreementPromise] = useState<any>();

  const changeHandler = async ({ values }) => {
    if (JSON.stringify(values) === JSON.stringify(communityInfo)) {
      return;
    }
    const info: any = {};
    if (values?.avatar && typeof values?.avatar !== 'string') {
      const base64 = await toBase64(values?.avatar);
      info.avatar = base64;
    } else {
      info.avatar = values?.avatar;
    }
    info.description = values.description;
    info.name = values.name;
    dispatch(integrateCommunityInfo(info));
  };

  const handleDialogClose = () => {
    agreementPromise?.abort();
    dispatch(integrateUpdateStatus(ResultState.Idle));
  };

  const onActivateCommunity = () => {
    handleDialogClose();
    const input = document.querySelector('skillwallet-auth');
    const { communityAddr, partnersAddr, key } = agreement;
    const event = new CustomEvent('activateSkillwalletCommunity', {
      detail: {
        communityAddr,
        partnersAddr,
        partnerKey: key,
      },
    });
    input.dispatchEvent(event);
  };

  const createAgreement = () => {
    const metadata: CommunityIntegration = {
      title: communityInfo.name,
      description: communityInfo.description,
      image: communityInfo.avatar,
      properties: {
        template: IntegrationTemplates[selectedTemplate].title,
      },
      skills: {
        roles: allRoles,
      },
    };

    const result = dispatch(
      integratePartnerAgreement({
        metadata,
        numOfActions,
        contractAddress: null,
        selectedTemplate,
      })
    );
    setAgreementPromise(result);
  };

  useEffect(() => {
    if (activeStep !== 2) {
      dispatch(
        integrateSetCurrentStep({
          activeStep: 2,
          title: 'Step 3 - Tell us about your community',
          description: 'This is your DAO. Tell members all about it 🙌',
          toPrevBtnPath: '/integrate/roles',
          left: null,
        })
      );
    }
  }, [dispatch, activeStep]);

  return (
    <div className="sw-description-wrapper">
      <ActivateCommunityDialog
        agreementKey={agreement?.key}
        onActivateCommunity={onActivateCommunity}
        handleClose={handleDialogClose}
        open={status === ResultState.Success}
      />
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message="Something went wrong" />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Updating} message="Signing agreement..." />
      <SwForm changeHandler={changeHandler} initialValues={communityInfo}>
        {() => {
          return (
            <>
              <div className="sw-form-field">
                <Typography sx={{ mb: '4px' }} component="div" variant="h3">
                  Name
                </Typography>
                <Typography sx={{ mb: '12px' }} component="div" variant="body2">
                  Show off with a great Community Name!
                </Typography>
                <div className="sw-form-field-content">
                  <Field
                    name="name"
                    render={(props) => {
                      return (
                        <TextField
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          autoFocus
                          required
                          focused
                          error={props.meta.touched && props.meta.pristine && !props.input.value}
                          color="primary"
                          placeholder="Required Field"
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="sw-form-field">
                <Typography sx={{ mb: '4px' }} component="div" variant="h3">
                  Avatar
                </Typography>
                <Typography sx={{ mb: '12px' }} component="div" variant="body2">
                  Your public Logo - that’s how others will know it’s really you.
                </Typography>
                <div className="sw-form-field-content sw-image-upload">
                  <div className="sw-field-upload">
                    <div>
                      <Field
                        name="avatar"
                        render={(props) => {
                          return (
                            <SwUploadFile
                              mode="dark"
                              name={props.input.name}
                              initialPreviewUrl={props.input.value}
                              fileChange={props.input.onChange}
                              defaulUploadIcon={<CloudUploadIcon style={{ fontSize: 90, fill: 'white' }} />}
                              sx={{
                                width: '110px',
                                height: '110px',
                              }}
                            />
                          );
                        }}
                      />
                      <Typography sx={{ color: 'text.primary' }} align="right" component="div" variant="body2">
                        .png or .jpg
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sw-form-field">
                <Typography sx={{ mb: '4px' }} component="div" variant="h3">
                  Description
                </Typography>
                <Typography sx={{ mb: '12px' }} component="div" variant="body2">
                  Introduce your community to the world. It can be a one-liner, common values, goals, or even the story behind it!
                </Typography>
                <div className="sw-form-field-content">
                  <Field
                    name="description"
                    render={(props) => {
                      return (
                        <TextField
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          multiline
                          rows={4}
                          required
                          focused
                          error={props.meta.touched && props.meta.pristine && !props.input.value}
                          color="primary"
                          placeholder="Required Field"
                          inputProps={{ maxLength: 280 }}
                          helperText={
                            <Typography color="primary" align="right" component="span" variant="body2">
                              Max characters {280 - (props.input.value?.length || 0)}
                            </Typography>
                          }
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="bottom-action">
                <SwButton
                  type="button"
                  mode="light"
                  disabled={!communityInfo?.description || !communityInfo?.avatar || !communityInfo?.name}
                  onClick={createAgreement}
                  label="Sign & Deploy"
                />
              </div>
            </>
          );
        }}
      </SwForm>
    </div>
  );
};

export default CommunityInfoStep;
