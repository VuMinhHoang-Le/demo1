export const actionTypes = (action) => ({
  ACTION: action,
  HANDLED: `${action}_HANDLED`,
  PENDING: `${action}_PENDING`,
  SUCCESS: `${action}_SUCCESS`,
  FAILED: `${action}_FAILED`,
});
