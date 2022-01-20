import { useState, useEffect, memo } from 'react';
import Box from '@mui/material/Box';
import { RootState, useAppDispatch } from '@store/store.model';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { fetchLogs, fetchMembers } from '@store/Community/community.reducer';
import { ResultState } from '@store/result-status';
import { setPreviusRoute } from '@store/ui-reducer';
import Members from './Members';
import ActivityAndLogs from './ActivityAndLogs';
import './member-and-activities.scss';

import SwTabs from '../tabs/SwTabs';

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
    const url = props.isCoreTeamMembers ? '/partner/dashboard/core-team' : '/partner/dashboard/community';
    dispatch(setPreviusRoute(url));
    console.log('Previous route from Members');
  }, [dispatch, props.isCoreTeamMembers]);

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
    const promises = [
      dispatch(
        fetchMembers({
          address: userInfo?.community,
          isCoreTeam: props.isCoreTeamMembers,
        })
      ),
      dispatch(fetchLogs(userInfo?.community)),
    ];
    return () => promises.forEach((p) => p.abort());
  }, [dispatch, userInfo, props.isCoreTeamMembers]);
  return (
    <Box className="sw-members-and-activities" sx={{ width: '100%' }}>
      {status === ResultState.Loading ? (
        <div className="members-loading-spinner">
          <CircularProgress
            sx={{
              justifyContent: 'center',
              alignContent: 'center',
            }}
          />
        </div>
      ) : (
        <SwTabs tabs={tabs} />
      )}
    </Box>
  );
}

export default memo(MembersAndActivities);
