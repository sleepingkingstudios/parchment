import {
  hooks,
  namespace,
  request,
} from './index';

describe('UpdateFindAction store', () => {
  describe('hooks', () => {
    const {
      useEndpoint,
      useRequestData,
    } = hooks;

    describe('useEndpoint()', () => {
      it('should be a function', () => {
        expect(typeof useEndpoint).toEqual('function');
      });
    });

    describe('useRequestData()', () => {
      it('should be a function', () => {
        expect(typeof useRequestData).toEqual('function');
      });
    });
  });

  describe('namespace', () => {
    it('should equal mechanics/actions/updateFindAction', () => {
      expect(namespace).toEqual('mechanics/actions/updateFindAction');
    });
  });

  describe('request', () => {
    const { url } = request;

    describe('url', () => {
      it('should be the action show URL', () => {
        expect(url).toEqual('/api/mechanics/actions/:id');
      });
    });
  });
});
