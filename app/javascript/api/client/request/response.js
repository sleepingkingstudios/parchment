import {
  exists,
  isEmpty,
  valueOrDefault,
} from 'utils/object';
import buildEmptyResponse from './emptyResponse';

const generateJson = ({ status }) => {
  if (!exists(status)) { return { ok: false }; }

  return { ok: status < 400 };
};

const processResponse = async (response) => {
  const empty = buildEmptyResponse();

  if (!exists(response) || isEmpty(response)) { return empty; }

  const {
    headers,
    ok,
    status,
    statusText,
  } = response;

  try {
    const json = (typeof response.json === 'function')
      ? await response.json()
      : generateJson(response);

    return {
      headers: valueOrDefault(headers, empty.headers),
      json,
      ok: valueOrDefault(ok, empty.ok),
      status: valueOrDefault(status, empty.status),
      statusText: valueOrDefault(statusText, empty.statusText),
    };
  } catch (error) {
    return buildEmptyResponse({
      error: { message: error.toString() },
      headers,
    });
  }
};

export default processResponse;
