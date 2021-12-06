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
  GetDatatableChangedItems,
} from "../../datatable/DatatableHelpers";
import "./contracts.scss";

function AlertDialog({ handleClose, open }) {
  return (
    <Dialog sx={{ minHeight: 400 }} open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h2" component="span" color="red">
            No changes were made!
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

const asyncCall = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  }).then(() => data);
};

const createContracts = async (newItems) => {
  for (const item of newItems) {
    // @TODO Milena to call smart contract
    await asyncCall(item);
  }
  return newItems;
};

const removeContracts = async (removedContract) => {
  for (const item of removedContract) {
    // @TODO Milena to call smart contract
    await asyncCall(item);
  }
  return removedContract;
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
    const state = apiRef?.current?.state;

    if (!state) {
      return;
    }

    try {
      const { newItems, allItems } = GetDatatableItems(state);
      const { removedItems, noChangedItems } = GetDatatableChangedItems(
        allItems,
        initialData
      );

      if (!newItems.length && !removedItems.length) {
        setOpen(true);
        return;
      }

      setLoading(true);
      console.log("allItems: ", allItems);
      console.log("newItems: ", newItems);
      console.log("removedItems: ", removedItems);
      console.log("noChangedItems: ", noChangedItems);

      const createdContract = await createContracts(newItems);
      await removeContracts(removedItems);
      const newData = LockDatatableItems([
        ...createdContract,
        ...noChangedItems,
      ]);
      console.log(newData, "newItems");
      setLoading(false);
      setData(newData);
      setInitialData(newData);
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData([])
      .then((list) => {
        let lockedData = LockDatatableItems(list);
        if (!lockedData.length) {
          lockedData = [{ id: 0, isNew: true, locked: false }];
          setTimeout(() => {
            if (apiRef.current) {
              apiRef.current.setRowMode(0, "edit");
            }
          });
        } else {
          setInitialData(lockedData);
        }
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
        isCellEditable={(params) => !params.row.locked}
        onStateChange={(state) => {
          console.log(state);
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
