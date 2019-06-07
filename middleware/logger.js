/* eslint-disable no-console */
// @flow

const logger = (store: Object): Function => (next: Function): Function => (action: Object): any => {
  if (__DEV__) {
    console.group(action.type);
    console.log('The action is: ', action);
    const returnValue = next(action);
    console.log('The new state is: ', store.getState());
    console.groupEnd();
    return returnValue;
  }
  return next(action);
};

export default logger;
