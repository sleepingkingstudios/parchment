import Logging from './logging';

describe('Logging request middleware', () => {
  const logger = jest.fn();
  const namespace = 'test';
  const defaultOptions = { logger, namespace };

  afterEach(() => logger.mockClear());

  describe('with default options', () => {
    const middleware = new Logging(defaultOptions);

    describe('handleAction()', () => {
      const level = 'INFO';
      const next = jest.fn();
      const { handleAction } = middleware;
      const state = { key: 'value' };

      it('should be a function()', () => {
        expect(typeof handleAction).toEqual('function');
      });

      it('should return a function()', () => {
        expect(typeof handleAction(next)).toEqual('function');
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
  });

  describe('with level: value', () => {
    const level = 'ERROR';
    const options = { ...defaultOptions, level };
    const middleware = new Logging(options);

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
  });
});
