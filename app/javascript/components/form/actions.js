/* eslint-disable-next-line import/prefer-default-export */
export const handleChangeEvent = actionCreator => (event) => {
  const { dataset, value } = event.target;
  const { propName } = dataset;

  return actionCreator({ propName, value });
};
