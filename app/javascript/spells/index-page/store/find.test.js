import { INITIALIZED } from 'api/status';
import {
  shouldGenerateTheActions,
} from 'api/client/testHelpers';
import client, {
  actions,
  hooks,
  reducer,
} from './find';

describe('Spells index find client', () => {
  const {
    method,
    middleware,
    namespace,
    url,
  } = client;

  describe('actions', () => {
    shouldGenerateTheActions({
      actions,
      namespace,
    });
  });

  describe('hooks', () => {
    const {
      usePerformRequest,
      useStatus,
    } = hooks;

    describe('usePerformRequest', () => {
      it('should be a function', () => {
        expect(typeof usePerformRequest).toEqual('function');
      });
    });

    describe('useStatus', () => {
      it('should be a function', () => {
        expect(typeof useStatus).toEqual('function');
      });
    });
  });

  describe('method', () => {
    it('should be GET', () => {
      expect(method).toEqual('GET');
    });
  });

  describe('middleware', () => {
    describe('alerts', () => {
      const alerts = middleware[1];

      it('should have type api/alerts', () => {
        expect(alerts.type).toEqual('api/alerts');
      });

      it('should be configured with options', () => {
        const { options } = alerts;
        const expected = {
          action: 'find',
          failure: true,
          resourceName: 'spells',
        };

        expect(options).toEqual(expected);
      });
    });

    describe('authorization', () => {
      const authorization = middleware[0];

      it('should have type api/authorization', () => {
        expect(authorization.type).toEqual('api/authorization');
      });
    });

    describe('collectAssociations', () => {
      const collectAssociations = middleware[2];

      it('should have type api/alerts', () => {
        expect(collectAssociations.type).toEqual('api/collectAssociations');
      });

      it('should be configured with options', () => {
        const { options } = collectAssociations;
        const expected = {
          associationName: 'source',
          associationType: 'hasOne',
          inverseName: 'reference',
          polymorphic: true,
          resourceName: 'spells',
        };

        expect(options).toEqual(expected);
      });
    });
  });

  describe('namespace', () => {
    it('should be spells/index/find', () => {
      expect(namespace).toEqual('spells/index/find');
    });
  });

  describe('reducer', () => {
    const initialState = {
      data: {},
      errors: {},
      status: INITIALIZED,
    };

    it('should be a function', () => {
      expect(typeof reducer).toEqual('function');
    });

    it('should set the initial state', () => {
      const action = { type: 'test/action' };
      const state = reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('url', () => {
    it('should be api/spells', () => {
      expect(url).toEqual('api/spells');
    });
  });
});
