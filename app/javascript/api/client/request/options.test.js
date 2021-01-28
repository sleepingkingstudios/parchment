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

    it('should build the request', () => {
      const getState = jest.fn();
      const expected = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: '{}',
      };

      expect(buildOptions({ getState, method, namespace })).toEqual(expected);
    });

    describe('when the state has data', () => {
      const data = { name: 'Self-Sealing Stem Bolt' };
      const state = { api: { resources: { data } } };

      it('should build the request', () => {
        const getState = jest.fn(() => state);
        const expected = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };

        expect(buildOptions({ getState, method, namespace })).toEqual(expected);
      });
    });
  });

  describe('with method: POST', () => {
    const method = 'POST';

    it('should build the request', () => {
      const getState = jest.fn();
      const expected = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: '{}',
      };

      expect(buildOptions({ getState, method, namespace })).toEqual(expected);
    });

    describe('when the state has data', () => {
      const data = { name: 'Self-Sealing Stem Bolt' };
      const state = { api: { resources: { data } } };

      it('should build the request', () => {
        const getState = jest.fn(() => state);
        const expected = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };

        expect(buildOptions({ getState, method, namespace })).toEqual(expected);
      });
    });
  });

  describe('with method: PUT', () => {
    const method = 'PUT';

    it('should build the request', () => {
      const getState = jest.fn();
      const expected = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: '{}',
      };

      expect(buildOptions({ getState, method, namespace })).toEqual(expected);
    });

    describe('when the state has data', () => {
      const data = { name: 'Self-Sealing Stem Bolt' };
      const state = { api: { resources: { data } } };

      it('should build the request', () => {
        const getState = jest.fn(() => state);
        const expected = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };

        expect(buildOptions({ getState, method, namespace })).toEqual(expected);
      });
    });
  });
});
