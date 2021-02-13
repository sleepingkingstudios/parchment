import buildEmptyResponse from './emptyResponse';
import processResponse from './response';

describe('API client request processResponse()', () => {
  const data = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Self-Sealing Stem Bolt',
    cargoType: 'Trade Goods',
    quantity: 50,
  };

  it('should be a function', () => {
    expect(typeof processResponse).toEqual('function');
  });

  describe('with an empty response', () => {
    const response = {};

    it('should return an empty response', async () => {
      const expected = buildEmptyResponse();

      expect(await processResponse(response)).toEqual(expected);
    });
  });

  describe('with a response without a json key', () => {
    describe('with status: 200', () => {
      const response = { status: 200 };

      it('should return a response with json: { ok: true }', async () => {
        const expected = Object.assign(
          buildEmptyResponse({ status: 200 }),
          { json: { ok: true } },
        );

        expect(await processResponse(response)).toEqual(expected);
      });
    });

    describe('with status: 400', () => {
      const response = { status: 400 };

      it('should return a response with json: { ok: true }', async () => {
        const expected = Object.assign(
          buildEmptyResponse({ status: 400 }),
          { json: { ok: false } },
        );

        expect(await processResponse(response)).toEqual(expected);
      });
    });
  });

  describe('with a response with json: value', () => {
    describe('with JSON: a function throwing a SyntaxError', () => {
      const json = jest.fn(() => JSON.parse('<html />'));
      const response = { json };

      beforeEach(() => { json.mockClear(); });

      it('should return an empty response', async () => {
        const message = 'SyntaxError: Unexpected token < in JSON at position 0';
        const error = { message };
        const expected = buildEmptyResponse({ error });

        expect(await processResponse(response)).toEqual(expected);
      });
    });

    describe('with JSON: a function returning JSON data', () => {
      const json = jest.fn(() => data);
      const response = { json };

      beforeEach(() => { json.mockClear(); });

      it('should return the processed response', async () => {
        const expected = Object.assign(
          buildEmptyResponse(),
          { json: data },
        );

        expect(await processResponse(response)).toEqual(expected);
      });

      it('should call json()', async () => {
        await processResponse(response);

        expect(json).toHaveBeenCalled();
      });
    });
  });

  describe('with a full response', () => {
    const defaultResponse = {
      headers: {
        map: {
          'content-type': 'application/json; charset=utf-8',
        },
      },
      ok: true,
      status: 200,
      statusText: 'OK',
    };

    describe('with JSON: a function throwing a SyntaxError', () => {
      const json = jest.fn(() => JSON.parse('<html />'));
      const response = { ...defaultResponse, json };

      beforeEach(() => { json.mockClear(); });

      it('should return an empty response', async () => {
        const message = 'SyntaxError: Unexpected token < in JSON at position 0';
        const error = { message };
        const expected = {
          ...defaultResponse,
          ok: false,
          json: { ok: false, error },
          status: 500,
          statusText: 'Internal Server Error',
        };

        expect(await processResponse(response)).toEqual(expected);
      });
    });

    describe('with JSON: a function returning JSON data', () => {
      const json = jest.fn(() => data);
      const response = { ...defaultResponse, json };

      beforeEach(() => { json.mockClear(); });

      it('should return the processed response', async () => {
        const expected = Object.assign(
          { ...defaultResponse },
          { json: data },
        );

        expect(await processResponse(response)).toEqual(expected);
      });

      it('should call json()', async () => {
        await processResponse(response);

        expect(json).toHaveBeenCalled();
      });
    });
  });
});
