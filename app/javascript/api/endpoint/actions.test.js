import generateActions from './actions';

describe('API endpoint actions', () => {
  const namespace = 'api/endpoint';
  const {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    requestFailure,
    requestPending,
    requestSuccess,
  } = generateActions({ namespace });

  describe('generateActions', () => {
    it('should be a function', () => {
      expect(typeof generateActions).toEqual('function');
    });
  });

  describe('REQUEST_FAILURE', () => {
    it('should define the namespaced action', () => {
      expect(REQUEST_FAILURE).toEqual(`${namespace}/requestFailure`);
    });
  });

  describe('REQUEST_PENDING', () => {
    it('should define the namespaced action', () => {
      expect(REQUEST_PENDING).toEqual(`${namespace}/requestPending`);
    });
  });

  describe('REQUEST_SUCCESS', () => {
    it('should define the namespaced action', () => {
      expect(REQUEST_SUCCESS).toEqual(`${namespace}/requestSuccess`);
    });
  });

  describe('requestFailure', () => {
    it('should be a function', () => {
      expect(typeof requestFailure).toEqual('function');
    });

    it('should create the action', () => {
      const errors = {
        widget: ['not_found'],
      };
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
});
