import React from 'react';
import { shallow } from 'enzyme';

import SpellsTableActions from './actions';

describe('<SpellsTableActions />', () => {
  const props = { id: '00000000-0000-0000-0000-000000000000' };
  const rendered = shallow(<SpellsTableActions {...props} />);

  it('should set the class name', () => {
    expect(rendered).toHaveClassName('spell-actions');
  });

  it('should render the action links', () => {
    const expected = [
      {
        label: 'Show',
        url: `/spells/${props.id}`,
      },
      {
        label: 'Update',
        url: `/spells/${props.id}/update`,
      },
    ];
    const links = rendered.find('Link');

    links.forEach((link, index) => {
      expect(link).toHaveProp('to', expected[index].url);
      expect(link).toHaveProp('children', expected[index].label);
    });
  });
});
