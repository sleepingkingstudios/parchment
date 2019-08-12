import generateInitialState from './initialState';
import generateFormRequest from './index';

describe('Form request', () => {
  const requestUrl = '/api/widgets';
  const defaultOptions = { namespace: 'createWidget', url: requestUrl };

  describe('generateFormRequest', () => {
    it('should be a function', () => {
      expect(typeof generateFormRequest).toEqual('function');
    });
  });

  describe('with default options', () => {
    const initialState = generateInitialState({ data: {} });
    const {
      actions,
      namespace,
      reducer,
      request,
    } = generateFormRequest(defaultOptions);

    describe('actions', () => {
      const {
        updateFormField,
      } = actions;

      describe('updateFormField', () => {
        it('should be a function', () => {
          expect(typeof updateFormField).toEqual('function');
        });
      });
    });

    describe('namespace', () => {
      it('should return the namespace', () => {
        expect(namespace).toEqual('createWidget');
      });
    });

    describe('reducer', () => {
      it('should be a function', () => {
        expect(typeof reducer).toEqual('function');
      });

      describe('initial state', () => {
        it('should set the initial state', () => {
          const action = { type: 'test/unknownAction' };

          expect(reducer(undefined, action)).toEqual(initialState);
        });
      });
    });

    describe('request', () => {
      const {
        performRequest,
        url,
      } = request;

      describe('performRequest', () => {
        it('should be a function', () => {
          expect(typeof performRequest).toEqual('function');
        });
      });

      describe('url', () => {
        it('should be the configured url', () => {
          expect(url).toEqual(requestUrl);
        });
      });
    });
  });

  describe('with data: value', () => {
    const data = {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Westley',
    };
    const initialState = generateInitialState({ data });
    const options = { ...defaultOptions, data };
    const {
      reducer,
    } = generateFormRequest(options);

    describe('reducer', () => {
      describe('initial state', () => {
        it('should set the initial state', () => {
          const action = { type: 'test/unknownAction' };

          expect(reducer(undefined, action)).toEqual(initialState);
        });
      });
    });
  });

  describe('with middleware: array', () => {
    const calledMiddleware = [];
    const generateMiddleware = label => ({
      handleAction: next => (state, action) => {
        calledMiddleware.push(`action ${label}`);

        next(state, action);
      },
      handleFailure: next => ({ dispatch, getState, response }) => {
        calledMiddleware.push(`failure ${label}`);

        next({ dispatch, getState, response });
      },
      handleSuccess: next => ({ dispatch, getState, response }) => {
        calledMiddleware.push(`success ${label}`);

        next({ dispatch, getState, response });
      },
    });
    const middleware = [
      generateMiddleware('A'),
      generateMiddleware('B'),
      generateMiddleware('C'),
    ];
    const options = { ...defaultOptions, middleware };
    const {
      reducer,
      request,
    } = generateFormRequest(options);

    afterEach(() => calledMiddleware.splice(0, calledMiddleware.length));

    describe('reducer', () => {
      const state = { key: 'value' };
      const action = { type: 'test/exampleAction' };

      it('should be a function', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should call the middleware', () => {
        reducer(state, action);

        expect(calledMiddleware).toEqual(['action A', 'action B', 'action C']);
      });
    });

    describe('request', () => {
      const {
        handleFailure,
        handleSuccess,
      } = request;

      describe('handleFailure()', () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const response = { ok: false, json: {} };

        it('should be a function', () => {
          expect(typeof handleFailure).toEqual('function');
        });

        it('should call the middleware', () => {
          handleFailure({ dispatch, getState, response });

          expect(calledMiddleware).toEqual(['failure A', 'failure B', 'failure C']);
        });
      });

      describe('handleSuccess()', () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const response = { ok: false, json: {} };

        it('should be a function', () => {
          expect(typeof handleSuccess).toEqual('function');
        });

        it('should call the middleware', () => {
          handleSuccess({ dispatch, getState, response });

          expect(calledMiddleware).toEqual(['success A', 'success B', 'success C']);
        });
      });
    });
  });
});
