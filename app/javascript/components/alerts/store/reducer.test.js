import reducer from './reducer';
import initialState from './initialState';
import {
  addAlert,
  dismissAlert,
  dismissAllAlerts,
} from './actions';

describe('Alerts reducer', () => {
  const alerts = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      message: 'First Alert',
    },
    {
      id: '00000000-0000-0000-0000-000000000001',
      message: 'Second Alert',
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      message: 'Third Alert',
    },
  ];

  describe('when ADD_ALERT is dispatched', () => {
    const alert = {
      id: '10000000-0000-0000-0000-000000000000',
      message: 'New Alert',
    };

    it('should add the alert to the alerts', () => {
      const action = addAlert(alert);
      const expected = Object.assign({}, initialState, {
        alerts: [alert],
      });

      expect(reducer(initialState, action)).toEqual(expected);
    });

    describe('when there are many alerts', () => {
      const state = { ...initialState, alerts };

      it('should add the alert to the alerts', () => {
        const action = addAlert(alert);
        const expected = Object.assign({}, state, {
          alerts: [...alerts, alert],
        });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });

  describe('when DISMISS_ALERT is dispatched', () => {
    it('should not change the state', () => {
      const id = '10000000-0000-0000-0000-000000000000';
      const action = dismissAlert(id);
      const expected = initialState;

      expect(reducer(initialState, action)).toEqual(expected);
    });

    describe('when there are many alerts', () => {
      const state = { ...initialState, alerts };

      describe('with an invalid alert id', () => {
        it('should not change the state', () => {
          const id = '10000000-0000-0000-0000-000000000000';
          const action = dismissAlert(id);
          const expected = state;

          expect(reducer(state, action)).toEqual(expected);
        });
      });

      describe('with a valid alert id', () => {
        it('should remove the alert from the alerts', () => {
          const id = '00000000-0000-0000-0000-000000000001';
          const action = dismissAlert(id);
          const remainingAlerts = [alerts[0], alerts[2]];
          const expected = Object.assign({}, state, {
            alerts: remainingAlerts,
          });

          expect(reducer(state, action)).toEqual(expected);
        });
      });
    });
  });

  describe('when DISMISS_ALL_ALERTS is dispatched', () => {
    it('should not change the state', () => {
      const action = dismissAllAlerts();
      const expected = initialState;

      expect(reducer(initialState, action)).toEqual(expected);
    });

    describe('when there are many alerts', () => {
      const state = { ...initialState, alerts };

      it('should clear the alerts', () => {
        const action = dismissAllAlerts();
        const expected = Object.assign({}, state, { alerts: [] });

        expect(reducer(state, action)).toEqual(expected);
      });
    });
  });
});
