const inputValue = (input) => {
  const { checked, type, value } = input;

  if (type === 'checkbox') { return checked; }

  return value;
};

/* eslint-disable-next-line import/prefer-default-export */
export const handleChangeEvent = actionCreator => (event) => {
  const { dataset } = event.target;
  const value = inputValue(event.target);
  const { propName } = dataset;

  return actionCreator({ propName, value });
};
