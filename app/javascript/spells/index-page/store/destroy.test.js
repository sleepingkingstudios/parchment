import { INITIALIZED } from 'api/status';
import {
  shouldGenerateTheActions,
} from 'api/client/testHelpers';
import client, {
  actions,
  hooks,
  reducer,
} from './destroy';

describe('Spells index destroy client', () => {
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
      useRequest,
      useStatus,
    } = hooks;

    describe('usePerformRequest', () => {
      it('should be a function', () => {
        expect(typeof usePerformRequest).toEqual('function');
      });
    });

    describe('useRequest', () => {
      it('should be a function', () => {
        expect(typeof useRequest).toEqual('function');
      });
    });

    describe('useStatus', () => {
      it('should be a function', () => {
        expect(typeof useStatus).toEqual('function');
      });
    });
  });

  describe('method', () => {
    it('should be DELETE', () => {
      expect(method).toEqual('DELETE');
    });
  });

  describe('middleware', () => {
    it('should have 3 items', () => {
      expect(middleware.length).toEqual(3);
    });

    describe('alerts', () => {
      const alerts = middleware[1];

      it('should have type api/alerts', () => {
        expect(alerts.type).toEqual('api/alerts');
      });

      it('should be configured with options', () => {
        const { options } = alerts;
        const expected = {
          action: 'delete',
          failure: true,
          pending: true,
          resourceName: 'spell',
          success: { alertStyle: 'danger' },
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

    describe('reloadData', () => {
      const reloadData = middleware[2];

      it('should have type api/reloadData', () => {
        expect(reloadData.type).toEqual('api/reloadData');
      });
    });
  });

  describe('namespace', () => {
    it('should be spells/index/destroy', () => {
      expect(namespace).toEqual('spells/index/destroy');
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
      expect(url).toEqual('api/spells/:id');
    });
  });
});
