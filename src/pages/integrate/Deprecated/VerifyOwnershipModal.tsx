/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

const VerifyOwnershipModal = (props) => {
  const closeQR = (submitted) => {
    if (submitted) {
      const address = (document.getElementById('address') as any).value;
      console.log(address);
      window.sessionStorage.setItem('contractAddress', address);
      props.toggleModal(address);
    } else {
      props.setShowModal(false);
    }
  };

  const handleClickPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div id="topDiv" onClick={() => closeQR(false)}>
      <div id="modalWindow" className="verify-ownership-modal" onClick={(e) => handleClickPropagation(e)}>
        <div className="modal-window-child">
          <div className="wallet-header">
            <h2 style={{ textDecoration: 'underline' }}>Verify Ownership</h2>
          </div>

          <div className="wallet-modal-content">
            <p>Add the address of your Contract</p>

            <form id="addressForm" name="address" onSubmit={() => closeQR(true)}>
              <input placeholder="0x..." id="address" />

              <p>
                Please note that you need to sign with the <span className="heavy">same wallet</span> you used to deploy.
              </p>

              <button type="submit" onClick={closeQR}>
                Save Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOwnershipModal;
