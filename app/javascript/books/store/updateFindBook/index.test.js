import {
  hooks,
  namespace,
  request,
} from './index';

describe('UpdateFindBook store', () => {
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
    it('should equal books/updateFindBook', () => {
      expect(namespace).toEqual('books/updateFindBook');
    });
  });

  describe('request', () => {
    const { url } = request;

    describe('url', () => {
      it('should be the book show URL', () => {
        expect(url).toEqual('/api/books/:id');
      });
    });
  });
});
