import {
  hooks,
  namespace,
  request,
} from './index';

describe('DeleteAction store', () => {
  describe('hooks', () => {
    const { useDeleteData } = hooks;

    describe('useDeleteData()', () => {
      it('should be a function', () => {
        expect(typeof useDeleteData).toEqual('function');
      });
    });
  });

  describe('namespace', () => {
    it('should be mechanics/actions/deleteAction', () => {
      expect(namespace).toEqual('mechanics/actions/deleteAction');
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
      it('should be the action delete URL', () => {
        expect(url).toEqual('/api/mechanics/actions/:id');
      });
    });
  });
});
