import {
  actions,
  hooks,
  reducer,
  request,
} from './index';
import { spellDefaultAttributes } from '../../entities';

describe('CreateSpellForm store', () => {
  describe('actions', () => {
    const { UPDATE_FORM_FIELD } = actions;

    describe('UPDATE_FORM_FIELD', () => {
      it('should define the namespaced action', () => {
        expect(UPDATE_FORM_FIELD).toEqual('spells/createSpellForm/updateFormField');
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
      it('should set the data to an empty spell', () => {
        const action = { type: 'test/unknownAction' };
        const initialState = reducer(undefined, action);
        const { data } = initialState;

        expect(data).toEqual({ spell: spellDefaultAttributes });
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
      it('should be the spell create URL', () => {
        expect(url).toEqual('/api/spells');
      });
    });
  });
});
