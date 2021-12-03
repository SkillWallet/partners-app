export const ParseSWErrorMessage = (error: string) => {
  if (!error) {
    return error;
  }

  if (typeof error !== 'string') {
    throw new Error('SW error message is not a string!');
  }

  const [, skillWalletMsg] = error.split('execution reverted:');
  const [, message] = (skillWalletMsg || '').split('SkillWallet:');
  return (message || skillWalletMsg || 'Unknown error').trim();
};
