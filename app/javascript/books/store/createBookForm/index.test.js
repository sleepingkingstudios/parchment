import {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} from './index';
import { bookDefaultAttributes } from '../../entities';

describe('CreateBookForm store', () => {
  describe('actions', () => {
    const { UPDATE_FORM_FIELD } = actions;

    describe('UPDATE_FORM_FIELD', () => {
      it('should define the namespaced action', () => {
        expect(UPDATE_FORM_FIELD).toEqual('books/createBookForm/updateFormField');
      });
    });
  });

  describe('hooks', () => {
    const {
      useEndpoint,
      useSubmitForm,
      useUpdateForm,
    } = hooks;

    describe('useEndpoint()', () => {
      it('should be a function', () => {
        expect(typeof useEndpoint).toEqual('function');
      });
    });

    describe('useSubmitForm()', () => {
      it('should be a function', () => {
        expect(typeof useSubmitForm).toEqual('function');
      });
    });

    describe('useUpdateForm()', () => {
      it('should be a function', () => {
        expect(typeof useUpdateForm).toEqual('function');
      });
    });
  });

  describe('namespace', () => {
    it('should equal books/createBookForm', () => {
      expect(namespace).toEqual('books/createBookForm');
    });
  });

  describe('reducer', () => {
    describe('initial state', () => {
      it('should set the data to an empty book', () => {
        const action = { type: 'test/unknownAction' };
        const initialState = reducer(undefined, action);
        const { data } = initialState;

        expect(data).toEqual({ book: bookDefaultAttributes });
      });
    });
  });

  describe('request', () => {
    const {
      method,
      url,
    } = request;

    describe('method', () => {
      it('should be POST', () => {
        expect(method).toEqual('POST');
      });
    });

    describe('url', () => {
      it('should be the book create URL', () => {
        expect(url).toEqual('/api/books');
      });
    });
  });
});
