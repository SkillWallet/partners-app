import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { RootState, useAppDispatch } from '@store/store.model';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { fetchLogs } from '@store/Community/community.reducer';
import { ResultState } from '@store/result-status';
import { setPreviusRoute } from '@store/ui-reducer';
import { fetchMembers } from '@api/community.api';
import { pxToRem } from '@utils/text-size';
import Members from './Members';
import ActivityAndLogs from './ActivityAndLogs';
import SwTabs from '../tabs/SwTabs';
import './member-and-activities.scss';

const getAllMembers = (members) => {
  return Object.keys(members).reduce((prev, curr) => {
    const item = members[curr];
    if (Array.isArray(item)) {
      prev = [...prev, ...item];
    }
    return prev;
  }, []);
};

const generateMemberTabs = (members) => {
  return Object.keys(members).reduce((prev, curr) => {
    const item = members[curr];
    if (Array.isArray(item)) {
      prev = [
        ...prev,
        {
          label: curr,
          props: {
            total: item?.length,
            members: item,
          },
          component: Members,
        },
      ];
    }
    return prev;
  }, []);
};

function MembersAndActivities(props) {
  const dispatch = useAppDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { members, logs, status } = useSelector((state: RootState) => state.community);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    // @TODO: Make more reusable in case in the future there are more view that will have
    // members and activities
    const { isCoreTeamMembers } = props;
    let memberTabs = [];
    if (!members || !logs) {
      return;
    }

    if (isCoreTeamMembers) {
      const allMembers = getAllMembers(members);
      memberTabs = [
        {
          label: 'All',
          props: {
            total: allMembers?.length,
            members: allMembers,
          },
          component: Members,
        },
      ];
    } else {
      memberTabs = generateMemberTabs(members);
    }

    setTabs([
      ...(memberTabs || []),
      {
        label: 'Activity & Logs',
        props: {
          total: logs?.length,
          logs,
        },
        component: ActivityAndLogs,
      },
    ]);
  }, [members, logs, props]);

  useEffect(() => {
    const promises = [dispatch(fetchMembers(props.isCoreTeamMembers)), dispatch(fetchLogs(userInfo?.community))];
    return () => promises.forEach((p) => p.abort());
  }, [dispatch, userInfo, props.isCoreTeamMembers]);
  return (
    <Container maxWidth="md" sx={{ width: '100%', flexGrow: 1, boxSizing: 'border-box' }}>
      {status === ResultState.Loading ? (
        <div className="sw-loading-spinner">
          <CircularProgress
            sx={{
              justifyContent: 'center',
              alignContent: 'center',
            }}
          />
        </div>
      ) : (
        <Box>
          <Typography
            color="primary"
            sx={{
              mt: pxToRem(20),
              mb: pxToRem(50),
            }}
            fontSize={pxToRem(50)}
          >
            Your Team Members
          </Typography>
          <SwTabs tabs={tabs} />
        </Box>
      )}
    </Container>
  );
}

export default MembersAndActivities;
