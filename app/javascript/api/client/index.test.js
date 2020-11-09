import generateInitialState from './initialState';
import buildClient from './index';
import {
  shouldGenerateTheEndpointActions,
  shouldGenerateTheSelector,
} from './testHelpers';
import { isEmpty } from '../../utils/object';

const exampleReducer = jest.fn(state => state);
const generateReducer = jest.fn(() => exampleReducer);
const namespace = 'path/to/widgets';
const url = 'api/v1/widgets';
const defaultOptions = {
  generateReducer,
  namespace,
  url,
};

describe('buildClient()', () => {
  describe('with default options', () => {
    const client = buildClient(defaultOptions);

    describe('actions', () => {
      const { actions } = client;

      shouldGenerateTheEndpointActions({ actions, namespace });
    });

    describe('hooks', () => {
      const { hooks } = client;

      it('should be empty', () => {
        expect(isEmpty(hooks)).toEqual(true);
      });
    });

    describe('namespace', () => {
      it('should return the namespace', () => {
        expect(client.namespace).toEqual(namespace);
      });
    });

    describe('reducer', () => {
      const { reducer } = client;

      it('should define the reducer', () => {
        expect(reducer).toEqual(exampleReducer);
      });

      it('should call generateReducer', () => {
        const initialState = generateInitialState();

        generateReducer.mockClear();

        const { actions } = buildClient(defaultOptions);

        expect(generateReducer).toHaveBeenCalledWith({ actions, initialState });
      });
    });

    describe('request', () => {
      const { request } = client;

      describe('method', () => {
        it('should return GET', () => {
          expect(request.method).toEqual('GET');
        });
      });

      describe('middleware', () => {
        it('should return an empty array', () => {
          expect(request.middleware).toEqual([]);
        });
      });

      describe('namespace', () => {
        it('should return the namespace', () => {
          expect(request.namespace).toEqual(namespace);
        });
      });

      describe('performRequest', () => {
        it('should return a function', () => {
          expect(typeof request.performRequest).toEqual('function');
        });
      });

      describe('url', () => {
        it('should return the url', () => {
          expect(request.url).toEqual(url);
        });
      });
    });

    describe('selector', () => {
      const { selector } = client;

      shouldGenerateTheSelector({ namespace, selector });
    });
  });

  describe('with data: value', () => {
    const data = { name: '' };
    const client = buildClient({ ...defaultOptions, data });

    describe('reducer', () => {
      const { reducer } = client;

      it('should define the reducer', () => {
        expect(reducer).toEqual(exampleReducer);
      });

      it('should pass the data to generateReducer', () => {
        const initialState = generateInitialState({ data });

        generateReducer.mockClear();

        const { actions } = buildClient({ ...defaultOptions, data });

        expect(generateReducer).toHaveBeenCalledWith({ actions, initialState });
      });
    });
  });

  describe('with generateActions: function', () => {
    const actions = {
      DO_SOMETHING: 'doSomething',
      doSomething: () => {},
    };
    const generateActions = jest.fn(() => actions);
    const client = buildClient({ ...defaultOptions, generateActions });

    describe('actions', () => {
      it('should return the actions', () => {
        expect(client.actions).toEqual(actions);
      });

      it('should call generateActions', () => {
        generateActions.mockClear();

        buildClient({ ...defaultOptions, generateActions });

        expect(generateActions).toHaveBeenCalledWith({ namespace });
      });
    });
  });

  describe('with generateHooks: function', () => {
    const hooks = { useHook: () => {} };
    const generateHooks = jest.fn(() => hooks);
    const client = buildClient({ ...defaultOptions, generateHooks });

    describe('hooks', () => {
      it('should return the hooks', () => {
        expect(client.hooks).toEqual(hooks);
      });

      it('should call generateHooks', () => {
        const { actions } = client;
        const {
          REQUEST_FAILURE,
          REQUEST_PENDING,
          REQUEST_SUCCESS,
        } = actions;

        expect.hasAssertions();

        const customHooks = jest.fn((opts) => {
          expect(opts.actions.REQUEST_FAILURE).toEqual(REQUEST_FAILURE);
          expect(opts.actions.REQUEST_PENDING).toEqual(REQUEST_PENDING);
          expect(opts.actions.REQUEST_SUCCESS).toEqual(REQUEST_SUCCESS);

          expect(typeof opts.actions.requestFailure).toEqual('function');
          expect(opts.actions.requestFailure.name).toEqual('requestFailure');

          expect(typeof opts.actions.requestPending).toEqual('function');
          expect(opts.actions.requestPending.name).toEqual('requestPending');

          expect(typeof opts.actions.requestSuccess).toEqual('function');
          expect(opts.actions.requestSuccess.name).toEqual('requestSuccess');

          expect(typeof opts.performRequest).toEqual('function');
          expect(opts.performRequest.name).toEqual('performRequest');

          expect(typeof opts.selector).toEqual('function');
          expect(opts.selector.name).toEqual('selector');

          return hooks;
        });

        buildClient({ ...defaultOptions, generateHooks: customHooks });
      });
    });
  });

  describe('with method: value', () => {
    const method = 'POST';
    const client = buildClient({ ...defaultOptions, method });

    describe('request', () => {
      const { request } = client;

      it('should return the method', () => {
        expect(request.method).toEqual(method);
      });
    });
  });

  describe('with middleware: array', () => {
    const genericMiddleware = next => opts => next(opts);
    const reducerInner = jest.fn();
    const reducerMiddleware = jest.fn(label => next => (state, action) => {
      reducerInner(state, action, label);

      next(state, action);
    });
    const middleware = [
      {
        buildRequest: genericMiddleware,
      },
      {
        handleAction: reducerMiddleware('B'),
      },
      {
        handleFailure: genericMiddleware,
      },
      {
        handlePending: genericMiddleware,
      },
      {
        handleSuccess: genericMiddleware,
      },
      {
        buildRequest: genericMiddleware,
        handleAction: reducerMiddleware('F'),
        handleFailure: genericMiddleware,
        handlePending: genericMiddleware,
        handleSuccess: genericMiddleware,
      },
    ];
    const client = buildClient({ ...defaultOptions, middleware });

    describe('reducer', () => {
      const { reducer } = client;

      it('should define the reducer', () => {
        expect(typeof reducer).toEqual('function');
      });

      it('should call generateReducer', () => {
        const initialState = generateInitialState();

        generateReducer.mockClear();

        const { actions } = buildClient(defaultOptions);

        expect(generateReducer).toHaveBeenCalledWith({ actions, initialState });
      });

      it('should call the generated reducer', () => {
        const state = { key: 'value' };
        const action = { type: 'actionType' };

        reducer(state, action);

        expect(exampleReducer).toHaveBeenCalledWith(state, action);
      });

      it('should call the handleAction middleware', () => {
        const state = { key: 'value' };
        const action = { type: 'actionType' };

        reducer(state, action);

        expect(reducerInner).toHaveBeenCalledWith(state, action, 'B');
        expect(reducerInner).toHaveBeenCalledWith(state, action, 'F');
      });
    });

    describe('request', () => {
      const { request } = client;

      describe('middleware', () => {
        it('should return the configured middleware', () => {
          expect(request.middleware).toEqual(middleware);
        });
      });
    });
  });

  describe('with selector: function', () => {
    const selector = data => data;
    const client = buildClient({ ...defaultOptions, selector });

    describe('selector', () => {
      it('should return the selector', () => {
        expect(client.selector).toEqual(selector);
      });
    });
  });
});
