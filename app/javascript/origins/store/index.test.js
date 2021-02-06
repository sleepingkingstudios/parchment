import buildDataStore from 'resource/store/data';
import buildClient from 'resource/store/find';
import store, { hooks, reducer } from './index';

jest.mock('resource/store/data');
jest.mock('resource/store/find');

const dataStore = buildDataStore();
const findClient = buildClient();

buildDataStore.mockImplementation(() => dataStore);
buildClient.mockImplementation(() => findClient);

describe('origins store', () => {
  const namespace = 'origins';
  const resourceName = 'origins';
  const url = '/api/origins';

  beforeEach(() => {
    buildClient.mockClear();
  });

  describe('hooks', () => {
    const {
      useData,
      useDataStatus,
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

    describe('useRequestData', () => {
      it('should wrap findClient.hooks.usePerformRequest', () => {
        expect(useRequestData).toEqual(findClient.hooks.usePerformRequest);
      });
    });
  });

  describe('options', () => {
    const { options } = store;

    it('should return the configured options', () => {
      expect(options).toEqual({
        namespace,
        resourceName,
        url,
      });
    });
  });

  describe('reducer', () => {
    it('should be a function', () => {
      expect(typeof reducer).toEqual('function');
    });

    describe('initialState', () => {
      it('should set the initial state', () => {
        const expected = {
          data: dataStore.reducer(),
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
      expect(type).toEqual('origins/store');
    });
  });
});
