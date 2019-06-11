import React from 'react';
import { shallow } from 'enzyme';

import Alert from './index';

describe('<Alert />', () => {
  const defaultAlert = {
    id: '00000000-0000-0000-0000-000000000000',
    dismissible: false,
    message:
      'This is a test of the Emergency Broadcast System. This is only a test.',
  };
  const defaultProps = { alert: defaultAlert, dismissAlert: jest.fn() };

  it('should wrap the contents in a div', () => {
    const rendered = shallow(<Alert {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('alert');
    expect(rendered).toHaveClassName('alert-primary');
  });

  it('should render the message', () => {
    const rendered = shallow(<Alert {...defaultProps} />);
    const { message } = defaultAlert;

    expect(rendered).toContainReact(
      <strong>Notice:</strong>,
    );
    expect(rendered).toIncludeText(message);
  });

  it('should not render a dismiss button', () => {
    const rendered = shallow(<Alert {...defaultProps} />);

    expect(rendered).not.toContainMatchingElement('AlertDismissButton');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<Alert {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with alertStyle: danger', () => {
    const alert = { ...defaultAlert, alertStyle: 'danger' };
    const props = { ...defaultProps, alert };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = alert;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { message } = alert;

      expect(rendered).toContainReact(
        <strong>Danger:</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: dark', () => {
    const alert = { ...defaultAlert, alertStyle: 'dark' };
    const props = { ...defaultProps, alert };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = alert;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { message } = alert;

      expect(rendered).toContainReact(
        <strong>Notice:</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: info', () => {
    const alert = { ...defaultAlert, alertStyle: 'info' };
    const props = { ...defaultProps, alert };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = alert;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { message } = alert;

      expect(rendered).toContainReact(
        <strong>Info:</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: light', () => {
    const alert = { ...defaultAlert, alertStyle: 'light' };
    const props = { ...defaultProps, alert };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = alert;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { message } = alert;

      expect(rendered).toContainReact(
        <strong>Notice:</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: primary', () => {
    const alert = { ...defaultAlert, alertStyle: 'primary' };
    const props = { ...defaultProps, alert };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = alert;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { message } = alert;

      expect(rendered).toContainReact(
        <strong>Notice:</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: secondary', () => {
    const alert = { ...defaultAlert, alertStyle: 'secondary' };
    const props = { ...defaultProps, alert };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = alert;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { message } = alert;

      expect(rendered).toContainReact(
        <strong>Notice:</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: success', () => {
    const alert = { ...defaultAlert, alertStyle: 'success' };
    const props = { ...defaultProps, alert };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = alert;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { message } = alert;

      expect(rendered).toContainReact(
        <strong>Success:</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: warning', () => {
    const alert = { ...defaultAlert, alertStyle: 'warning' };
    const props = { ...defaultProps, alert };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = alert;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { message } = alert;

      expect(rendered).toContainReact(
        <strong>Warning:</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: unknown value', () => {
    const alert = { ...defaultAlert, alertStyle: 'enigmatic' };
    const props = { ...defaultProps, alert };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName('alert-primary');
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { message } = alert;

      expect(rendered).toContainReact(
        <strong>Notice:</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with className: value', () => {
    const props = { ...defaultProps, className: 'custom-alert' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { className } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName('alert-primary');
      expect(rendered).toHaveClassName(className);
    });
  });

  describe('with children: value', () => {
    const children = (
      <dl>
        <dt>What lies beyond the furthest reaches of the sky?</dt>
        <dd>
          {
            "That which will lead the lost child back to her mother's arms. "
            + 'Exile.'
          }
        </dd>
      </dl>
    );
    const alert = {
      id: '00000000-0000-0000-0000-000000000000',
      children,
    };
    const props = { ...defaultProps, alert };

    it('should render the children', () => {
      const rendered = shallow(<Alert {...props} />);

      expect(rendered).toContainReact(children);
      expect(rendered).not.toIncludeText('Notice:');
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<Alert {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with dismissible: true', () => {
    const alert = { ...defaultAlert, dismissible: true };
    const props = { ...defaultProps, alert };

    it('should render a dismiss button', () => {
      const rendered = shallow(<Alert {...props} />);
      const button = rendered.find('AlertDismissButton');
      const { id } = alert;
      const { dismissAlert } = props;

      expect(button).toExist();
      expect(button).toHaveProp({ id });
      expect(button).toHaveProp({ dismissAlert });
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<Alert {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
