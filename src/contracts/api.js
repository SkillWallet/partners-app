import { connect } from 'react-redux';
import { saveMembers } from '../redux/Members/members.actions';
import { saveLogs } from "../redux/Logs/logs.actions";
import { saveCommunity } from '../redux/Community/community.actions';

export const generatePartnersKey = async (communityAddress, partnersAgreementAddress) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/community/key`, {
        method: 'POST',
        body: JSON.stringify({
            communityAddress,
            partnersAgreementAddress
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const partnersKey = await response.json();
    return partnersKey.key;
}

export const getUsersData = () => {
    return fetch(`https://api.skillwallet.id/api/analytics/activeUsers?startDate=1622592571001&perMonth=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'key': '193485710394857'
        }
    }).then(res => res.json());
}

export const getMembersByCommunityAddress = (communityAddress, isCoreTeamMember) => {
    console.log(communityAddress, isCoreTeamMember, 'communityAddress, isCoreTeamMember');
    return fetch(`https://api.skillwallet.id/api/community/${communityAddress}/skillwallet?coreTeamMembers=${isCoreTeamMember}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json());
}


export const getPartnersAgreementByCommunity = (communityAddress) => {
    return fetch(`https://api.distributed.town/api/community/${communityAddress}/key`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json());
}

export const getCommunityByPartnerKey = (partnerKey) => {
    return fetch(`https://api.distributed.town/api/community/key/${partnerKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json());
}

export const getCommunityByCommunityAddress = (communityAddress) => {
    return fetch(`https://api.distributed.town/api/community/${communityAddress}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json());
}

export const getSkillwalletAddress = () => {
    fetch('https://api.skillwallet.id/api/skillwallet/config', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json());
}


// @OTOD: Milena to implement method for fetching logs
export const getLogs = () => {
    return new Promise((resolve) => {
        resolve([
            {
              img: "",
              title: "SW 1",
              sign: "@",
              source: "",
              role: "Role",
              timestamp: new Date(),
            },
            {
              img: "",
              title: "SW 1",
              sign: "@",
              source: "",
              role: "Role",
              timestamp: new Date(),
            },
            {
              img: "",
              title: "SW 1",
              sign: "@",
              role: "Role",
              source: "",
              timestamp: new Date(),
            },
            {
              img: "",
              title: "SW 1",
              sign: "@",
              source: "",
              role: "Role",
              timestamp: new Date(),
            },
            {
              img: "",
              title: "SW 1",
              sign: "@",
              source: "",
              role: "Role",
              timestamp: new Date(),
            },
            {
              img: "",
              title: "SW 1",
              sign: "@",
              source: "",
              role: "Role",
              timestamp: new Date(),
            },
          ])
    })
}

export const fetchData = async (props) => {
    const sw = JSON.parse(window.sessionStorage.getItem('skillWallet'));
    const communityAddress = sw.community;
    const isCoreTeam = props.isCoreTeamMembers;
    if (!props.state.members?.length) {
        const allMembers = await getMembersByCommunityAddress("0x446f5728Bd526A15Cc26Ea2574BE5122E840478b", isCoreTeam);
        props.dispatchSaveMembers(allMembers);
    }
    if (!props.state.community) {
        const community = await getCommunityByCommunityAddress(communityAddress);
        props.dispatchSaveCommunity(community)
    }
}

export const fetchCommunity = async (props) => {
    const sw = JSON.parse(window.sessionStorage.getItem('skillWallet'));
    const communityAddress = sw.community;  
    const community = await getCommunityByCommunityAddress(communityAddress);
    console.log(community)
    props.dispatchSaveCommunity(community) 
}

export const fetchMembersAndActivityData = async (props) => {
    const sw = JSON.parse(window.sessionStorage.getItem('skillWallet'));
    const communityAddress = sw.community;
    const isCoreTeam = props.isCoreTeamMembers;
    const allMembers = await getMembersByCommunityAddress(communityAddress, isCoreTeam);
    const allLogs = await getLogs();
    props.dispatchSaveMembers(allMembers);
    props.dispatchSaveLogs(allLogs);
}
  
  const mapDispatchToProps = dispatch => {
    return {
        dispatchSaveMembers: (res) => dispatch(saveMembers(res)),
        dispatchSaveLogs: (res) => dispatch(saveLogs(res)),
        dispatchSaveCommunity: (res) => dispatch(saveCommunity(res))
    }
  }

export default connect(mapDispatchToProps)(fetchData);