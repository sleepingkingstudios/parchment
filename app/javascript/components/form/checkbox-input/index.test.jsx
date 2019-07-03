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
    expect(rendered).not.toHaveClassName('custom-checkbox-validated');
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
    expect(checkbox).toHaveProp({ id });
    expect(checkbox).toHaveProp('checked', false);
    expect(checkbox).toHaveProp({ onChange });
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

  describe('with className: value', () => {
    const props = { ...defaultProps, className: 'example-class' };

    it('should render the checkbox', () => {
      const rendered = shallow(<FormCheckboxInput {...props} />);
      const checkbox = rendered.find('input');
      const { className } = props;

      expect(checkbox).toExist();
      expect(checkbox).toHaveClassName('custom-control-input');
      expect(checkbox).toHaveClassName(className);
      expect(checkbox).toHaveProp({ id });
      expect(checkbox).toHaveProp('checked', false);
      expect(checkbox).toHaveProp({ onChange });
      expect(checkbox).toHaveProp('type', 'checkbox');
    });

    describe('with validStatus: value', () => {
      it('should render the checkbox', () => {
        const rendered = shallow(<FormCheckboxInput {...props} validStatus="invalid" />);
        const checkbox = rendered.find('input');
        const { className } = props;

        expect(checkbox).toExist();
        expect(checkbox).toHaveClassName('custom-control-input');
        expect(checkbox).toHaveClassName(className);
        expect(checkbox).toHaveClassName('is-invalid');
        expect(checkbox).toHaveProp({ id });
        expect(checkbox).toHaveProp('checked', false);
        expect(checkbox).toHaveProp({ onChange });
        expect(checkbox).toHaveProp('type', 'checkbox');
      });
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

  describe('with validStatus: invalid', () => {
    const props = { ...defaultProps, validStatus: 'invalid' };

    it('should wrap the checkbox in a div', () => {
      const rendered = shallow(<FormCheckboxInput {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('custom-checkbox');
      expect(rendered).toHaveClassName('custom-control');
      expect(rendered).toHaveClassName('custom-checkbox-validated');
    });

    it('should render the checkbox', () => {
      const rendered = shallow(<FormCheckboxInput {...props} />);
      const checkbox = rendered.find('input');

      expect(checkbox).toExist();
      expect(checkbox).toHaveClassName('custom-control-input');
      expect(checkbox).toHaveClassName('is-invalid');
      expect(checkbox).toHaveProp({ id });
      expect(checkbox).toHaveProp('checked', false);
      expect(checkbox).toHaveProp({ onChange });
      expect(checkbox).toHaveProp('type', 'checkbox');
    });
  });

  describe('with validStatus: valid', () => {
    const props = { ...defaultProps, validStatus: 'valid' };

    it('should wrap the checkbox in a div', () => {
      const rendered = shallow(<FormCheckboxInput {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('custom-checkbox');
      expect(rendered).toHaveClassName('custom-control');
      expect(rendered).toHaveClassName('custom-checkbox-validated');
    });

    it('should render the checkbox', () => {
      const rendered = shallow(<FormCheckboxInput {...props} />);
      const checkbox = rendered.find('input');

      expect(checkbox).toExist();
      expect(checkbox).toHaveClassName('custom-control-input');
      expect(checkbox).toHaveClassName('is-valid');
      expect(checkbox).toHaveProp({ id });
      expect(checkbox).toHaveProp('checked', false);
      expect(checkbox).toHaveProp({ onChange });
      expect(checkbox).toHaveProp('type', 'checkbox');
    });
  });
});
