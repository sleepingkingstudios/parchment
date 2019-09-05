import {
  hooks,
  namespace,
  request,
} from './index';

describe('ShowFindPublication store', () => {
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
    it('should be publications/showFindPublication', () => {
      expect(namespace).toEqual('publications/showFindPublication');
    });
  });

  describe('request', () => {
    const {
      method,
      url,
    } = request;

    describe('method', () => {
      it('should be GET', () => {
        expect(method).toEqual('GET');
      });
    });

    describe('url', () => {
      it('should be the publication show URL', () => {
        expect(url).toEqual('/api/publications/:id');
      });
    });
  });
});