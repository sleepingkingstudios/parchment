import buildEmptyResponse from './emptyResponse';

describe('API client request buildEmptyResponse()', () => {
  it('should be a function', () => {
    expect(typeof buildEmptyResponse).toEqual('function');
  });

  it('should return an empty response', () => {
    const expected = {
      headers: { map: {} },
      ok: false,
      json: { ok: false },
      status: 500,
      statusText: 'Internal Server Error',
    };

    expect(buildEmptyResponse()).toEqual(expected);
  });

  describe('with error: value', () => {
    const error = { message: 'Something went wrong' };
    const json = { ok: false, error };

    it('should return an empty response', () => {
      const expected = {
        headers: { map: {} },
        ok: false,
        json,
        status: 500,
        statusText: 'Internal Server Error',
      };

      expect(buildEmptyResponse({ error })).toEqual(expected);
    });
  });

  describe('with headers: value', () => {
    const headers = { map: { 'content-type': 'application/json; charset=utf-8' } };

    it('should return an empty response', () => {
      const expected = {
        headers,
        ok: false,
        json: { ok: false },
        status: 500,
        statusText: 'Internal Server Error',
      };

      expect(buildEmptyResponse({ headers })).toEqual(expected);
    });
  });

  describe('with status: value', () => {
    const status = 418;

    it('should return an empty response', () => {
      const expected = {
        headers: { map: {} },
        ok: false,
        json: { ok: false },
        status,
        statusText: 'Internal Server Error',
      };

      expect(buildEmptyResponse({ status })).toEqual(expected);
    });
  });

  describe('with statusText: value', () => {
    const statusText = "I'm a teapot";

    it('should return an empty response', () => {
      const expected = {
        headers: { map: {} },
        ok: false,
        json: { ok: false },
        status: 500,
        statusText,
      };

      expect(buildEmptyResponse({ statusText })).toEqual(expected);
    });
  });
});
