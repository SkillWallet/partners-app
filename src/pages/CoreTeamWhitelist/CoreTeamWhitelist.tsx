/* eslint-disable max-len */
import { memo, MutableRefObject, useEffect, useState } from 'react';
import { GridActionsCellItem, GridColumns, GridEditRowApi, GridRenderEditCellParams, GridRowApi } from '@mui/x-data-grid';
import { ReactComponent as EditIcon } from '@assets/actions/edit.svg';
import { ReactComponent as CancelIcon } from '@assets/actions/cancel.svg';
import { ReactComponent as SaveIcon } from '@assets/actions/confirm.svg';
import { ReactComponent as LockIcon } from '@assets/actions/lock.svg';
import { ReactComponent as PinIcon } from '@assets/pin.svg';
import { ReactComponent as ShareIcon } from '@assets/share.svg';
import SWDatatable from '@components/datatable/Datatable';
import { SwShare } from 'sw-web-shared';
import { CustomEditComponent, useDatatableApiRef } from '@components/datatable/DatatableRef';
import { Container, IconButton, Tooltip, Typography } from '@mui/material';
import SwEditToolbar from '@components/datatable/DatatableToolbar';
import { GetDatatableItems } from '@components/datatable/DatatableHelpers';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@store/store.model';
import { getLockedWhitelistedAddresses } from '@store/Partner/partner.reducer';
import { ResultState } from '@store/result-status';
import LoadingDialog from '@components/LoadingPopup';
import { getPAUrl } from '@api/agreement.api';
import { addNewWhitelistedAddresses, getWhitelistedAddresses } from '@api/community.api';
import ErrorDialog from '@components/ErrorPopup';
import { pxToRem } from '@utils/text-size';
import PartnerButton from '@components/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './core-team.scss';

const tableColumns = (getRef: () => MutableRefObject<GridEditRowApi & GridRowApi>): GridColumns => {
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
      valueGetter: ({ id }) => `${+id + 1}.`,
    },
    {
      headerName: 'Name / Note',
      field: 'name',
      editable: true,
      flex: 1,
      sortable: false,
      renderEditCell: (props: GridRenderEditCellParams) => {
        const placeholder = `New member ${+props.id + 1}`;
        return CustomEditComponent(props, placeholder);
      },
    },
    {
      headerName: 'Address',
      field: 'address',
      editable: true,
      flex: 1,
      sortable: false,
      renderEditCell: (props) => CustomEditComponent(props, `Ox...`),
      renderCell: ({ field, row, value }) => {
        return (
          <CopyToClipboard text={row[field]}>
            <div style={{ width: '100%' }}>
              {value}
              <Tooltip title="Copy Address">
                <IconButton>
                  <ContentCopyIcon sx={{ cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
            </div>
          </CopyToClipboard>
        );
      },
      valueGetter: ({ row: { address } }) => {
        if (address) {
          const middle = Math.ceil(address.length / 2);
          const left = address.slice(0, middle).substring(0, 8);
          let right = address.slice(middle);
          right = right.substr(right.length - 8);
          return `${left}...${right}`;
        }
        return null;
      },
    },
    {
      headerName: '',
      field: 'actions',
      sortable: false,
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
  const { status, paUrl, errorMessage } = useSelector((state: RootState) => state.partner);
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
    const promise = dispatch(getPAUrl(null));
    return () => promise.abort();
  }, [dispatch]);

  useEffect(() => {
    const promise = dispatch(getWhitelistedAddresses(userInfo?.community));
    return () => promise.abort();
  }, [dispatch, userInfo]);

  useEffect(() => {
    const [firstItem] = whitelistedAddresses;
    if (firstItem?.isNew) {
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
    <Container maxWidth="md" className="sw-core-team">
      <>
        <LoadingDialog open={status === ResultState.Updating} message="Adding addresses..." />
        <ErrorDialog open={status === ResultState.Failed} handleClose={handleClose} message={errorMessage} />
        <ErrorDialog open={open} handleClose={handleClose} message=" No new members were added to whitelist!" />
        <SwShare
          mode="light"
          url={paUrl || 'https://skillwallet.id/'}
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
            source: paUrl || 'https://skillwallet.id/',
          }}
          telegramProps={{
            title: shareMessage,
          }}
          open={openShare}
          onClose={handleShareClose}
        />
        <Typography
          sx={{
            mt: pxToRem(20),
          }}
          color="primary.main"
          fontSize={pxToRem(50)}
          component="div"
        >
          Core Team - Whitelist
        </Typography>
        <Typography
          sx={{
            mb: pxToRem(50),
          }}
          color="primary.main"
          fontSize={pxToRem(25)}
          component="div"
        >
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
          <PartnerButton
            mode="light"
            endIcon={<PinIcon />}
            label="Confirm & Whitelist"
            disabled={isDisabled || status === ResultState.Loading}
            onClick={submit}
            btnStyles={{
              width: pxToRem(450),
              height: pxToRem(100),
              fontSize: pxToRem(28),
            }}
          />
          <PartnerButton
            btnStyles={{
              width: pxToRem(450),
              height: pxToRem(100),
              fontSize: pxToRem(28),
            }}
            mode="light"
            onClick={() => setOpenShare(true)}
            endIcon={<ShareIcon />}
          >
            Invite your Team
          </PartnerButton>
        </div>
      </>
    </Container>
  );
};

export default memo(CoreTeamWhitelist);
