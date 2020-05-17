import alerts from './alerts';
import { addAlert } from '../../../alerts/store/actions';
import { generateFingerprintUuid } from '../../../utils/uuid';

describe('UpdateBookForm store alerts', () => {
  const {
    handleFailure,
    handleSuccess,
  } = alerts;

  describe('handleFailure()', () => {
    const getState = jest.fn();
    const response = { ok: false, json: {} };

    it('should be a function', () => {
      expect(typeof handleFailure).toEqual('function');
    });

    it('should return a function', () => {
      const next = jest.fn();

      expect(typeof handleFailure(next)).toEqual('function');
    });

    it('should call the next function', () => {
      const next = jest.fn();
      const dispatch = jest.fn();

      handleFailure(next)({ dispatch, getState, response });

      expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
    });

    it('should dispatch an addAlert action', () => {
      const next = jest.fn();
      const dispatch = jest.fn();
      const alert = {
        id: generateFingerprintUuid('books/update'),
        alertStyle: 'warning',
        dismissible: true,
        message: 'Unable to update book.',
      };
      const expected = addAlert(alert);

      handleFailure(next)({ dispatch, getState, response });

      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });

  describe('handleSuccess()', () => {
    const getState = jest.fn();
    const response = { ok: false, json: {} };

    it('should be a function', () => {
      expect(typeof handleSuccess).toEqual('function');
    });

    it('should return a function', () => {
      const next = jest.fn();

      expect(typeof handleSuccess(next)).toEqual('function');
    });

    it('should call the next function', () => {
      const next = jest.fn();
      const dispatch = jest.fn();

      handleSuccess(next)({ dispatch, getState, response });

      expect(next).toHaveBeenCalledWith({ dispatch, getState, response });
    });

    it('should dispatch an addAlert action', () => {
      const next = jest.fn();
      const dispatch = jest.fn();
      const alert = {
        id: generateFingerprintUuid('books/update'),
        alertStyle: 'success',
        dismissible: true,
        message: 'Successfully updated book.',
      };
      const expected = addAlert(alert);

      handleSuccess(next)({ dispatch, getState, response });

      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
