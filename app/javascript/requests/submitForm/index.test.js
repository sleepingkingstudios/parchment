import generateInitialState from './initialState';
import generateFormRequest from './index';

describe('Form request', () => {
  const namespace = 'createWidget';
  const requestUrl = '/api/widgets';
  const defaultOptions = { namespace, url: requestUrl };

  describe('generateFormRequest', () => {
    it('should be a function', () => {
      expect(typeof generateFormRequest).toEqual('function');
    });
  });

  describe('with default options', () => {
    const initialState = generateInitialState({ data: {}, namespace });
    const {
      actions,
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
    const initialState = generateInitialState({ data, namespace });
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
        calledMiddleware.push(label);

        next(state, action);
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

        expect(calledMiddleware).toEqual(['A', 'B', 'C']);
      });
    });
  });
});
