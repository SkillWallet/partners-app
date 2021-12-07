/* eslint-disable no-use-before-define */
import React, { useState, useMemo, useEffect } from "react";
import { Typography, TextField } from "@mui/material";
import debounce from "lodash.debounce";
import { ReactComponent as EditIcon } from "../../../../assets/actions/edit.svg";
import { SwButton } from "sw-web-shared";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./dao-integration.scss";

function AlertDialog({ handleClose, open }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        sx={{ maxWidth: "420px", minWidth: "420px", minHeight: "120px" }}
      >
        <DialogContentText
          sx={{
            textAlign: "center",
          }}
          id="alert-dialog-description"
        >
          <Typography
            variant="h1"
            textAlign="center"
            component="span"
            color="green"
          >
            Transaction was successful
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SwButton
          sx={{
            borderColor: "primary.main",
            width: "220px",
            height: "45px",
          }}
          onClick={handleClose}
          autoFocus
        >
          Dismiss
        </SwButton>
      </DialogActions>
    </Dialog>
  );
}

const asyncCall = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  }).then(() => data);
};

// @TODO: Milena to implement smart contract call
const createDaoIntegration = async (item) => {
  await asyncCall(item);
};

const DaoIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [daoUrl, setDaoUrl] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    setLoading(true);
    try {
      await createDaoIntegration();
      setOpen(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const debouncedChangeHandler = useMemo(() => {
    const changeHandler = (e) => {
      setDaoUrl(e.target.value);
    };
    return debounce(changeHandler, 10);
  }, []);

  useEffect(() => {
    return () => debouncedChangeHandler.cancel();
  }, [debouncedChangeHandler]);

  return (
    <>
      <AlertDialog handleClose={handleClose} open={open} />
      <div className="sw-data-integration">
        <Typography sx={{ my: 2 }} component="div" variant="h1">
          Your SkillWallet Auth
        </Typography>
        <Typography sx={{ mt: 2 }} component="div" variant="h3">
          This is where your DAO lives. Add the URL where you’ll be integrating
        </Typography>
        <Typography sx={{ mb: 2 }} component="div" variant="h3">
          SkillWallet’s Decentralized Authentication System using your Partner
          Key.
        </Typography>

        <div className="sw-dao-form">
          <div className="sw-dao-url">
            <Typography component="div" variant="h3">
              Your URL
            </Typography>
            <TextField
              autoFocus
              focused
              color="primary"
              placeholder="https://letsDAO.it"
              sx={{
                width: "260px",
                ".MuiInputBase-root": {
                  color: "primary.main",
                },
              }}
              defaultValue={daoUrl}
              inputProps={{
                color: "primary.main",
                sx: {
                  height: "33px",
                  maxHeight: "33px",
                  paddingTop: "0px !important",
                  paddingBottom: "0px",
                },
              }}
              onChange={debouncedChangeHandler}
            />
          </div>
          <SwButton
            color="primary"
            disabled={!daoUrl?.length || loading}
            onClick={submit}
            endIcon={<EditIcon className="sw-btn-icon" />}
            sx={{
              borderColor: "primary.main",
              height: "70px",
              maxWidth: "280px",
            }}
          >
            Confirm & Sign
          </SwButton>
        </div>
      </div>
    </>
  );
};

export default DaoIntegration;
