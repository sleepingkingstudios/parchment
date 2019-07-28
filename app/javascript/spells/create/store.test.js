import {
  actions,
  apiActions,
  reducer,
} from './store';
import { spellDefaultAttributes } from '../entities';

describe('Create Spell store', () => {
  describe('actions', () => {
    const { UPDATE_FORM_FIELD } = actions;

    describe('UPDATE_FORM_FIELD', () => {
      it('should define the namespaced action', () => {
        expect(UPDATE_FORM_FIELD).toEqual('createSpell/updateFormField');
      });
    });
  });

  describe('apiActions', () => {
    const { REQUEST_URL } = apiActions;

    describe('REQUEST_URL', () => {
      it('should define the namespaced action', () => {
        expect(REQUEST_URL).toEqual('/api/spells');
      });
    });
  });

  describe('reducer', () => {
    describe('initial state', () => {
      it('should set the data to an empty spell', () => {
        const action = { type: 'test/unknownAction' };
        const initialState = reducer(undefined, action);
        const { data } = initialState;

        expect(data).toEqual(spellDefaultAttributes);
      });
    });
  });
});
