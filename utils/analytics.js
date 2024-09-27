
export const sendCriteoEvent = (mainEvent, email = '') => {
  if (typeof window === 'undefined') {
    return false;
  }

  const deviceType = window.isMobile.any ? (window.isMobile.phone ? 'm' : 't') : 'd';

  window.criteo_q = window.criteo_q || [];
  window.criteo_q.push(
    { event: 'setAccount', account: 59120 },
    { event: 'setEmail', email },
    { event: 'setSiteType', type: deviceType },
    mainEvent
  );

  return true;
};
