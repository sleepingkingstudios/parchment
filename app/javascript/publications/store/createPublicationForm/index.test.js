import {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} from './index';
import { publicationDefaultAttributes } from '../../entities';

describe('CreatePublicationForm store', () => {
  describe('actions', () => {
    const { UPDATE_FORM_FIELD } = actions;

    describe('UPDATE_FORM_FIELD', () => {
      it('should define the namespaced action', () => {
        expect(UPDATE_FORM_FIELD).toEqual(
          'publications/createPublicationForm/updateFormField',
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

  describe('namespace', () => {
    it('should equal publications/createPublicationForm', () => {
      expect(namespace).toEqual('publications/createPublicationForm');
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
      it('should be POST', () => {
        expect(method).toEqual('POST');
      });
    });

    describe('url', () => {
      it('should be the publication create URL', () => {
        expect(url).toEqual('/api/publications');
      });
    });
  });
});
