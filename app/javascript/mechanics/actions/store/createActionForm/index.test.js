import {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} from './index';
import { mechanicDefaultAttributes } from '../../../entities';

describe('CreateActionForm store', () => {
  describe('actions', () => {
    const { UPDATE_FORM_FIELD } = actions;

    describe('UPDATE_FORM_FIELD', () => {
      it('should define the namespaced action', () => {
        expect(UPDATE_FORM_FIELD).toEqual('mechanics/actions/createActionForm/updateFormField');
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
    it('should equal mechanics/actions/createActionForm', () => {
      expect(namespace).toEqual('mechanics/actions/createActionForm');
    });
  });

  describe('reducer', () => {
    describe('initial state', () => {
      it('should set the data to an empty action', () => {
        const action = { type: 'test/unknownAction' };
        const initialState = reducer(undefined, action);
        const { data } = initialState;
        const expected = Object.assign({}, mechanicDefaultAttributes, { type: 'Mechanics::Action' });

        expect(data).toEqual({ mechanic: expected });
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
      it('should be the action create URL', () => {
        expect(url).toEqual('/api/mechanics/actions');
      });
    });
  });
});
