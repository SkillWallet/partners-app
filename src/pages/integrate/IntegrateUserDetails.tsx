/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable */
/* @ts-ignore */
import React, { useState } from 'react';
import { Form, Input } from 'formik-antd';
import { Formik, ErrorMessage, Field } from 'formik';
import { createPartnersAgreement } from '@partners-api/contracts';
import VerifyOwnershipModal from '@partners-components/VerifyOwnershipModal';
import { pushImage } from '@partners-api/textile.hub';
import paper from '@partners-assets/grey-paper.svg';
import importContract from '@partners-assets/import-contract.svg';
import logoBlack from '@partners-assets/sw-logo-black.svg';
import importLightContract from '@partners-assets/import-contract-white.svg';
import copyIcon from '@partners-assets/copy-icon.svg';
import lineBreak from '@partners-assets/geometric-card-line-break.png';
import openSource from '@partners-assets/opensource-defi-white.png';
import art from '@partners-assets/art-nft-white.png';
import local from '@partners-assets/local-dao-white.png';
import { Avatar, Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { SwLayout, SwSidebar, SwUploadFile } from 'sw-web-shared';
import './Integrate.scss';

const IntegrateUserDetails = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitButtonClass, setSubmitButtonClass] = useState('integrate-deploy deploy-disabled');
  const [isActiveIdImportContract, setIsActiveIdImportContract] = useState(null);
  const [isActiveIdStartFromScratch, setIsActiveIdStartFromScratch] = useState(null);
  const [isCommunityInactive, setIsCommunityInactive] = useState(true);
  const [partnersDetails, setPartnersDetails] = useState({} as any);
  const [contractAddress, setContractAddress] = useState(undefined);

  const selectedImg = () => {
    if (props.templateOptions.imageSrc === '@partners-assets/opensource-defi-white.png') {
      return 'openSource';
    }
    if (props.templateOptions.imageSrc === '@partners-assets/art-nft-white.png') {
      return 'art';
    }
    if (props.templateOptions.imageSrc === '@partners-assets/local-dao-white.png') {
      return 'local';
    }
  };

  const { TextArea } = Input;

  const MAX_UPLOAD_SIZE = 1024; // bytes
  const ALLOWED_FILE_TYPES = 'image.*';

  const userClickedUndo = () => {
    props.setTemplateOptions(null);
    props.setSelectedTemplate(null);
  };

  const toggleModal = (address) => {
    console.log('toggleModal');
    if (typeof address === 'string') setContractAddress(address);
    setIsActiveIdStartFromScratch(undefined);
    setIsActiveIdImportContract('activeContract');
    setShowModal(!showModal);
  };

  const uploadImage = (files) => {
    const reader = new FileReader();

    reader.onerror = (err) => {
      console.error('something went wrong...', err);
    };
    reader.readAsDataURL(files);
  };

  const checkFileSize = (size) => {
    return size / MAX_UPLOAD_SIZE / MAX_UPLOAD_SIZE <= MAX_UPLOAD_SIZE;
  };

  const checkFileType = (type) => {
    return type.match(ALLOWED_FILE_TYPES).length > 0;
  };

  const isFormValid = (errors) => {
    setSubmitButtonClass(Object.keys(errors).length === 0 && !isLoading ? 'integrate-deploy' : 'integrate-deploy deploy-disabled');
    return errors === {};
  };

  const onInputChange = async (imageFile) => {
    setIsLoading(true);
    if (!checkFileSize(imageFile.size)) {
      console.error(`Maximum file size exceeded. Max file size is: ${MAX_UPLOAD_SIZE}`);
      return false;
    }
    if (!checkFileType(imageFile.type)) {
      console.error('File type is not allowed');
      return false;
    }
    uploadImage(imageFile); // moved this call before the await, and setAvatarUrl after (deleted it from uploadImg), so we won't setAvatarUrl with a missing URL
    setIsLoading(false);
    const imageUrl = await pushImage(imageFile);
    window.sessionStorage.setItem('imageUrl', imageUrl);
    setAvatarUrl(imageUrl);
  };

  const onActivateCommunity = () => {
    const input = document.querySelector('skillwallet-auth');
    const event = new CustomEvent('activateSkillwalletCommunity', {
      detail: {
        communityAddr: partnersDetails.communityAddr,
        partnersAddr: partnersDetails.partnersAddr,
        partnerKey: key,
      },
    });
    input.dispatchEvent(event);
    setIsCommunityInactive(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          skillOne: '',
          skillTwo: '',
          skillThree: '',
          numberOfActions: 1,
          avatar: '',
          description: '',
          name: '',
        }}
        // validate={(values) => {
        //   const errors: any = {};

        //   if (!values.skillOne) {
        //     errors.skillOne = 'Required';
        //   }
        //   if (!values.skillTwo) {
        //     errors.skillTwo = 'Required';
        //   }
        //   // if (!values.skillThree) {
        //   //     errors.skillThree = "Required";
        //   // }

        //   if (values.name.length === 0) {
        //     errors.name = 'Please enter a community name.';
        //   } else if (values.name.match(/\S+/g).length > 3) {
        //     errors.name = 'Community name must be 3 words or less.';
        //   }

        //   if (values.description.length === 0) {
        //     errors.description = 'Please enter a community description.';
        //   } else if (values.description.length < 24) {
        //     errors.description = 'Description must be more than 24 characters.';
        //   } else if (values.description.length > 280) {
        //     errors.description = 'Description must be less than 280 characters.';
        //   }

        //   isFormValid(errors);
        //   return errors;
        // }}
        onSubmit={async (values) => {
          if (!values.numberOfActions) values.numberOfActions = 10;
          setIsLoading(true);
          setSubmitButtonClass('integrate-deploy deploy-disabled');

          const newPartnersDetails = await createPartnersAgreement(
            props.selectedTemplate,
            values.name,
            values.description,
            [values.skillOne, values.skillTwo, values.skillThree],
            values.numberOfActions,
            contractAddress
          );

          setIsLoading(false);
          setSubmitButtonClass('integrate-deploy');
          setKey(newPartnersDetails.key);
          setPartnersDetails(newPartnersDetails);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          /* @ts-ignore */
          <Form onSubmit={handleSubmit} className="user-details-screen">
            {isLoading ? (
              <div className="item">
                <h2>Loading</h2>

                <i className="loader two" />
              </div>
            ) : (
              <div />
            )}
            <SwLayout
              hideTop
              scrollbarStyles={{ height: '100%', width: '100%' }}
              drawer={
                <SwSidebar width="450px" sidebarTopIcon={null} open mode="close" preventClose>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}
                  >

                    <Typography sx={{ color: 'background.paper', my: 3 }} textAlign="center" component="div" variant="h2">
                      This is your <u>DAO.</u> Tell <u>members</u> all about it 🙌
                    </Typography>
                    {/* <Avatar variant="square" src={logoBlack} sx={{ height: '110px', width: 'auto' }} /> */}
                    {/* <div>
                        <div className="community-name-field">
                          <h4>Name</h4>
                          <TextArea id="name" name="name" type="text" placeholder="Show off with a great Community Name!" value={values.name} />
                          <ErrorMessage render={(msg) => <div className="error-msg">{msg}</div>} name="name" />
                        </div>

                        <p className="char-count">{values.name ? values.name.match(/\S+/g).length : 0} words</p>
                      </div>

                      <div className="avatar-field">
                        <div>
                          <h4>Avatar</h4>
                          <p>Your public Logo - that's how others will know it's really you</p>
                        </div>

                        {!avatarUrl ? (
                          <label htmlFor="file">
                            <div className="avatar-upload-div">
                              <img src="https://skillwallet-demo-images.s3.us-east-2.amazonaws.com/upload_avatar.svg" alt="line" />
                              <input
                                type="file"
                                name="files[]"
                                id="file"
                                accept="image/*"
                                onChange={(event) => onInputChange(event.target.files)}
                              />
                              <p>.svg , .png, or .jpg</p>
                            </div>
                          </label>
                        ) : (
                          <div className="avatar-div">
                            <img className="line-26" src={avatarUrl} alt="line" />
                          </div>
                        )}
                      </div> */}

                    <div className="sw-form-field">
                      <Typography sx={{ color: 'text.primary', mb: '4px' }} component="div" variant="h3">
                        Nickname
                      </Typography>
                      <Typography sx={{ color: 'text.primary', mb: '12px' }} component="div" variant="body2">
                        What would you like your community to call you?
                      </Typography>
                      <div className="sw-form-field-content">
                        <Field
                          validateOnChange
                          name="name"
                          render={({ field, form }) => (
                            <TextField
                              autoFocus
                              focused
                              name="name"
                              color="info"
                              placeholder="Required Field"
                              inputProps={{ maxLength: 20 }}
                              onChange={handleChange}
                              helperText={
                                <Typography sx={{ color: 'text.primary' }} align="right" component="span" variant="body2">
                                  Max characters {20 - (values?.name?.length || 0)}
                                </Typography>
                              }
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="sw-form-field">
                      <Typography sx={{ color: 'text.primary', mb: '4px' }} component="div" variant="h3">
                        Avatar
                      </Typography>
                      <Typography sx={{ color: 'text.primary', mb: '12px' }} component="div" variant="body2">
                        A public image - that's how others will see you.
                      </Typography>
                      <div className="sw-form-field-content sw-image-upload">
                        <div className="sw-field-upload" onClick={(e) => e.stopPropagation()}>
                          <div>
                            <SwUploadFile
                              initialPreviewUrl={avatarUrl}
                              fileChange={(file: File) => onInputChange(file)}
                              sx={{
                                width: '110px',
                                height: '110px',
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
                      <Typography sx={{ color: 'text.primary', mb: '4px' }} component="div" variant="h3">
                        Description
                      </Typography>
                      <Typography sx={{ color: 'text.primary', mb: '12px' }} component="div" variant="body2">
                        Introduce your community to the world. It can be your one-liner, its values, its goals, or even the story behind it!
                      </Typography>
                      <div className="sw-form-field-content">
                        <Field
                          validateOnChange
                          name="description"
                          render={({ field, form }) => (
                            <TextField
                              color="info"
                              multiline
                              name="description"
                              rows={4}
                              onChange={handleChange}
                              inputProps={{ maxLength: 280 }}
                              value={values.description}
                              helperText={
                                <Typography sx={{ color: 'text.primary' }} align="right" component="span" variant="body2">
                                  Max characters {280 - (values.description?.length || 0)}
                                </Typography>
                              }
                            />

                          )}
                        />

                      </div>
                    </div>
                  </Box>
                </SwSidebar>
              }
            >
              <div className="integrate-content">
                <div className="integrate-content-design">
                  <div className="integrate-header">
                    <h2 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Partner&#39;s Agreement</h2>
                    <h4>Select the template that best represents your project / protocol.</h4>
                  </div>

                  <div className="integrate-template-content">
                    <div className="top-row details-project-types">
                      <div className="template-card card-black details-screen-card" onClick={userClickedUndo}>
                        <div className="top-card">
                          <img
                            className="image-7"
                            src={selectedImg() === 'local' ? local : selectedImg() === 'art' ? art : openSource}
                            alt="card-logo"
                          />

                          <div className="raleway-bold-alto-22px title-black-card">{props.templateOptions.header}</div>
                        </div>

                        <div className="description-black-card raleway-normal-alto-18px">{props.templateOptions.description}</div>

                        <img className="line-26" src={lineBreak} alt="line" />
                      </div>

                      <div className="template-card card-white details-screen-card">
                        <h3>Name 2/3 Roles/Skills</h3>
                        <p>The Roles you envision in your community (i.e. dev, validator, etc.)</p>
                        <Input
                          id="role"
                          name="skillOne"
                          type="text"
                          onChange={handleChange}
                          placeholder="Role/Skill 1 *"
                          value={values.skillOne}
                        />
                        <ErrorMessage render={(msg) => <div className="error-msg">{msg}</div>} name="skillOne" />
                        <Input
                          id="role"
                          name="skillTwo"
                          type="text"
                          onChange={handleChange}
                          placeholder="Role/Skill 2 *"
                          value={values.skillTwo}
                        />
                        <ErrorMessage render={(msg) => <div className="error-msg">{msg}</div>} name="skillTwo" />
                        {/* @ts-ignore */}
                        <Input
                          id="role"
                          name="skillThree"
                          type="text"
                          onChange={handleChange}
                          placeholder="Role/Skill 3"
                          value={values.skillThree}
                        />
                        {/* <ErrorMessage render={msg => <div className="error-msg">{msg}</div>} name="skillThree" /> */}
                      </div>

                      <div className="template-card card-white details-screen-card">
                        <h3>Nr. of Actions</h3>

                        <ErrorMessage render={(msg) => <div className="error-msg">{msg}</div>} name="numberOfActions" />
                        <p>How many initial Actions you expect. No worries, you can always add more later :)</p>

                        <div className="auto-flex1">
                          <div className="bar-chart-first-container">
                            <input
                              className="bar-chart-container"
                              name="numberOfActions"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="range"
                              id="numberOfActions"
                              value={values.numberOfActions}
                              min="1"
                              max="100"
                            />
                            <div className="bar-chart-metrics">
                              <p>1</p>
                              <p>100</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bottom-row">
                      <div className="bootstrap-button">
                        <p>Bootstrap your Community Economy</p>
                      </div>

                      <div className="integrate-button-panel">
                        <button
                          type="button"
                          className="startFromScratch detailsScreen"
                          id={isActiveIdStartFromScratch}
                          disabled={contractAddress}
                          onClick={() => setIsActiveIdStartFromScratch('activeContract')}
                        >
                          <div>
                            <p>Start from Scratch</p>
                            <img src={paper} alt="white sheet of paper" />
                          </div>
                        </button>

                        <button onClick={toggleModal} className="importYourContract" id={isActiveIdImportContract} disabled type="button">
                          <div className="object-cover">
                            <p
                              style={
                                contractAddress
                                  ? {
                                    fontSize: 'x-small',
                                  }
                                  : undefined
                              }
                            >
                              {contractAddress ?? 'Import your Contract'}
                            </p>
                            {!contractAddress && (
                              <img src={isActiveIdImportContract ? importLightContract : importContract} alt="black sheet of paper" />
                            )}
                          </div>
                        </button>
                      </div>

                      <button
                        className={submitButtonClass}
                        id="integrate-deploy"
                        type="submit"
                      // disabled={isFormValid(errors) || isLoading}
                      // 'window' is undefined when I call Mumbai
                      >
                        Sign & Deploy 🚀
                      </button>
                    </div>

                    {key && isCommunityInactive ? (
                      <div id="topDiv">
                        <div id="modalWindow">
                          <div className="modal-window-child partner-key-content">
                            <div className="wallet-header">
                              <h2 style={{ textDecoration: 'underline' }}>Congrats, Partner!</h2>
                            </div>

                            <div className="verify-p">
                              <p>You've successfully integrated the SkillWallet.</p>
                              <p>As promised, here is your Access Key. Copy it & keep it safe:</p>
                            </div>
                            <div className="partner-key">
                              <h4>{key}</h4>
                              <img src={copyIcon} alt="two rectangles, on on top of the other" />
                            </div>

                            <div>
                              <p>Last but not least, activate Community Name by picking your SkillWallet Role:</p>
                            </div>

                            <button type="button" onClick={() => onActivateCommunity()}>
                              Activate!
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : undefined}
                  </div>
                </div>
              </div>
            </SwLayout>
          </Form>
        )}
      </Formik>
      {showModal ? <VerifyOwnershipModal key="verify" toggleModal={toggleModal} setShowModal={setShowModal} /> : null}
    </>
  );
};

export default IntegrateUserDetails;
