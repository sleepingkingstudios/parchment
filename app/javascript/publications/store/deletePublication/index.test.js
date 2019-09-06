import {
  hooks,
  namespace,
  request,
} from './index';

describe('UpdatePublicationForm store', () => {
  describe('hooks', () => {
    const { useDeleteData } = hooks;

    describe('useDeleteData()', () => {
      it('should be a function', () => {
        expect(typeof useDeleteData).toEqual('function');
      });
    });
  });

  describe('namespace', () => {
    it('should be publications/deletePublication', () => {
      expect(namespace).toEqual('publications/deletePublication');
    });
  });

  describe('request', () => {
    const {
      method,
      url,
    } = request;

    describe('method', () => {
      it('should be DELETE', () => {
        expect(method).toEqual('DELETE');
      });
    });

    describe('url', () => {
      it('should be the publication delete URL', () => {
        expect(url).toEqual('/api/publications/:id');
      });
    });
  });
});
