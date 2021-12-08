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
  Object.keys(members).reduce((prev, curr) => {
    const item = members[curr];
    if (Array.isArray(item)) {
      prev = [
        ...prev,
        {
          label: curr,
          props: {
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

    if (isCoreTeamMembers) {
      memberTabs = [
        {
          label: "All",
          props: {
            members: getAllMembers(members),
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
        label: "Activity & Logs",
        props: {
          logs: props.state.logs,
        },
        component: ActivityAndLogs,
      },
    ]);
  }, [props.state.members, props.state.logs, props.isCoreTeamMembers]);

  React.useEffect(() => {
    fetchMembersAndActivityData({
      ...props,
      isCoreTeamMembers: props.isCoreTeamMembers,
    });
  }, []);
  return (
    <Box className="sw-members-and-activities" sx={{ width: "100%" }}>
      <SwTabs tabs={tabs} />
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
