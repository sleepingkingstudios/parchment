import React from 'react';
import { shallow } from 'enzyme';

import Alert from './index';

import { capitalize } from '../../utils/string';

describe('<Alert />', () => {
  const defaultProps = {
    message:
      'This is a test of the Emergency Broadcast System. This is only a test.',
  };

  it('should wrap the contents in a div', () => {
    const rendered = shallow(<Alert {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('alert');
    expect(rendered).toHaveClassName('alert-primary');
  });

  it('should render the message', () => {
    const rendered = shallow(<Alert {...defaultProps} />);
    const alertStyle = 'primary';
    const { message } = defaultProps;

    expect(rendered).toContainReact(
      <strong>{ `${capitalize(alertStyle)}:` }</strong>,
    );
    expect(rendered).toIncludeText(message);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<Alert {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with alertStyle: danger', () => {
    const props = { ...defaultProps, alertStyle: 'danger' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle, message } = props;

      expect(rendered).toContainReact(
        <strong>{ `${capitalize(alertStyle)}:` }</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: dark', () => {
    const props = { ...defaultProps, alertStyle: 'dark' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle, message } = props;

      expect(rendered).toContainReact(
        <strong>{ `${capitalize(alertStyle)}:` }</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: info', () => {
    const props = { ...defaultProps, alertStyle: 'info' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle, message } = props;

      expect(rendered).toContainReact(
        <strong>{ `${capitalize(alertStyle)}:` }</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: light', () => {
    const props = { ...defaultProps, alertStyle: 'light' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle, message } = props;

      expect(rendered).toContainReact(
        <strong>{ `${capitalize(alertStyle)}:` }</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: primary', () => {
    const props = { ...defaultProps, alertStyle: 'primary' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle, message } = props;

      expect(rendered).toContainReact(
        <strong>{ `${capitalize(alertStyle)}:` }</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: secondary', () => {
    const props = { ...defaultProps, alertStyle: 'secondary' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle, message } = props;

      expect(rendered).toContainReact(
        <strong>{ `${capitalize(alertStyle)}:` }</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: success', () => {
    const props = { ...defaultProps, alertStyle: 'success' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle, message } = props;

      expect(rendered).toContainReact(
        <strong>{ `${capitalize(alertStyle)}:` }</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: warning', () => {
    const props = { ...defaultProps, alertStyle: 'warning' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName(`alert-${alertStyle}`);
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle, message } = props;

      expect(rendered).toContainReact(
        <strong>{ `${capitalize(alertStyle)}:` }</strong>,
      );
      expect(rendered).toIncludeText(message);
    });
  });

  describe('with alertStyle: unknown value', () => {
    const props = { ...defaultProps, alertStyle: 'enigmatic' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Alert {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('alert');
      expect(rendered).toHaveClassName('alert-primary');
    });

    it('should render the message', () => {
      const rendered = shallow(<Alert {...props} />);
      const { alertStyle, message } = props;

      expect(rendered).toContainReact(
        <strong>{ `${capitalize(alertStyle)}:` }</strong>,
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
    const props = { ...defaultProps, children };

    it('should render the children', () => {
      const rendered = shallow(<Alert {...props} />);

      expect(rendered).toContainReact(children);
      expect(rendered).not.toIncludeText('Primary:');
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<Alert {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
