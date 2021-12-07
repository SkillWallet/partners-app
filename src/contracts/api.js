import { connect } from 'react-redux';
import { saveMembers } from '../redux/Members/members.actions';
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
    return fetch(`https://api.skillwallet.id/api/community/${communityAddress}/skillwallet/${isCoreTeamMember}`, {
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

export const fetchData = async (props, communityAddress) => {
    if (!props.state.members) {
        const allMembers = await getMembersByCommunityAddress(communityAddress);
        props.dispatchSaveMembers(allMembers);
    }
    if (!props.state.community) {
        const community = await getCommunityByCommunityAddress(communityAddress);
        props.dispatchSaveCommunity(community)
    }
}
  
  const mapDispatchToProps = dispatch => {
    return {
        dispatchSaveMembers: (res) => dispatch(saveMembers(res)),
        dispatchSaveCommunity: (res) => dispatch(saveCommunity(res))
    }
  }

export default connect(mapDispatchToProps)(fetchData);