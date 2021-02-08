import { FAILURE } from 'api/status';
import buildFormStore from 'resource/store/form';
import buildStore from './index';
import buildSubmitClient from './submit';

jest.mock('resource/store/form');
jest.mock('./submit');

const submitClient = {
  actions: { REQUEST_FAILURE: 'test/requestFailure' },
  hooks: {},
  reducer: () => ({
    data: { widget: {} },
    errors: {},
    status: FAILURE,
  }),
};
const formStore = buildFormStore();

buildSubmitClient.mockImplementation(() => submitClient);

describe('resource create-page buildStore()', () => {
  const namespace = 'path/to/widgets';
  const resourceName = 'widgets';
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
        namespace: `${namespace}/form`,
        submitActions: submitClient.actions,
      });
    });

    describe('hooks', () => {
      const { hooks } = store;
      const {
        useForm,
        useSubmitRequest,
        useSubmitStatus,
        useUpdateForm,
      } = hooks;

      describe('useForm', () => {
        it('should wrap formStore.hooks.useForm', () => {
          expect(useForm).toEqual(formStore.hooks.useForm);
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

      it('should be resource/create-page/store', () => {
        expect(type).toEqual('resource/create-page/store');
      });
    });
  });
});
