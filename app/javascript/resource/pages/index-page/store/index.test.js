import { SUCCESS } from 'api/status';
import buildDataStore from 'resource/store/data';
import buildDestroyClient from './destroy';
import buildFindClient from './find';
import buildStore from './index';

jest.mock('resource/store/data');
jest.mock('./destroy');
jest.mock('./find');

const dataStore = buildDataStore();
const destroyClient = {
  hooks: {
    useRequest: jest.fn(),
  },
  reducer: () => ({
    data: {},
    errors: {},
    status: SUCCESS,
  }),
};
const findClient = {
  actions: { REQUEST_SUCCESS: 'test/requestSuccess' },
  hooks: {
    useStatus: jest.fn(),
  },
  performRequest: jest.fn(),
  reducer: () => ({
    data: { widgets: [] },
    errors: {},
    status: SUCCESS,
  }),
};

buildDestroyClient.mockImplementation(() => destroyClient);
buildFindClient.mockImplementation(() => findClient);

describe('resource index-page buildStore()', () => {
  const namespace = 'path/to/widgets';
  const resourceName = 'widgets';
  const singularResourceName = 'widget';
  const url = '/api/v1/widgets';
  const defaultOptions = {
    namespace,
    resourceName,
    singularResourceName,
    url,
  };

  beforeEach(() => {
    buildDestroyClient.mockClear();
    buildFindClient.mockClear();
  });

  describe('with default options', () => {
    const store = buildStore(defaultOptions);

    it('should build a destroy client', () => {
      const findRequest = findClient.performRequest;

      buildStore(defaultOptions);

      expect(buildDestroyClient).toHaveBeenCalledWith({
        ...defaultOptions,
        findRequest,
        namespace: `${namespace}/destroy`,
        url: `${url}/:id`,
      });
    });

    it('should build a data store', () => {
      const { actions } = findClient;

      buildStore(defaultOptions);

      expect(buildDataStore).toHaveBeenCalledWith({
        ...defaultOptions,
        actions,
        namespace: `${namespace}/data`,
      });
    });

    it('should build a find client', () => {
      buildStore(defaultOptions);

      expect(buildFindClient).toHaveBeenCalledWith({
        ...defaultOptions,
        namespace: `${namespace}/find`,
      });
    });

    describe('hooks', () => {
      const { hooks } = store;
      const {
        useData,
        useDataStatus,
        useDestroyRequest,
        useRequestData,
      } = hooks;

      describe('useData', () => {
        it('should wrap dataStore.hooks.useData', () => {
          expect(useData).toEqual(dataStore.hooks.useData);
        });
      });

      describe('useDataStatus', () => {
        it('should wrap findClient.hooks.useStatus', () => {
          expect(useDataStatus).toEqual(findClient.hooks.useStatus);
        });
      });

      describe('useDestroyRequest', () => {
        it('should wrap destroyClient.hooks.useRequest', () => {
          expect(useDestroyRequest).toEqual(destroyClient.hooks.useRequest);
        });
      });

      describe('useRequestData', () => {
        it('should wrap findClient.hooks.usePerformRequest', () => {
          expect(useRequestData).toEqual(findClient.hooks.usePerformRequest);
        });
      });
    });

    describe('options', () => {
      const { options } = store;

      it('should return the configured options', () => {
        expect(options).toEqual(defaultOptions);
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
            data: dataStore.reducer(),
            destroy: destroyClient.reducer(),
            find: findClient.reducer(),
          };
          const action = { type: 'test/unknownAction' };

          expect(reducer(undefined, action)).toEqual(expected);
        });
      });
    });

    describe('type', () => {
      const { type } = store;

      it('should be resource/index-page/store', () => {
        expect(type).toEqual('resource/index-page/store');
      });
    });
  });
});
