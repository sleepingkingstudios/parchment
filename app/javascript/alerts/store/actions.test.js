import {
  ADD_ALERT,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
  addAlert,
  dismissAlert,
  dismissAllAlerts,
} from './actions';

describe('Alerts actions', () => {
  describe('ADD_ALERT', () => {
    it('should define the action', () => {
      expect(ADD_ALERT).toEqual('alerts/addAlert');
    });
  });

  describe('DISMISS_ALERT', () => {
    it('should define the action', () => {
      expect(DISMISS_ALERT).toEqual('alerts/dismissAlert');
    });
  });

  describe('DISMISS_ALL_ALERTS', () => {
    it('should define the action', () => {
      expect(DISMISS_ALL_ALERTS).toEqual('alerts/dismissAllAlerts');
    });
  });

  describe('addAlert', () => {
    it('should be a function', () => {
      expect(typeof addAlert).toEqual('function');
    });

    it('should create the action', () => {
      const alert = {
        id: '00000000-0000-0000-0000-000000000000',
        message: 'Greetings, programs!',
      };
      const action = addAlert(alert);

      expect(action).toEqual({
        type: ADD_ALERT,
        payload: { alert },
      });
    });
  });

  describe('dismissAlert', () => {
    it('should be a function', () => {
      expect(typeof dismissAlert).toEqual('function');
    });

    it('should create the action', () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const action = dismissAlert(id);

      expect(action).toEqual({
        type: DISMISS_ALERT,
        payload: { id },
      });
    });
  });

  describe('dismissAllAlerts', () => {
    it('should be a function', () => {
      expect(typeof dismissAllAlerts).toEqual('function');
    });

    it('should create the action', () => {
      const action = dismissAllAlerts();

      expect(action).toEqual({
        type: DISMISS_ALL_ALERTS,
      });
    });
  });
});
