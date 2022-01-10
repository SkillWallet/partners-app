/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable no-alert */

import { useEffect, useState } from 'react';
import { environment, EnvMode } from '@api/environment';
import IntegrateUserDetails from './IntegrateUserDetails';
import ValidatePAAccessKeyDialog from '../UpdatedIntegration/ValidatePAAccessKeyDialog';
import IntegrateWelcomeScreen from './IntegrateWelcomeScreen';
import './Integrate.css';

const Integrate = (props) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateOptions, setTemplateOptions] = useState(null);
  const [isActivateKeyOpen, setIsActivateKeyOpen] = useState(true);

  const handleDialogClose = () => {
    props.history.push('/');
  };

  const handleActivation = (key: string) => {
    setIsActivateKeyOpen(false);
  };

  useEffect(() => {
    const openSource = {
      imageSrc: './assets/opensource-defi-white.png',
      header: 'Open-Source & DeFi',
      description:
        'For researchers & web3, open-source teams, that innovate in a liberal fashion - for a more sustainable, meritocratic world.',
    };
    const art = {
      imageSrc: './assets/art-nft-white.png',
      header: 'Art, Events & NFTs',
      description: 'Art movements, writers & creatives of all kind who use Art & provable ownership for purer forms of human interaction.',
    };
    const local = {
      imageSrc: './assets/local-dao-white.png',
      header: 'Local Projects & DAOs',
      description: 'From support for people in need, to innovative local hubs to get together & create something greater than oneself.',
    };

    if (selectedTemplate === 0) {
      setTemplateOptions(openSource);
      window.sessionStorage.setItem('header', 'Open-Source & DeFi');
      // window.sessionStorage.setItem('imageUrl', 'https://hub.textile.io/ipfs/bafkreiaks3kjggtxqaj3ixk6ce2difaxj5r6lbemx5kcqdkdtub5vwv5mi');
    } else if (selectedTemplate === 1) {
      setTemplateOptions(art);
      window.sessionStorage.setItem('header', 'Art, Events & NFTs');
      // window.sessionStorage.setItem('imageUrl', 'https://hub.textile.io/ipfs/bafkreigxry2ojoqmfs5wo5ijyzkdsmsyb7yfcjokiegkkhokca2wiltsdu');
    } else if (selectedTemplate === 2) {
      setTemplateOptions(local);
      window.sessionStorage.setItem('header', 'Local Projects & DAOs');
      // window.sessionStorage.setItem('imageUrl', 'https://hub.textile.io/ipfs/bafkreibaxbmskevzm6wk7gzmuahvzjghmal2lanlbjabnzn7i5posmehem');
    } else if (selectedTemplate !== null) {
      alert('Please select a valid template.');
      setTemplateOptions(null);
    }
  }, [selectedTemplate]);

  return (
    <main
      className="integrate-main"
      style={{
        backgroundColor: 'white',
      }}
    >
      <div className="connect-wallet-container hidden-wallet">
        {/* @ts-ignore */}
        <skillwallet-auth id="walletButton" className="connect-wallet" />
      </div>
      {isActivateKeyOpen && environment.env === EnvMode.Production ? (
        <ValidatePAAccessKeyDialog handleActivation={handleActivation} handleClose={handleDialogClose} open={isActivateKeyOpen} />
      ) : templateOptions === null ? (
        <IntegrateWelcomeScreen setSelectedTemplate={setSelectedTemplate} />
      ) : (
        <IntegrateUserDetails
          selectedTemplate={selectedTemplate}
          templateOptions={templateOptions}
          setTemplateOptions={setTemplateOptions}
          setSelectedTemplate={setSelectedTemplate}
        />
      )}
    </main>
  );
};

export default Integrate;
