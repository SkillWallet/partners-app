export const generatePartnersKey = async (communityAddress, partnersAgreementAddress) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/community/key`, {
    method: 'POST',
    body: JSON.stringify({
      communityAddress,
      partnersAgreementAddress,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const partnersKey = await response.json();
  return partnersKey.key;
};

export const getUsersData = () => {
  return fetch(`https://api.skillwallet.id/api/analytics/activeUsers?startDate=1622592571001&perMonth=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      key: '193485710394857',
    },
  }).then((res) => res.json());
};

export const getMembersByCommunityAddress = (communityAddress) => {
  return fetch(`https://api.skillwallet.id/api/community/${communityAddress}/skillwallet`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

export const getCommunityByPartnerKey = (partnerKey) => {
  return fetch(`https://api.distributed.town/api/community/key/${partnerKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

export const getCommunity = (address) => {
  return fetch(`https://api.distributed.town/api/community/${address}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

export const getSkillwalletAddress = () => {
  fetch('https://api.skillwallet.id/api/skillwallet/config', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};
