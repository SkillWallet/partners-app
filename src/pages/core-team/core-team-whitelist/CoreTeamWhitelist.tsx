/* eslint-disable max-len */
import { memo, useEffect, useState } from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import { ReactComponent as CancelIcon } from '@assets/actions/cancel.svg';
import { ReactComponent as SaveIcon } from '@assets/actions/confirm.svg';
import { ReactComponent as LockIcon } from '@assets/actions/lock.svg';
import { ReactComponent as PinIcon } from '@assets/pin.svg';
import { ReactComponent as ShareIcon } from '@assets/share.svg';
import './core-team.scss';
import SWDatatable from '@components/datatable/Datatable';
import { SwButton, SwShare } from 'sw-web-shared';
import { useDatatableApiRef } from '@components/datatable/DatatableRef';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Typography } from '@mui/material';
import SwEditToolbar from '@components/datatable/DatatableToolbar';
import { GetDatatableItems } from '@components/datatable/DatatableHelpers';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store/store.model';
import {
  addNewWhitelistedAddresses,
  fetchPartnerWhitelistedAddresses,
  getLockedWhitelistedAddresses,
} from '@store/Partner/partner.reducer';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';

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
        <DialogContentText textAlign="center">
          <Typography textAlign="center" variant="h2" component="span" color="red">
            No new members were added to whitelist!
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
      headerName: 'Name / Note',
      field: 'name',
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
        const isLocked = apiRef.current.getRow(id)?.locked;

        if (isLocked) {
          return [<LockIcon />];
        }
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

const CoreTeamWhitelist = () => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const { apiRef, columns } = useDatatableApiRef(tableColumns);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { community } = useSelector((state: RootState) => state.community);
  const { paCommunity, status } = useSelector((state: RootState) => state.partner);
  const whitelistedAddresses = useSelector(getLockedWhitelistedAddresses);

  const handleClose = () => {
    setOpen(false);
  };

  const handleShareClose = () => {
    setOpenShare(false);
  };

  const submit = () => {
    const { state } = apiRef.current;
    const { newItems } = GetDatatableItems(state);
    if (!newItems.length) {
      setOpen(true);
      return;
    }
    dispatch(addNewWhitelistedAddresses(newItems));
  };

  useEffect(() => {
    const promise = dispatch(fetchPartnerWhitelistedAddresses(userInfo?.community));
    return () => promise.abort();
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (!whitelistedAddresses.length) {
      const timeout = setTimeout(() => {
        if (apiRef.current) {
          apiRef.current.setRowMode(0, 'edit');
        }
      });
      return () => clearTimeout(timeout);
    }
  }, [apiRef, whitelistedAddresses]);

  const shareMessage = `Hey there! We've just deployed ${community?.name} on SkillWallet - choose your Role in our Community, pick your Skills, and let's build something great together!`;

  return (
    <div className="sw-core-team">
      <>
        <LoadingDialog open={status === ResultState.Updating} message="Adding addresses..." />
        <AlertDialog open={open} handleClose={handleClose} />
        <SwShare
          mode="light"
          url="https://skillwallet.id/"
          title="with your team"
          sx={{
            '.MuiTypography-h2': {
              mt: 0,
            },
          }}
          twitterProps={{
            title: shareMessage,
            hashtags: ['SkillWallet', 'DAO', 'Blockchain'],
          }}
          linkedinProps={{
            title: shareMessage,
            summary: 'Do more with DAO',
            source: 'https://skillwallet.id',
          }}
          telegramProps={{
            title: shareMessage,
          }}
          open={openShare}
          onClose={handleShareClose}
        />
        <Typography sx={{ my: 2 }} component="div" variant="h1">
          Core Team - Whitelist
        </Typography>
        <Typography sx={{ my: 2 }} component="div" variant="h3">
          Add your Team Members’ addresses & invite them to your DAO Dashboard straight away 😎
        </Typography>
        <SWDatatable
          apiRef={apiRef}
          columns={columns}
          data={whitelistedAddresses}
          loading={status === ResultState.Loading}
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
              title: 'Add new member',
              focusOn: 'name',
            },
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
            Confirm & Whitelist
          </SwButton>
          <SwButton mode="light" btnType="large" onClick={() => setOpenShare(true)} endIcon={<ShareIcon />}>
            Invite your Team
          </SwButton>
        </div>
      </>
    </div>
  );
};

export default memo(CoreTeamWhitelist);
