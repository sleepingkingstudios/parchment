import React from 'react';
import { shallow } from 'enzyme';

import FormCheckboxInput from './index';

describe('<FormCheckboxInput />', () => {
  const id = 'property-name-input';
  const onChange = jest.fn();
  const labelText = 'Property Name';
  const props = {
    id,
    label: labelText,
    onChange,
    value: false,
  };
  const rendered = shallow(<FormCheckboxInput {...props} />);

  it('should wrap the checkbox in a div', () => {
    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('form-check');
  });

  it('should render the label', () => {
    const label = rendered.find('label');

    expect(label).toExist();
    expect(label).toHaveClassName('form-check-label');
    expect(label).toHaveProp('htmlFor', id);
    expect(label).toHaveText(labelText);
  });

  it('should render the checkbox', () => {
    const checkbox = rendered.find('input');

    expect(checkbox).toExist();
    expect(checkbox).toHaveClassName('form-check-input');
    expect(checkbox).toHaveProp('id', id);
    expect(checkbox).toHaveProp('checked', false);
    expect(checkbox).toHaveProp('onChange', onChange);
    expect(checkbox).toHaveProp('type', 'checkbox');
  });

  describe('when the checkbox is checked', () => {
    const checkedProps = { ...props, value: true };
    const renderedChecked = shallow(<FormCheckboxInput {...checkedProps} />);

    it('should render the checkbox', () => {
      const checkbox = renderedChecked.find('input');

      expect(checkbox).toExist();
      expect(checkbox).toHaveClassName('form-check-input');
      expect(checkbox).toHaveProp('id', id);
      expect(checkbox).toHaveProp('checked', true);
      expect(checkbox).toHaveProp('onChange', onChange);
      expect(checkbox).toHaveProp('type', 'checkbox');
    });
  });

  describe('with label: false', () => {
    const propsWithoutLabel = { ...props, label: false };
    const renderedWithoutLabel = shallow(<FormCheckboxInput {...propsWithoutLabel} />);

    it('should wrap the checkbox in a div', () => {
      expect(renderedWithoutLabel).toHaveDisplayName('div');
      expect(renderedWithoutLabel).toHaveClassName('form-check');
    });

    it('should not render the label', () => {
      const label = renderedWithoutLabel.find('label');

      expect(label).not.toExist();
    });

    it('should render the checkbox', () => {
      const checkbox = renderedWithoutLabel.find('input');

      expect(checkbox).toExist();
      expect(checkbox).toHaveClassName('form-check-input');
      expect(checkbox).toHaveProp('id', id);
      expect(checkbox).toHaveProp('checked', false);
      expect(checkbox).toHaveProp('onChange', onChange);
      expect(checkbox).toHaveProp('type', 'checkbox');
    });
  });
});
