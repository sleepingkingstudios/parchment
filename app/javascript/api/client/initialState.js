import { INITIALIZED } from 'api/status';
import { dig, valueOrDefault } from 'utils/object';

const generateInitialState = (options) => {
  const data = valueOrDefault(dig(options, 'data'), {});
  const errors = {};
  const status = INITIALIZED;

  return {
    data,
    errors,
    status,
  };
};

export default generateInitialState;
