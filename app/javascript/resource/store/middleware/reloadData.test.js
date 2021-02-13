import reloadData from './reloadData';

describe('resource store middleware reloadData', () => {
  const performRequestInner = jest.fn();
  const performRequest = jest.fn(() => performRequestInner);
  const middleware = reloadData({ performRequest });

  describe('handleSuccess', () => {
    const { handleSuccess } = middleware;
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { ok: true };

    it('should be a function', () => {
      expect(typeof handleSuccess).toEqual('function');
    });

    it('should return a function', () => {
      const next = jest.fn();

      expect(typeof handleSuccess(next)).toEqual('function');
    });

    it('should call the next function', () => {
      const next = jest.fn();

      handleSuccess(next)({ dispatch, getState, response });

      expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
    });

    it('should perform the request', () => {
      const next = jest.fn();

      handleSuccess(next)({ dispatch, getState, response });

      expect(performRequestInner).toHaveBeenCalledWith(dispatch, getState);
    });
  });

  describe('options', () => {
    const { options } = middleware;

    it('should return the configured options', () => {
      expect(options).toEqual({ performRequest });
    });
  });

  describe('type', () => {
    const { type } = middleware;

    it('should be resource/store/middleware/reloadData', () => {
      expect(type).toEqual('resource/store/middleware/reloadData');
    });
  });
});
