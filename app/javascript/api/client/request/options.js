import {
  dig,
  underscoreKeys,
} from 'utils/object';

const getData = ({ namespace, state }) => {
  const segments = namespace.split('/');
  const raw = dig(state, ...segments, 'data');

  return underscoreKeys(raw);
};

const buildOptions = ({ getState, method, namespace }) => {
  const request = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method === 'GET' || method === 'DELETE') { return request; }

  const state = getState();
  const data = getData({ namespace, state });

  return Object.assign(
    request,
    { body: JSON.stringify(data) },
  );
};

export default buildOptions;
