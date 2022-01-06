import { memo, useEffect, useState } from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';

import SWDatatable from '@components/datatable/Datatable';
import { SwButton } from 'sw-web-shared';
import { useDatatableApiRef } from '@components/datatable/DatatableRef';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Typography } from '@mui/material';
import SwEditToolbar from '@components/datatable/DatatableToolbar';
import { GetDatatableItems, GetDatatableChangedItems } from '@components/datatable/DatatableHelpers';
import './contracts.scss';
import { ReactComponent as PinIcon } from '@assets/pin.svg';
import { ReactComponent as SaveIcon } from '@assets/actions/confirm.svg';
import { ReactComponent as CancelIcon } from '@assets/actions/cancel.svg';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import { addRemoveContracts, fetchPartnerContracts, getLockedContracts } from '@store/Partner/partner.reducer';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store/store.model';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';
import { setPreviusRoute } from '@store/ui-reducer';

function AlertDialog({ handleClose, open }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          minHeight: 180,
          height: 180,
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DialogContentText>
          <Typography variant="h2" component="span" color="red">
            No changes were made!
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SwButton mode="light" onClick={handleClose} autoFocus>
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
    apiRef.current.setRowMode(id, 'edit');
  };

  const handleSaveClick = (id) => (event) => {
    const apiRef = getRef();
    event.stopPropagation();
    apiRef.current.commitRowChange(id);
    apiRef.current.setRowMode(id, 'view');

    const row = apiRef.current.getRow(id);
    apiRef.current.updateRows([{ ...row, isNew: false }]);
  };

  const handleDeleteClick = (id) => (event) => {
    const apiRef = getRef();
    event.stopPropagation();
    apiRef.current.setRowMode(id, 'view');
    apiRef.current.updateRows([{ id, _action: 'delete' }]);
  };
  return [
    {
      headerName: '#',
      field: 'id',
      width: 140,
      sortable: false,
      valueGetter: ({ id }) => `${id + 1}.`,
    },
    {
      headerName: 'Use',
      field: 'use',
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
      headerName: 'Added By',
      field: 'addedBy',
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
      headerName: 'Address',
      field: 'address',
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
      headerName: '',
      field: 'actions',
      sortable: false,
      className: 'sw-cell-action',
      width: 100,
      type: 'actions',
      getActions: ({ id }) => {
        const apiRef = getRef();
        const isInEditMode = apiRef.current.getRowMode(id) === 'edit';

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} color="primary" />,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit" />,
        ];
      },
    },
  ];
};

const Contracts = () => {
  const dispatch = useAppDispatch();
  const { apiRef, columns } = useDatatableApiRef(tableColumns);
  const [initialData, setInitialData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const lockedContracts = useSelector(getLockedContracts);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { status } = useSelector((state: RootState) => state.partner);

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    const state = apiRef?.current?.state;

    if (!state) {
      return;
    }

    const { newItems, allItems } = GetDatatableItems(state);
    const { removedItems } = GetDatatableChangedItems(allItems, initialData);

    if (!newItems.length && !removedItems.length) {
      setOpen(true);
      return;
    }

    dispatch(addRemoveContracts({ removedItems, newItems }));
  };

  useEffect(() => {
    dispatch(setPreviusRoute('/partner/integrations-and-contracts'));
  }, [dispatch]);

  useEffect(() => {
    if (!lockedContracts.length) {
      const timeout = setTimeout(() => {
        if (apiRef.current) {
          apiRef.current.setRowMode(0, 'edit');
        }
      });
      return () => clearTimeout(timeout);
    }
    setInitialData(lockedContracts);
  }, [apiRef, lockedContracts]);

  useEffect(() => {
    const promise = dispatch(fetchPartnerContracts(userInfo?.community));
    return () => promise.abort();
  }, [dispatch, userInfo]);

  return (
    <div className="sw-core-team">
      <LoadingDialog open={status === ResultState.Updating} message="Updating contracts..." />
      <AlertDialog open={open} handleClose={handleClose} />
      <Typography sx={{ my: 2 }} component="div" variant="h1">
        Your Smart Contracts List
      </Typography>
      <Typography sx={{ mt: 2 }} component="div" variant="h3">
        Add the Contracts used by your Protocol or DApp,
      </Typography>
      <Typography sx={{ mb: 2 }} component="div" variant="h3">
        and track how Members of your Community interact with (and provide value to) them 🙌
      </Typography>
      <SWDatatable
        apiRef={apiRef}
        columns={columns}
        data={lockedContracts}
        loading={status === ResultState.Loading}
        isCellEditable={(params) => !params.row.locked}
        onStateChange={(state) => {
          const rowsToEdit = Object.keys(state.editRows || {}).length;
          setIsDisabled(rowsToEdit > 0);
        }}
        components={{
          Toolbar: SwEditToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef, title: 'Add new Contract', focusOn: 'use' },
        }}
      />
      <div className="sw-table-actions">
        <SwButton
          mode="light"
          btnType="large"
          disabled={isDisabled || status === ResultState.Loading}
          onClick={submit}
          endIcon={<PinIcon />}
        >
          Save changes
        </SwButton>
      </div>
    </div>
  );
};

export default memo(Contracts);
