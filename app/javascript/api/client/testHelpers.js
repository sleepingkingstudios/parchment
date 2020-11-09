/* eslint-env jest */

export const shouldGenerateTheEndpointActions = ({ actions, namespace }) => {
  const {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    requestFailure,
    requestPending,
    requestSuccess,
  } = actions;

  describe('REQUEST_FAILURE', () => {
    it('should define the action', () => {
      expect(REQUEST_FAILURE).toEqual(`${namespace}/requestFailure`);
    });
  });

  describe('REQUEST_PENDING', () => {
    it('should define the action', () => {
      expect(REQUEST_PENDING).toEqual(`${namespace}/requestPending`);
    });
  });

  describe('REQUEST_SUCCESS', () => {
    it('should define the action', () => {
      expect(REQUEST_SUCCESS).toEqual(`${namespace}/requestSuccess`);
    });
  });

  describe('requestFailure', () => {
    it('should be a function', () => {
      expect(typeof requestFailure).toEqual('function');
    });

    it('should create the action', () => {
      const errors = { widget: ['not_found'] };
      const action = requestFailure(errors);

      expect(action).toEqual({
        type: REQUEST_FAILURE,
        payload: { errors },
      });
    });
  });

  describe('requestPending', () => {
    it('should be a function', () => {
      expect(typeof requestPending).toEqual('function');
    });

    it('should create the action', () => {
      const action = requestPending();

      expect(action).toEqual({ type: REQUEST_PENDING, payload: {} });
    });
  });

  describe('requestSuccess', () => {
    it('should be a function', () => {
      expect(typeof requestSuccess).toEqual('function');
    });

    it('should create the action', () => {
      const data = {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Inigo Montoya',
      };
      const action = requestSuccess(data);

      expect(action).toEqual({
        type: REQUEST_SUCCESS,
        payload: { data },
      });
    });
  });
};

export const shouldGenerateTheSelector = ({ namespace, selector }) => {
  const generateState = (data) => {
    const segments = namespace.split('/');

    return segments.reverse().reduce((memo, key) => {
      const obj = {};

      obj[key] = memo;

      return obj;
    }, data);
  };

  it('should be a function', () => {
    expect(typeof selector).toEqual('function');
  });

  it('should select the data', () => {
    const data = { value: 'value' };
    const state = generateState(data);

    expect(selector(state)).toEqual(data);
  });
};
