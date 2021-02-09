import {
  FAILURE,
  SUCCESS,
} from 'api/status';
import buildFormStore from 'resource/store/form';
import buildFindClient from './find';
import buildStore from './index';
import buildSubmitClient from './submit';

jest.mock('resource/store/form');
jest.mock('./find');
jest.mock('./submit');

const findClient = {
  actions: { REQUEST_SUCCESS: 'test/requestSuccess' },
  hooks: {
    usePerformRequest: jest.fn(),
    useStatus: jest.fn(),
  },
  performRequest: jest.fn(),
  reducer: () => ({
    data: { widgets: [] },
    errors: {},
    status: SUCCESS,
  }),
};
const formStore = buildFormStore();
const submitClient = {
  actions: { REQUEST_FAILURE: 'test/requestFailure' },
  hooks: {
    useRequest: jest.fn(),
    useStatus: jest.fn(),
  },
  reducer: () => ({
    data: { widget: {} },
    errors: {},
    status: FAILURE,
  }),
};

buildFindClient.mockImplementation(() => findClient);
buildSubmitClient.mockImplementation(() => submitClient);

describe('resource update-page buildStore()', () => {
  const namespace = 'path/to/widgets';
  const resourceName = 'widget';
  const url = '/api/v1/widgets';
  const defaultOptions = {
    namespace,
    resourceName,
    url,
  };

  describe('with default options', () => {
    const store = buildStore(defaultOptions);

    it('should build a form store', () => {
      buildStore(defaultOptions);

      expect(buildFormStore).toHaveBeenCalledWith({
        ...defaultOptions,
        findActions: findClient.actions,
        namespace: `${namespace}/form`,
        submitActions: submitClient.actions,
      });
    });

    describe('hooks', () => {
      const { hooks } = store;
      const {
        useForm,
        useDataStatus,
        useRequestData,
        useSubmitRequest,
        useSubmitStatus,
        useUpdateForm,
      } = hooks;

      describe('useForm', () => {
        it('should wrap formStore.hooks.useForm', () => {
          expect(useForm).toEqual(formStore.hooks.useForm);
        });
      });

      describe('useDataStatus', () => {
        it('should wrap findClient.hooks.useStatus', () => {
          expect(useDataStatus).toEqual(findClient.hooks.useStatus);
        });
      });

      describe('useRequestData', () => {
        it('should wrap findClient.hooks.usePerformRequest', () => {
          expect(useRequestData).toEqual(findClient.hooks.usePerformRequest);
        });
      });

      describe('useSubmitRequest', () => {
        it('should wrap submitClient.hooks.useRequest', () => {
          expect(useSubmitRequest).toEqual(submitClient.hooks.useRequest);
        });
      });

      describe('useSubmitStatus', () => {
        it('should wrap submitClient.hooks.useStatus', () => {
          expect(useSubmitStatus).toEqual(submitClient.hooks.useStatus);
        });
      });

      describe('useUpdateForm', () => {
        it('should wrap formStore.hooks.useUpdateForm', () => {
          expect(useUpdateForm).toEqual(formStore.hooks.useUpdateForm);
        });
      });
    });

    describe('options', () => {
      it('should return the configured options', () => {
        expect(store.options).toEqual(defaultOptions);
      });
    });

    describe('reducer', () => {
      const { reducer } = store;

      it('should be a function', () => {
        expect(typeof reducer).toEqual('function');
      });

      describe('initialState', () => {
        it('should set the initial state', () => {
          const expected = {
            find: findClient.reducer(),
            form: formStore.reducer(),
            submit: submitClient.reducer(),
          };
          const action = { type: 'test/unknownAction' };

          expect(reducer(undefined, action)).toEqual(expected);
        });
      });
    });

    describe('type', () => {
      const { type } = store;

      it('should be resource/update-page/store', () => {
        expect(type).toEqual('resource/update-page/store');
      });
    });
  });
});
