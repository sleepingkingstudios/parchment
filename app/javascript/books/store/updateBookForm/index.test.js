import {
  actions,
  hooks,
  reducer,
  request,
} from './index';
import { bookDefaultAttributes } from '../../entities';

describe('UpdateBookForm store', () => {
  describe('actions', () => {
    const {
      SET_FORM_DATA,
      UPDATE_FORM_FIELD,
    } = actions;

    describe('SET_FORM_DATA', () => {
      it('should define the namespaced action', () => {
        expect(SET_FORM_DATA).toEqual('books/updateBookForm/setFormData');
      });
    });

    describe('UPDATE_FORM_FIELD', () => {
      it('should define the namespaced action', () => {
        expect(UPDATE_FORM_FIELD).toEqual('books/updateBookForm/updateFormField');
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
      it('should be PATCH', () => {
        expect(method).toEqual('PATCH');
      });
    });

    describe('url', () => {
      it('should be the book create URL', () => {
        expect(url).toEqual('/api/books/:id');
      });
    });
  });
});
