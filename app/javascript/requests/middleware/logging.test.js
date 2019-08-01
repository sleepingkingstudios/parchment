import Logging from './logging';

describe('Logging request middleware', () => {
  const logger = jest.fn();
  const namespace = 'test';
  const defaultOptions = { logger, namespace };

  afterEach(() => logger.mockClear());

  describe('with default options', () => {
    const level = 'INFO';
    const middleware = new Logging(defaultOptions);

    describe('handleAction()', () => {
      const next = jest.fn();
      const { handleAction } = middleware;
      const state = { key: 'value' };

      it('should be a function()', () => {
        expect(typeof handleAction).toEqual('function');
      });

      it('should return a function()', () => {
        expect(typeof handleAction(next)).toEqual('function');
      });

      describe('with a non-matching action type', () => {
        const action = { type: 'other/exampleAction' };

        it('should not log the state and action', () => {
          handleAction(next)(state, action);

          expect(logger).not.toHaveBeenCalled();
        });

        it('should call the next function', () => {
          handleAction(next)(state, action);

          expect(next).toHaveBeenCalledWith(state, action);
        });
      });

      describe('with a matching action type', () => {
        const action = { type: 'test/exampleAction' };

        it('should log the state and action', () => {
          const message = 'Logging#handleAction(), state: %O, action: %O';
          const rest = [state, action];

          handleAction(next)(state, action);

          expect(logger).toHaveBeenCalledWith({ level, message, rest });
        });

        it('should call the next function', () => {
          handleAction(next)(state, action);

          expect(next).toHaveBeenCalledWith(state, action);
        });
      });
    });

    describe('handleFailure()', () => {
      const next = jest.fn();
      const { handleFailure } = middleware;
      const dispatch = jest.fn();
      const getState = jest.fn();
      const response = {
        ok: false,
        json: {},
      };

      it('should be a function()', () => {
        expect(typeof handleFailure).toEqual('function');
      });

      it('should return a function()', () => {
        expect(typeof handleFailure(next)).toEqual('function');
      });

      it('should log the response', () => {
        const message = 'Logging#handleFailure(), response: %O';
        const rest = [response];

        handleFailure(next)({ dispatch, getState, response });

        expect(logger).toHaveBeenCalledWith({ level, message, rest });
      });

      it('should call the next function', () => {
        handleFailure(next)({ dispatch, getState, response });

        expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
      });
    });

    describe('handleSuccess()', () => {
      const next = jest.fn();
      const { handleSuccess } = middleware;
      const dispatch = jest.fn();
      const getState = jest.fn();
      const response = {
        ok: false,
        json: {},
      };

      it('should be a function()', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should return a function()', () => {
        expect(typeof handleSuccess(next)).toEqual('function');
      });

      it('should log the response', () => {
        const message = 'Logging#handleSuccess(), response: %O';
        const rest = [response];

        handleSuccess(next)({ dispatch, getState, response });

        expect(logger).toHaveBeenCalledWith({ level, message, rest });
      });

      it('should call the next function', () => {
        handleSuccess(next)({ dispatch, getState, response });

        expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
      });
    });
  });

  describe('with level: value', () => {
    const level = 'ERROR';
    const options = { ...defaultOptions, level };
    const middleware = new Logging(options);

    describe('handleAction()', () => {
      const next = jest.fn();
      const { handleAction } = middleware;
      const state = { key: 'value' };

      describe('with a matching action type', () => {
        const action = { type: 'test/exampleAction' };

        it('should log the state and action', () => {
          const message = 'Logging#handleAction(), state: %O, action: %O';
          const rest = [state, action];

          handleAction(next)(state, action);

          expect(logger).toHaveBeenCalledWith({ level, message, rest });
        });
      });
    });

    describe('handleFailure()', () => {
      const next = jest.fn();
      const { handleFailure } = middleware;
      const dispatch = jest.fn();
      const getState = jest.fn();
      const response = {
        ok: false,
        json: {},
      };

      it('should log the response', () => {
        const message = 'Logging#handleFailure(), response: %O';
        const rest = [response];

        handleFailure(next)({ dispatch, getState, response });

        expect(logger).toHaveBeenCalledWith({ level, message, rest });
      });
    });

    describe('handleSuccess()', () => {
      const next = jest.fn();
      const { handleSuccess } = middleware;
      const dispatch = jest.fn();
      const getState = jest.fn();
      const response = {
        ok: false,
        json: {},
      };

      it('should log the response', () => {
        const message = 'Logging#handleSuccess(), response: %O';
        const rest = [response];

        handleSuccess(next)({ dispatch, getState, response });

        expect(logger).toHaveBeenCalledWith({ level, message, rest });
      });
    });
  });
});
