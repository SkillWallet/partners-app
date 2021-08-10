import './App.css';
import './Integrate.css';
import { useEffect, useState } from 'react';
import IntegrateUserDetails from './IntegrateUserDetails';
import IntegrateWelcomeScreen from './IntegrateWelcomeScreen';
import {openSourceImg, artImage, localImage } from './images';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateOptions, setTemplateOptions] = useState(null);
  const [userUnselectedTemplate, setUserUnselectedTemplate] = useState(false);

  useEffect(() => {
      const openSource = {
          imageSrc: '/opensource-defi-white.png',
          header: 'Open-Source & DeFi',
          description: 'For researchers & web3, open-source teams, that innovate in a liberal fashion - for a more sustainable, meritocratic world.'
      }
      const art = {
          imageSrc: '/art-nft-white.png',
          header: 'Art, Events & NFTs',
          description: 'Art movements, writers & creatives of all kind who use Art & provable ownership for purer forms of human interaction.'
      }
      const local = {
          imageSrc: '/local-dao-white.png',
          header: 'Local Projects & DAOs',
          description: 'From support for people in need, to innovative local hubs to get together & create something greater than oneself.'
      }

      setUserUnselectedTemplate(false);

      if (selectedTemplate === 0) {
          setTemplateOptions(openSource);
          localStorage.setItem('header', 'Open-Source & DeFi');
          localStorage.setItem('imageUrl', 'https://hub.textile.io/ipfs/bafkreiaks3kjggtxqaj3ixk6ce2difaxj5r6lbemx5kcqdkdtub5vwv5mi');
      } else if (selectedTemplate === 1) {
          setTemplateOptions(art);
          localStorage.setItem('header', 'Art, Events & NFTs');
          localStorage.setItem('imageUrl', 'https://hub.textile.io/ipfs/bafkreigxry2ojoqmfs5wo5ijyzkdsmsyb7yfcjokiegkkhokca2wiltsdu');
      } else if (selectedTemplate === 2) {
          setTemplateOptions(local);
          localStorage.setItem('header', 'Local Projects & DAOs');
          localStorage.setItem('imageUrl', 'https://hub.textile.io/ipfs/bafkreibaxbmskevzm6wk7gzmuahvzjghmal2lanlbjabnzn7i5posmehem');
      }

  }, [selectedTemplate]);
  return (
    <div className="App">
        <div className="container">
            <main className="integrate-main">
                {templateOptions === null || userUnselectedTemplate ?
                    <IntegrateWelcomeScreen 
                        setSelectedTemplate={setSelectedTemplate}/> :

                    <IntegrateUserDetails 
                        selectedTemplate={selectedTemplate}
                        templateOptions={templateOptions}
                        undoTemplateOption={setUserUnselectedTemplate}/> 
                }
            </main>
        </div>
    </div>
  );
}

export default App;
