import {
  underscoreKeys,
  valueOrDefault,
} from 'utils/object';

const buildOptions = (options) => {
  const { method } = options;
  const data = valueOrDefault(
    options.data,
    {},
  );
  const request = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method === 'GET' || method === 'DELETE') { return request; }

  return Object.assign(
    request,
    { body: JSON.stringify(underscoreKeys(data)) },
  );
};

export default buildOptions;
