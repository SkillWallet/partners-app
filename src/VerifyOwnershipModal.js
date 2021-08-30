import React from 'react';
// import { generateNonce } from '../api/users'

const VerifyOwnershipModal = (props) => {
    // const [nonce, setNonce] = useState();

    const closeQR = () => {
        const address = document.getElementById('address').value;
        console.log(address);
        props.toggleModal(address);
    }

    // useEffect(() => {
    //     const getNonce = async () => {
    //         const nonce = await generateNonce(1, -1);
    //         setNonce(nonce);
    //     }
    //     getNonce();
    // }, [])

    return (
        <div id="topDiv">
            <div id="modalWindow" className="verify-ownership-modal">
                <div className="modal-window-child">
                    <div className="wallet-header">
                        <h2 style={{textDecoration: "underline"}}>Verify Ownership</h2>
                    </div>

                    <div className="wallet-modal-content">
                        <p>Add the address of your Contract</p>

                        <form type="text" id="addressForm" name="address"
                         onSubmit={closeQR}
                         >
                            <input placeholder="0x..." id="address"></input>

                        <p>Please note that you need to sign with the <span className="heavy">same wallet</span> you used to deploy.</p>

                        <button type="submit" onClick={closeQR}>Save Address</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default VerifyOwnershipModal;