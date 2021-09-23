import React, { useState } from "react";
import { Form, Input } from "formik-antd";
import { Formik, ErrorMessage } from "formik";
import VerifyOwnershipModal from "./VerifyOwnershipModal";
import { createPartnersAgreement } from './contracts/contracts';
import { pushImage } from './api/textile.hub';
// import paper from './assets/paper.svg';
import paper from './assets/grey-paper.svg';
import importContract from './assets/import-contract.svg';
import logoBlack from './assets/sw-logo-black.svg';
import importLightContract from './assets/import-contract-white.svg';
import copyIcon from './assets/copy-icon.svg';
import lineBreak from './assets/geometric-card-line-break.png';
import openSource from './assets/opensource-defi-white.png';
import art from './assets/art-nft-white.png';
import local from './assets/local-dao-white.png';

const IntegrateUserDetails = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [key, setKey] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [submitButtonClass, setSubmitButtonClass] = useState('integrate-deploy deploy-disabled');
    const [isActiveId, setIsActiveId] = useState(null);
    const [isCommunityInactive, setIsCommunityInactive] = useState(true);
    const [partnersDetails, setPartnersDetails] = useState({});

    const selectedImg = () => {
        if (props.templateOptions.imageSrc === './assets/opensource-defi-white.png') {
            return 'openSource';
        } else if (props.templateOptions.imageSrc === './assets/art-nft-white.png') {
            return 'art';
        } else if (props.templateOptions.imageSrc === './assets/local-dao-white.png') {
            return 'local';
        }
    }

    const { TextArea } = Input;

    const MAX_UPLOAD_SIZE = 1024; // bytes
    const ALLOWED_FILE_TYPES = 'image.*';

    const userClickedUndo = () => {
        props.setTemplateOptions(null);
        props.setSelectedTemplate(null);
    };

    const toggleModal = (address) => {
        localStorage.setItem('contractAddress', address);
        setShowModal(!showModal)
    };

    const onInputChange = async (files) => {
        setIsLoading(true);
        if (files.length === 1) {
            const imageFile = files[0];
            if (!checkFileSize(imageFile.size)) {
                console.error('Maximum file size exceeded. Max file size is: ' + MAX_UPLOAD_SIZE);
                return false;
            }
            else if (!checkFileType(imageFile.type)) {
                console.error('File type is not allowed');
                return false;
            }
            uploadImage(imageFile);    // moved this call before the await, and setAvatarUrl after (deleted it from uploadImg), so we won't setAvatarUrl with a missing URL
            setIsLoading(false);
            const imageUrl = await pushImage(imageFile);
            localStorage.setItem('imageUrl', imageUrl);
            setAvatarUrl(imageUrl);

            // uploadImage(imageFile);
        } else {
            console.error(files.length === 0 ? 'No image uploaded' : 'You can oonly upload one image at a time');
            return false;
        }
    }

    const uploadImage = (files) => {
        const reader = new FileReader();

        reader.onerror = (err) => {
            console.error('something went wrong...', err);
        };
        reader.readAsDataURL(files);
    }

    const checkFileSize = (size) => {
        return (size / MAX_UPLOAD_SIZE / MAX_UPLOAD_SIZE) <= MAX_UPLOAD_SIZE;
    }

    const checkFileType = (type) => {
        return type.match(ALLOWED_FILE_TYPES).length > 0;
    }

    const isFormValid = (errors) => {
        setSubmitButtonClass(Object.keys(errors).length === 0 && !isLoading ? 'integrate-deploy' : 'integrate-deploy deploy-disabled')
        return errors === {};
    }

    const highlightInput = () => {
        setIsActiveId('activeContract');
    }

    const onActivateCommunity = () => {
        const input = document.querySelector("skillwallet-auth")
        const event = new CustomEvent("activateSkillwalletCommunity", {
            'detail': {
                communityAddr: partnersDetails.communityAddr,
                partnersAddr: partnersDetails.partnersAddr
            }
        })
        input.dispatchEvent(event)
        setIsCommunityInactive(false);
    }

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
                    name: ''
                }}

                validate={(values) => {
                    const errors = {};

                    if (!values.skillOne) {
                        errors.skillOne = "Required";
                    }
                    if (!values.skillTwo) {
                        errors.skillTwo = "Required";
                    }
                    // if (!values.skillThree) {
                    //     errors.skillThree = "Required";
                    // } 

                    if (values.name.length === 0) {
                        errors.name = "Please enter a community name."
                    } else if (values.name.match(/\S+/g).length > 3) {
                        errors.name = 'Community name must be 3 words or less.'
                    }

                    if (values.description.length === 0) {
                        errors.description = "Please enter a community description."
                    } else if (values.description.length < 24) {
                        errors.description = "Description must be more than 24 characters."
                    } else if (values.description.length > 280) {
                        errors.description = "Description must be less than 280 characters."
                    }

                    if (values.numberOfActions < 1 || values.numberOfActions > 100) {
                        errors.numberOfActions = "Number of actions must be more than 10 and less than 100."
                    }

                    if (values.name && localStorage.getItem('imageUrl') && values.description && values.skillOne && values.skillTwo) {
                        highlightInput();
                    }
                    isFormValid(errors);
                    return errors;
                }}

                onSubmit={async (values) => {
                    if (!values.numberOfActions)
                        values.numberOfActions = 10;
                    setIsLoading(true);
                    setSubmitButtonClass('integrate-deploy deploy-disabled');

                    const partnersDetails = await createPartnersAgreement(
                        props.selectedTemplate,
                        values.name,
                        values.description,
                        [values.skillOne, values.skillTwo, values.skillThree],
                        values.numberOfActions
                    );

                    setIsLoading(false);
                    setSubmitButtonClass('integrate-deploy');
                    setKey(partnersDetails.key);
                    setPartnersDetails(partnersDetails);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (

                    <Form onSubmit={handleSubmit} className="user-details-screen">
                        {isLoading ?
                            <div className="item">
                                <h2>Loading</h2>

                                <i className="loader two"></i>
                            </div> : <div></div>}
                        <div className="integrate-user-sidebar">
                            <div className="integrate-sidebar-design">

                                <h2>This is your <u>DAO.</u> Tell <u>members</u> all about it 🙌</h2>

                                {/* <img src={logo} className="logo-img" alt="skillwallet logo"></img> */}
                                <img src={logoBlack} className="new-logo-img" alt="skillwallet logo"></img>

                                <div className="user-details-fields">

                                    <div>
                                        <div className="community-name-field">
                                            <h4>Name</h4>
                                            <TextArea
                                                id="name"
                                                name="name"
                                                type="text"
                                                // onChange={handleChange}
                                                placeholder="Show off with a great Community Name!"
                                                value={values.name}
                                            ></TextArea>
                                            <ErrorMessage render={msg => <div className="error-msg">{msg}</div>} name="name" />
                                        </div>

                                        <p className="char-count">{values.name ? values.name.match(/\S+/g).length : 0} words</p>
                                    </div>


                                    <div className="avatar-field">
                                        <div>
                                            <h4>Avatar</h4>
                                            <p>Your public Logo - that's how others will know it's really you</p>
                                        </div>

                                        {!avatarUrl ? <label htmlFor="file" >
                                            <div className="avatar-upload-div">
                                                <img src="https://skillwallet-demo-images.s3.us-east-2.amazonaws.com/upload_avatar.svg" alt="line" />
                                                <input type="file" name="files[]" id="file" accept="image/*" onChange={(event) => onInputChange(event.target.files)}></input>
                                                <p>.svg , .png, or .jpg</p>
                                            </div>
                                        </label> :
                                            <div className="avatar-div">
                                                <img className="line-26" src={avatarUrl} alt="line" />
                                            </div>
                                        }
                                    </div>

                                    <div>
                                        <div>
                                            <h4>Description</h4>
                                            <TextArea
                                                id="description"
                                                name="description"
                                                type="text"
                                                // onChange={handleChange}
                                                placeholder="Introduce your community to the world. It can be your one-liner, its values, its goals, or even the story behind it!"
                                                value={values.description}
                                            ></TextArea>
                                            <ErrorMessage render={msg => <div className="error-msg">{msg}</div>} name="description" />
                                        </div>
                                        <p className="char-count">(maximum 280 characters)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="integrate-content">
                            <div className="integrate-content-design">
                                <div className="integrate-header">
                                    <h2 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Partner&#39;s Agreement</h2>
                                    <h4>Select the template that best represents your project / protocol.</h4>
                                </div>


                            <div className="integrate-template-content">
                                <div className="top-row details-project-types">
                                    <div className='template-card card-black details-screen-card'
                                        onClick={userClickedUndo}>
                                        <div className="top-card">
                                            <img className="image-7" src={selectedImg() === 'local' ? local : selectedImg() === 'art' ? art : openSource} alt="card-logo" />

                                                <div className="raleway-bold-alto-22px title-black-card">
                                                    {props.templateOptions.header}
                                                </div>
                                            </div>

                                            <div className="description-black-card raleway-normal-alto-18px">
                                                {props.templateOptions.description}
                                            </div>

                                            <img className="line-26" src={lineBreak} alt="line" />
                                        </div>

                                    <div className='template-card card-white details-screen-card'>
                                        <h3>Name 2/3 Roles/Skills</h3>
                                        <p>The Roles you envision in your community (i.e. dev, validator, etc.)</p>
                                        <Input
                                            id="role"
                                            name="skillOne"
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="Role/Skill 1 *"
                                            value={values.skillOne}
                                            style={{ text: 'white' }}
                                            />
                                            <ErrorMessage render={msg => <div className="error-msg">{msg}</div>} name="skillOne" />
                                            <Input
                                                id="role"
                                                name="skillTwo"
                                                type="text"
                                                onChange={handleChange}
                                                placeholder="Role/Skill 2 *"
                                                value={values.skillTwo}
                                                style={{ text: 'white' }}
                                            />
                                            <ErrorMessage render={msg => <div className="error-msg">{msg}</div>} name="skillTwo" />
                                            <Input
                                                id="role"
                                                name="skillThree"
                                                type="text"
                                                onChange={handleChange}
                                                placeholder="Role/Skill 3"
                                                value={values.skillThree}
                                                style={{ text: 'white' }}
                                            />
                                            {/* <ErrorMessage render={msg => <div className="error-msg">{msg}</div>} name="skillThree" /> */}
                                        </div>

                                    <div className='template-card card-white details-screen-card'>
                                        <h3>Nr. of Actions</h3>                                        

                                        <ErrorMessage render={msg => <div className="error-msg">{msg}</div>} name="numberOfActions" />
                                        <p>How many initial Actions you expect. No worries, you can always add more later :)</p>

                                            <div className="auto-flex1">
                                            
                                                <div className="bar-chart-first-container">
                                                    <input className="bar-chart-container" name="numberOfActions" onBlur={handleBlur}
                                                        onChange={handleChange} type="range" id="numberOfActions" value={values.numberOfActions}
                                                        min="1" max="100"></input>
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
                                            <button type="button" className="disabled">
                                                <div>
                                                    <p>Start from Scratch</p>
                                                    <img src={paper} alt="white sheet of paper" />
                                                </div>
                                            </button>

                                            <button onClick={toggleModal} className="importYourContract" id={isActiveId} type='button'>
                                                <div>
                                                    <p>Import your Contract</p>
                                                    <img src={isActiveId ? importLightContract : importContract} alt="black sheet of paper" />
                                                </div>
                                            </button>
                                        </div>

                                        <button className={submitButtonClass} id="integrate-deploy" type="submit" disabled={isFormValid(errors) || isLoading}
                                        // 'window' is undefined when I call Mumbai
                                        >
                                            Sign & Deploy 🚀
                                        </button>

                                    </div>

                                    {key && isCommunityInactive ?
                                        <div id="topDiv">
                                            <div id="modalWindow">
                                                <div className="modal-window-child partner-key-content">
                                                    <div className="wallet-header">
                                                        <h2 style={{ textDecoration: "underline" }}>Congrats, Partner!</h2>
                                                    </div>

                                                    <div className="verify-p">
                                                        <p>You've successfully integrated the SkillWallet.</p>
                                                        <p>As promised, here is your Access Key. Copy it & keep it safe:</p>
                                                    </div>
                                                    <div className="partner-key">
                                                        <h4>{key}</h4>
                                                        <img src={copyIcon} />
                                                    </div>

                                                    <div>
                                                        <p>Last but not least, activate Community Name by picking your SkillWallet Role:</p>
                                                    </div>

                                                    <button type="button" onClick={() => onActivateCommunity()}>Activate!</button>
                                                </div>
                                            </div>
                                        </div> : undefined}
                                </div>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>
            {showModal ? <VerifyOwnershipModal key={'verify'} toggleModal={toggleModal} setShowModal={setShowModal} /> : null}
        </>
    )
}

export default IntegrateUserDetails;