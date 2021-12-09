/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ReactComponent as EditIcon } from "../../../assets/actions/edit.svg";
import { ReactComponent as CancelIcon } from "../../../assets/actions/cancel.svg";
import { ReactComponent as SaveIcon } from "../../../assets/actions/confirm.svg";
import { ReactComponent as PinIcon } from "../../../assets/pin.svg";

import SWDatatable from "@components/datatable/Datatable";
import { SwButton } from "sw-web-shared";
import { useDatatableApiRef } from "@components/datatable/DatatableRef";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography } from "@mui/material";
import SwEditToolbar from "@components/datatable/DatatableToolbar";
import {
  GetDatatableItems,
  LockDatatableItems,
  GetDatatableChangedItems,
} from "@components/datatable/DatatableHelpers";
import "./contracts.scss";
import {
  importContractToPA,
  getImportedContracts
} from "@contracts/contracts";

import {
  getPartnersAgreementByCommunity,
} from "@contracts/api";

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

const fetchData = async (partnersAgreementAddress) => {
  const contracts = await getImportedContracts(partnersAgreementAddress);
  return contracts.map(c => {
    return {
      use: "N/A", 
      address: c,
      addedBy: "N/A"
    }
  })

};

const createContracts = async (partnersAgreementAddress, newItems) => {
  for (const item of newItems) {
    await importContractToPA(partnersAgreementAddress, item.address)
  }
  return newItems;
};

const removeContracts = async (partnersAgreementAddress, removedContract) => {
  for (const item of removedContract) {
    // await asyncCall(item);
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
  const [partnersAgreementAddress, setPartnersAgreementAddress] = useState('');

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
      const createdContract = await createContracts(partnersAgreementAddress, newItems);
      await removeContracts(partnersAgreementAddress, removedItems);
      const newData = LockDatatableItems([
        ...createdContract,
        ...noChangedItems,
      ]);
      setLoading(false);
      setData(newData);
      setInitialData(newData);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const setPAData = async () => {
      setLoading(true);
      const sw = JSON.parse(window.sessionStorage.getItem("skillWallet") || "{}");
      const pa = await getPartnersAgreementByCommunity(sw.community);
      setPartnersAgreementAddress(pa.partnersAgreementAddress);
      fetchData(pa.partnersAgreementAddress)
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
    }
    setPAData();
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
