import {
  actions,
  hooks,
  reducer,
  request,
} from './index';
import { mechanicDefaultAttributes } from '../../../entities';

const actionDefaultAttributes = Object.assign(
  {},
  mechanicDefaultAttributes,
  { type: 'Mechanics::Action' },
);
describe('UpdateActionForm store', () => {
  describe('actions', () => {
    const {
      SET_FORM_DATA,
      UPDATE_FORM_FIELD,
    } = actions;

    describe('SET_FORM_DATA', () => {
      it('should define the namespaced action', () => {
        expect(SET_FORM_DATA).toEqual('mechanics/actions/updateActionForm/setFormData');
      });
    });

    describe('UPDATE_FORM_FIELD', () => {
      it('should define the namespaced action', () => {
        expect(UPDATE_FORM_FIELD).toEqual('mechanics/actions/updateActionForm/updateFormField');
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
      it('should set the data to an empty action', () => {
        const action = { type: 'test/unknownAction' };
        const initialState = reducer(undefined, action);
        const { data } = initialState;

        expect(data).toEqual({ mechanic: actionDefaultAttributes });
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
      it('should be the action create URL', () => {
        expect(url).toEqual('/api/mechanics/actions/:id');
      });
    });
  });
});
