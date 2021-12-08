import * as React from "react";
import Box from "@mui/material/Box";
import SwTabs from "../tabs/SwTabs";

import { fetchMembersAndActivityData } from "@contracts/api";
import { connect } from "react-redux";
import { saveMembers } from "@store/Members/members.actions";
import { saveLogs } from "@store/Logs/logs.actions";
import { saveCommunity } from "@store/Community/community.actions";
import Members from "./Members";
import ActivityAndLogs from "./ActivityAndLogs";
import "./member-and-activities.scss";
import { CircularProgress } from "@mui/material";

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
  const [tabs, setTabs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // @TODO: Make more reusable in case in the future there are more view that will have
    // members and activities
    const isCoreTeamMembers = props.isCoreTeamMembers;
    let memberTabs = [];
    const members = props?.state?.members;
    const logs = props?.state?.logs;

    if (!members || !logs) {
      return;
    }

    setLoading(false);

    if (isCoreTeamMembers) {
      const allMembers = getAllMembers(members);
      memberTabs = [
        {
          label: "All",
          props: {
            total: allMembers?.length,
            members: allMembers,
          },
          component: Members,
        },
      ];
    } else {
      memberTabs = generateMemberTabs(members);

      console.log(memberTabs)
    }

    setTabs([
      ...(memberTabs || []),
      {
        label: "Activity & Logs",
        props: {
          total: props.state?.logs?.length,
          logs: props.state.logs,
        },
        component: ActivityAndLogs,
      },
    ]);
  }, [props.state.members, props.state.logs, props.isCoreTeamMembers]);

  React.useEffect(() => {
    setLoading(true);
    fetchMembersAndActivityData({
      ...props,
      isCoreTeamMembers: props.isCoreTeamMembers,
    });
  }, []);
  return (
    <Box className="sw-members-and-activities" sx={{ width: "100%" }}>
      {loading ? (
        <div className="members-loading-spinner">
          <CircularProgress
            sx={{
              justifyContent: "center",
              alignContent: "center",
            }}
          />
        </div>
      ) : (
        <SwTabs tabs={tabs} />
      )}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    state: {
      members: state.members.members,
      logs: state?.logs?.logs,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSaveMembers: (res) => dispatch(saveMembers(res)),
    dispatchSaveLogs: (res) => dispatch(saveLogs(res)),
    dispatchSaveCommunity: (res) => dispatch(saveCommunity(res)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersAndActivities);
