import {
  exists,
  valueOrDefault,
} from 'utils/object';

const buildEmptyResponse = (opts) => {
  const options = valueOrDefault(opts, {});
  const json = exists(options.error) ? { ok: false, error: options.error } : { ok: false };

  return {
    headers: valueOrDefault(options.headers, { map: {} }),
    ok: false,
    json,
    status: valueOrDefault(options.status, 500),
    statusText: valueOrDefault(options.statusText, 'Internal Server Error'),
  };
};

export default buildEmptyResponse;
