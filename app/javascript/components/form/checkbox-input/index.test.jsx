import React from 'react';
import { shallow } from 'enzyme';

import FormCheckboxInput from './index';

describe('<FormCheckboxInput />', () => {
  const id = 'property-name-input';
  const onChange = jest.fn();
  const labelText = 'Property Name';
  const defaultProps = {
    id,
    label: labelText,
    onChange,
    value: false,
  };

  it('should wrap the checkbox in a div', () => {
    const rendered = shallow(<FormCheckboxInput {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('custom-checkbox');
    expect(rendered).toHaveClassName('custom-control');
  });

  it('should render the label', () => {
    const rendered = shallow(<FormCheckboxInput {...defaultProps} />);
    const label = rendered.find('label');

    expect(label).toExist();
    expect(label).toHaveClassName('custom-control-label');
    expect(label).toHaveProp('htmlFor', id);
    expect(label).toHaveText(labelText);
  });

  it('should render the checkbox', () => {
    const rendered = shallow(<FormCheckboxInput {...defaultProps} />);
    const checkbox = rendered.find('input');

    expect(checkbox).toExist();
    expect(checkbox).toHaveClassName('custom-control-input');
    expect(checkbox).toHaveProp('id', id);
    expect(checkbox).toHaveProp('checked', false);
    expect(checkbox).toHaveProp('onChange', onChange);
    expect(checkbox).toHaveProp('type', 'checkbox');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<FormCheckboxInput {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('when the checkbox is checked', () => {
    const props = { ...defaultProps, value: true };

    it('should render the checkbox', () => {
      const rendered = shallow(<FormCheckboxInput {...props} />);
      const checkbox = rendered.find('input');

      expect(checkbox).toExist();
      expect(checkbox).toHaveClassName('custom-control-input');
      expect(checkbox).toHaveProp('id', id);
      expect(checkbox).toHaveProp('checked', true);
      expect(checkbox).toHaveProp('onChange', onChange);
      expect(checkbox).toHaveProp('type', 'checkbox');
    });
  });

  describe('with label: false', () => {
    const props = { ...defaultProps, label: false };

    it('should not render the label', () => {
      const rendered = shallow(<FormCheckboxInput {...props} />);
      const label = rendered.find('label');

      expect(label).not.toExist();
    });

    it('should render the checkbox', () => {
      const rendered = shallow(<FormCheckboxInput {...props} />);
      const checkbox = rendered.find('input');

      expect(checkbox).toExist();
      expect(checkbox).toHaveClassName('custom-control-input');
      expect(checkbox).toHaveProp('id', id);
      expect(checkbox).toHaveProp('checked', false);
      expect(checkbox).toHaveProp('onChange', onChange);
      expect(checkbox).toHaveProp('type', 'checkbox');
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<FormCheckboxInput {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
