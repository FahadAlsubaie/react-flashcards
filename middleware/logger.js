const logger = store => next => action => {
  console.group(action.type);
  console.log("Action:", action);
  const nextReturnValue = next(action);
  console.log("New State:", store.getState());
  console.groupEnd();

  return nextReturnValue;
};

export default logger;
