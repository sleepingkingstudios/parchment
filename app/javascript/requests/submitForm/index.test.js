import generateInitialState from './initialState';
import generateFormRequest from './index';

describe('Form request', () => {
  const namespace = 'createWidget';
  const url = '/api/widgets';
  const defaultOptions = { namespace, url };

  describe('generateFormRequest', () => {
    it('should be a function', () => {
      expect(typeof generateFormRequest).toEqual('function');
    });
  });

  describe('with default options', () => {
    const initialState = generateInitialState({ data: {}, namespace });
    const {
      actions,
      apiActions,
      reducer,
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

    describe('apiActions', () => {
      const {
        REQUEST_URL,
        requestSubmitForm,
      } = apiActions;

      describe('REQUEST_URL', () => {
        it('should be the configured url', () => {
          expect(REQUEST_URL).toEqual(url);
        });
      });

      describe('requestSubmitForm', () => {
        it('should be a function', () => {
          expect(typeof requestSubmitForm).toEqual('function');
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
});
