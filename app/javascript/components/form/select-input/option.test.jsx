import React from 'react';
import { shallow } from 'enzyme';

import FormSelectOption from './option';

describe('<FormSelectOption />', () => {
  const label = 'Label Text';
  const value = 'property_value';
  const props = { label, value };
  const rendered = shallow(<FormSelectOption {...props} />);

  it('should render a select option', () => {
    expect(rendered).toHaveDisplayName('option');
    expect(rendered).toHaveProp('value', value);
    expect(rendered).toHaveText(label);
  });
});
