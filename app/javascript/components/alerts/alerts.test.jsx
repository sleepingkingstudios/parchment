import React from 'react';
import { shallow } from 'enzyme';

import Alerts from './alerts';

describe('<Alerts />', () => {
  const alertsData = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      message: 'Alert with Message',
    },
    {
      id: '00000000-0000-0000-0000-000000000001',
      alertStyle: 'danger',
      message: 'Alert with Style',
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      children: (
        <strong>Alert with Children</strong>
      ),
    },
  ];
  const defaultProps = { alerts: alertsData };

  it('should render each alert', () => {
    const rendered = shallow(<Alerts {...defaultProps} />);
    const alerts = rendered.find('Alert');

    expect(alerts.length).toEqual(alertsData.length);

    alerts.forEach((alert, index) => {
      const data = alertsData[index];

      expect(alert).toHaveDisplayName('Alert');
      expect(alert).toHaveProp('alert', data);
    });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<Alerts {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
