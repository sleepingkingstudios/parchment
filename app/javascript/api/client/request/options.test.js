import { underscoreKeys } from 'utils/object';
import buildOptions from './options';

describe('API client request buildOptions()', () => {
  const namespace = 'api/resources';

  it('should be a function', () => {
    expect(typeof buildOptions).toEqual('function');
  });

  describe('with method: DELETE', () => {
    const method = 'DELETE';

    it('should build the request', () => {
      const getState = jest.fn();
      const expected = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      expect(buildOptions({ getState, method, namespace })).toEqual(expected);
    });
  });

  describe('with method: GET', () => {
    const method = 'GET';

    it('should build the request', () => {
      const getState = jest.fn();
      const expected = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      expect(buildOptions({ getState, method, namespace })).toEqual(expected);
    });
  });

  describe('with method: PATCH', () => {
    const method = 'PATCH';
    const data = { name: 'Stem Bolt', itemType: 'Self-Sealing' };
    const body = JSON.stringify(underscoreKeys(data));

    it('should build the request', () => {
      const getState = jest.fn();
      const options = buildOptions({
        data,
        getState,
        method,
        namespace,
      });
      const expected = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      };

      expect(options).toEqual(expected);
    });
  });

  describe('with method: POST', () => {
    const method = 'POST';
    const data = { name: 'Stem Bolt', itemType: 'Self-Sealing' };
    const body = JSON.stringify(underscoreKeys(data));

    it('should build the request', () => {
      const getState = jest.fn();
      const options = buildOptions({
        data,
        getState,
        method,
        namespace,
      });
      const expected = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      };

      expect(options).toEqual(expected);
    });
  });

  describe('with method: PUT', () => {
    const method = 'PUT';
    const data = { name: 'Stem Bolt', itemType: 'Self-Sealing' };
    const body = JSON.stringify(underscoreKeys(data));

    it('should build the request', () => {
      const getState = jest.fn();
      const options = buildOptions({
        data,
        getState,
        method,
        namespace,
      });
      const expected = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      };

      expect(options).toEqual(expected);
    });
  });
});
