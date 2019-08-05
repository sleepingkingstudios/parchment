import {
  actions,
  reducer,
  request,
} from './index';
import { spellDefaultAttributes } from '../../entities';

describe('Create Spell store', () => {
  describe('actions', () => {
    const { UPDATE_FORM_FIELD } = actions;

    describe('UPDATE_FORM_FIELD', () => {
      it('should define the namespaced action', () => {
        expect(UPDATE_FORM_FIELD).toEqual('createSpell/updateFormField');
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
