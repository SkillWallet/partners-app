export const generatePartnersKey = async (communityAddress, partnersAgreementAddress) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/key`, {
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