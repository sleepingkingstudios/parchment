import ApiEndpoint from './index';
import ApiRequest from './request';

describe('ApiEndpoint', () => {
  const initialState = { data: {} };
  const generatedActions = {
    requestFailure: () => {},
    requestPending: () => {},
    requestSuccess: () => {},
  };
  const generatedReducer = () => {};
  const defaultOptions = {
    generateActions: () => generatedActions,
    generateInitialState: () => initialState,
    generateReducer: () => generatedReducer,
    generateRequest: opts => (new ApiRequest(opts)),
    method: 'GET',
    namespace: 'api/endpoint',
    url: '/path/to/endpoint',
  };

  describe('with default options', () => {
    const options = { ...defaultOptions };
    const endpoint = new ApiEndpoint(options);
    const {
      actions,
      namespace,
      reducer,
      request,
    } = endpoint;

    describe('actions', () => {
      it('should call generateActions() with the namespace', () => {
        const generateActions = jest.fn(() => generatedActions);

        /* eslint-disable-next-line no-new */
        new ApiEndpoint({ ...options, generateActions });

        expect(generateActions).toHaveBeenCalledWith({ namespace });
      });

      it('should generate the actions', () => {
        expect(actions).toEqual(generatedActions);
      });
    });

    describe('namespace', () => {
      it('should return the namespace', () => {
        expect(namespace).toEqual(options.namespace);
      });
    });

    describe('reducer', () => {
      it('should call generateInitialState()', () => {
        const generateInitialState = jest.fn(() => initialState);

        /* eslint-disable-next-line no-new */
        new ApiEndpoint({ ...options, generateInitialState });

        expect(generateInitialState).toHaveBeenCalledWith({ data: {} });
      });

      it('should call generateReducer() with the actions and initial state', () => {
        const generateReducer = jest.fn(() => generatedActions);

        /* eslint-disable-next-line no-new */
        new ApiEndpoint({ ...options, generateReducer });

        expect(generateReducer).toHaveBeenCalledWith({
          actions: generatedActions,
          initialState,
        });
      });

      it('should generate the reducer', () => {
        expect(reducer).toEqual(generatedReducer);
      });
    });

    describe('request', () => {
      it('should call generateRequest() with the options', () => {
        const generateRequest = jest.fn(opts => (new ApiRequest(opts)));

        /* eslint-disable-next-line no-new */
        new ApiEndpoint({ ...options, generateRequest });

        expect(generateRequest).toHaveBeenCalledWith({
          actions: generatedActions,
          method: options.method,
          namespace,
          url: options.url,
        });
      });

      it('should instantiate the request', () => {
        expect(request).toBeInstanceOf(ApiRequest);
      });

      it('should set the request method', () => {
        expect(request.method).toEqual(options.method);
      });

      it('should set the request url', () => {
        expect(request.url).toEqual(options.url);
      });
    });
  });

  describe('with data: value', () => {
    const data = { key: 'value' };
    const options = { ...defaultOptions, data };

    describe('reducer', () => {
      it('should call generateInitialState() with the data', () => {
        const generatedInitialState = { data };
        const generateInitialState = jest.fn(() => generatedInitialState);

        /* eslint-disable-next-line no-new */
        new ApiEndpoint({ ...options, generateInitialState });

        expect(generateInitialState).toHaveBeenCalledWith({ data });
      });

      it('should call generateReducer() with the actions and initial state', () => {
        const generatedInitialState = { data };
        const generateInitialState = jest.fn(() => generatedInitialState);
        const generateReducer = jest.fn(() => generatedActions);

        /* eslint-disable-next-line no-new */
        new ApiEndpoint({ ...options, generateInitialState, generateReducer });

        expect(generateReducer).toHaveBeenCalledWith({
          actions: generatedActions,
          initialState: generatedInitialState,
        });
      });
    });
  });

  describe('with method: POST', () => {
    const options = { ...defaultOptions, method: 'POST' };
    const endpoint = new ApiEndpoint(options);
    const {
      namespace,
      request,
    } = endpoint;

    describe('request', () => {
      it('should call generateRequest() with the options', () => {
        const generateRequest = jest.fn(opts => (new ApiRequest(opts)));

        /* eslint-disable-next-line no-new */
        new ApiEndpoint({ ...options, generateRequest });

        expect(generateRequest).toHaveBeenCalledWith({
          actions: generatedActions,
          method: options.method,
          namespace,
          url: options.url,
        });
      });

      it('should instantiate the request', () => {
        expect(request).toBeInstanceOf(ApiRequest);
      });

      it('should set the request method', () => {
        expect(request.method).toEqual(options.method);
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
    const endpoint = new ApiEndpoint(options);
    const {
      reducer,
      request,
    } = endpoint;

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