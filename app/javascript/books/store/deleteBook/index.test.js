import {
  hooks,
  namespace,
  request,
} from './index';

describe('DeleteBook store', () => {
  describe('hooks', () => {
    const { useDeleteData } = hooks;

    describe('useDeleteData()', () => {
      it('should be a function', () => {
        expect(typeof useDeleteData).toEqual('function');
      });
    });
  });

  describe('namespace', () => {
    it('should be books/deleteBook', () => {
      expect(namespace).toEqual('books/deleteBook');
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
      it('should be the book delete URL', () => {
        expect(url).toEqual('/api/books/:id');
      });
    });
  });
});
