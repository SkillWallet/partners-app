/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ReactComponent as EditIcon } from "../../../assets/actions/edit.svg";
import { ReactComponent as CancelIcon } from "../../../assets/actions/cancel.svg";
import { ReactComponent as SaveIcon } from "../../../assets/actions/confirm.svg";
import { ReactComponent as PinIcon } from "../../../assets/pin.svg";

import SWDatatable from "../../datatable/Datatable";
import { SwButton } from "sw-web-shared";
import { useDatatableApiRef } from "../../datatable/DatatableRef";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography } from "@mui/material";
import SwEditToolbar from "../../datatable/DatatableToolbar";
import {
  GetDatatableItems,
  LockDatatableItems,
} from "../../datatable/DatatableHelpers";
import "./contracts.scss";

function AlertDialog({ handleClose, open }) {
  return (
    <Dialog sx={{ minHeight: 400 }} open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h2" component="span" color="red">
            No new Contract were added to whitelist!
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
      headerName: "Use",
      field: "use",
      editable: true,
      flex: 1,
      sortable: false,
      valueGetter: ({ id, row: { use } }) => {
        if (!use) {
          return `Use ${id + 1}`;
        }
        return use;
      },
    },
    {
      headerName: "Added By",
      field: "addedBy",
      editable: true,
      flex: 1,
      sortable: false,
      valueGetter: ({ id, row: { addedBy } }) => {
        if (!addedBy) {
          return `New Member ${id + 1}`;
        }
        return addedBy;
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
const fetchData = async (allContract) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allContract);
    }, 2000);
  });
};

// @TODO: Milena to implement smart contract call
const addNewContract = async (newContract, allContract) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allContract);
    }, 2000);
  }).then(() => fetchData(allContract));
};

const Contracts = () => {
  const { apiRef, columns } = useDatatableApiRef(tableColumns);
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    const state = apiRef.current.state;

    const { newItems, allItems } = GetDatatableItems(state);
    const removedItems = initialData.filter((item) => {
      const found = allItems.some((i) => i.id === item.id);
      return !found;
    });

    if (!newItems.length) {
      setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const updatedContract = await addNewContract(newItems, allItems);
      setLoading(false);
      setData(LockDatatableItems(updatedContract));
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData([
      {
        use: "DAO Contract",
        addedBy: "Signing Partner",
        address: "0xcD3942171C362448cBD4FAeA6b2B71c8cCe40BF3",
      },
    ])
      .then((list) => {
        const lockedData = LockDatatableItems(list);
        setInitialData(lockedData);
        setData(lockedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="sw-core-team">
      <AlertDialog open={open} handleClose={handleClose} />
      <Typography sx={{ my: 2 }} component="div" variant="h1">
        Your Smart Contracts List
      </Typography>
      <Typography sx={{ mt: 2 }} component="div" variant="h3">
        Add the Contracts used by your Protocol or DApp,
      </Typography>
      <Typography sx={{ mb: 2 }} component="div" variant="h3">
        and track how Members of your Community interact with (and provide value
        to) them 🙌
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
          toolbar: { apiRef, title: "Add new Contract", focusOn: "use" },
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
          Save changes
        </SwButton>
      </div>
    </div>
  );
};

export default Contracts;
