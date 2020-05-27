import React from 'react';
import { shallow } from 'enzyme';

import SpellsTableActions from './actions';
import deleteEndpoint from '../../store/deleteSpell';

describe('<SpellsTableActions />', () => {
  const defaultProps = { id: '00000000-0000-0000-0000-000000000000' };
  const { id } = defaultProps;

  it('should render the responsive actions', () => {
    const rendered = shallow(<SpellsTableActions {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ResponsiveActions');
    expect(rendered).toHaveProp({ deleteEndpoint });
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp({ resourceName: 'spell' });
  });

  describe('with onDelete: function', () => {
    const onDelete = jest.fn();

    it('should render the responsive actions', () => {
      const rendered = shallow(<SpellsTableActions {...defaultProps} onDelete={onDelete} />);

      expect(rendered).toHaveDisplayName('ResponsiveActions');
      expect(rendered).toHaveProp({ deleteEndpoint });
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ onDelete });
      expect(rendered).toHaveProp({ resourceName: 'spell' });
    });
  });
});
