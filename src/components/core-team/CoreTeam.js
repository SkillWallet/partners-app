import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ReactComponent as EditIcon } from "../../assets/actions/edit.svg";
import { ReactComponent as CancelIcon } from "../../assets/actions/cancel.svg";
import { ReactComponent as SaveIcon } from "../../assets/actions/confirm.svg";
import { ReactComponent as LockIcon } from "../../assets/actions/lock.svg";
import { ReactComponent as PinIcon } from "../../assets/pin.svg";
import { ReactComponent as ShareIcon } from "../../assets/share.svg";
import "./core-team.scss";
import SWDatatable from "../datatable/Datatable";
import { SwButton, SwShare } from "sw-web-shared";
import { useDatatableApiRef } from "../datatable/DatatableRef";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography } from "@mui/material";
import SwEditToolbar from "../datatable/DatatableToolbar";
import {
  GetDatatableItems,
  LockDatatableItems,
} from "../datatable/DatatableHelpers";

function AlertDialog({ handleClose, open }) {
  return (
    <Dialog sx={{ minHeight: 400 }} open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h2" component="span" color="red">
            No new members were added to whitelist!
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

const tableColumns = (getRef) => {
  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    const apiRef = getRef();
    apiRef.current.setRowMode(id, "edit");
  };

  const handleSaveClick = (id) => (event) => {
    const apiRef = getRef();
    event.stopPropagation();
    apiRef.current.commitRowChange(id);
    apiRef.current.setRowMode(id, "view");

    const row = apiRef.current.getRow(id);
    apiRef.current.updateRows([{ ...row, isNew: false }]);
  };

  const handleDeleteClick = (id) => (event) => {
    const apiRef = getRef();
    event.stopPropagation();

    apiRef.current.setRowMode(id, "view");
    apiRef.current.updateRows([{ id, _action: "delete" }]);
  };

  return [
    {
      headerName: "#",
      field: "id",
      width: 140,
      sortable: false,
      valueGetter: ({ id }) => `${id + 1}.`,
    },
    {
      headerName: "Name / Note",
      field: "name",
      editable: true,
      flex: 1,
      sortable: false,
      valueGetter: ({ id, row: { name } }) => {
        if (!name) {
          return `New member ${id + 1}`;
        }
        return name;
      },
    },
    {
      headerName: "Address",
      field: "address",
      editable: true,
      flex: 1,
      sortable: false,
      valueGetter: ({ row: { address } }) => {
        if (address) {
          const middle = Math.ceil(address.length / 2);
          const left = address.slice(0, middle).substring(0, 8);
          let right = address.slice(middle);
          right = right.substr(right.length - 8);
          return `${left}...${right}`;
        }
        return `Ox...`;
      },
    },
    {
      headerName: "",
      field: "actions",
      sortable: false,
      className: "sw-cell-action",
      width: 100,
      type: "actions",
      getActions: ({ id }) => {
        const apiRef = getRef();
        const isLocked = apiRef.current.getRow(id)?.locked;

        if (isLocked) {
          return [<LockIcon />];
        }
        const isInEditMode = apiRef.current.getRowMode(id) === "edit";

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
};

// @TODO: Milena to implement smart contract call
const fetchData = async (allMembers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allMembers);
    }, 2000);
  });
};

// @TODO: Milena to implement smart contract call
const addNewMembers = async (newMembers, allMembers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allMembers);
    }, 2000);
  }).then(() => fetchData(allMembers));
};

const CoreTeam = () => {
  const { apiRef, columns } = useDatatableApiRef(tableColumns);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleShareClose = () => {
    setOpenShare(false);
  };

  const submit = async () => {
    const state = apiRef.current.state;

    const { newItems, allItems } = GetDatatableItems(state);

    if (!newItems.length) {
      setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const updatedMembers = await addNewMembers(newItems, allItems);
      setLoading(false);
      setData(LockDatatableItems(updatedMembers));
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData([
      {
        name: "Partner",
        address: "0xcD3942171C362448cBD4FAeA6b2B71c8cCe40BF3",
      },
    ])
      .then((members) => {
        setData(LockDatatableItems(members));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="sw-core-team">
      <AlertDialog open={open} handleClose={handleClose} />
      <SwShare
        mode="light"
        url="https://skillwallet.id/"
        title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
        open={openShare}
        onClose={handleShareClose}
      />
      <Typography sx={{ my: 2 }} component="div" variant="h1">
        Core Team - Whitelist
      </Typography>
      <Typography sx={{ my: 2 }} component="div" variant="h3">
        Add your Team Members’ addresses & invite them to your DAO Dashboard
        straight away 😎
      </Typography>
      <SWDatatable
        apiRef={apiRef}
        columns={columns}
        data={data}
        loading={loading}
        onStateChange={(state) => {
          const rowsToEdit = Object.keys(state.editRows || {}).length;
          setIsDisabled(rowsToEdit > 0);
        }}
        components={{
          Toolbar: SwEditToolbar,
        }}
        componentsProps={{
          toolbar: {
            apiRef,
            maxSize: 10,
            title: "Add new member",
            focusOn: "name",
          },
        }}
      />
      <div className="sw-table-actions">
        <SwButton
          color="primary"
          disabled={isDisabled || loading}
          onClick={submit}
          endIcon={<PinIcon className="sw-btn-icon" />}
          sx={{
            borderColor: "primary.main",
            height: "70px",
            maxWidth: "380px",
          }}
        >
          Confirm & Whitelist
        </SwButton>
        <SwButton
          color="primary"
          onClick={() => setOpenShare(true)}
          endIcon={<ShareIcon className="sw-btn-icon" />}
          sx={{
            borderColor: "primary.main",
            height: "70px",
            maxWidth: "380px",
          }}
        >
          Invite your Team
        </SwButton>
      </div>
    </div>
  );
};

export default CoreTeam;
