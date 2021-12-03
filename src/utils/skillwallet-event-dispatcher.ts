// eslint-disable-next-line no-shadow
export enum SwAuthEventTypes {
  ActivateSwCommunity = 'activateSkillwalletCommunity',
  OnSwLogin = 'showLoginMenu',
}

let swAuthElement = document.querySelector('skillwallet-auth');

export const SwAuthDispatchEvent = (eventType: SwAuthEventTypes, requestBody: any): void => {
  if (!swAuthElement) {
    swAuthElement = document.querySelector('skillwallet-auth');
  }
  try {
    const event = new CustomEvent(eventType, {
      detail: requestBody,
    });
    swAuthElement.dispatchEvent(event);
    console.info('A new event was dispatched for sw auth: ', event);
  } catch (error) {
    throw new Error('skillwallet-auth element not found on dom');
  }
};
