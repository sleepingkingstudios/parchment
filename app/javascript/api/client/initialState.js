import { INITIALIZED } from '../status';

const extractData = (options) => {
  if (typeof options === 'undefined' || options === null) { return {}; }

  const { data } = options;

  if (typeof data === 'undefined' || data === null) { return {}; }

  return data;
};

const generateInitialState = (options) => {
  const data = extractData(options);
  const errors = {};
  const status = INITIALIZED;

  return {
    data,
    errors,
    status,
  };
};

export default generateInitialState;
