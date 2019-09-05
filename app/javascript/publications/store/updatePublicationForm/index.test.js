import {
  actions,
  hooks,
  reducer,
  request,
} from './index';
import { publicationDefaultAttributes } from '../../entities';

describe('UpdatePublicationForm store', () => {
  describe('actions', () => {
    const {
      SET_DATA,
      UPDATE_FORM_FIELD,
    } = actions;

    describe('SET_DATA', () => {
      it('should define the namespaced action', () => {
        expect(SET_DATA).toEqual('publications/updatePublicationForm/setData');
      });
    });

    describe('UPDATE_FORM_FIELD', () => {
      it('should define the namespaced action', () => {
        expect(UPDATE_FORM_FIELD).toEqual(
          'publications/updatePublicationForm/updateFormField',
        );
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
      it('should set the data to an empty publication', () => {
        const action = { type: 'test/unknownAction' };
        const initialState = reducer(undefined, action);
        const { data } = initialState;

        expect(data).toEqual({ publication: publicationDefaultAttributes });
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
      it('should be the publication create URL', () => {
        expect(url).toEqual('/api/publications/:id');
      });
    });
  });
});
