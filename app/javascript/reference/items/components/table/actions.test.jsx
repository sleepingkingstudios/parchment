import React from 'react';
import { shallow } from 'enzyme';

import ItemsTableActions from './actions';
import deleteEndpoint from '../../store/deleteItem';

describe('<ItemsTableActions />', () => {
  const defaultProps = { id: '00000000-0000-0000-0000-000000000000' };
  const { id } = defaultProps;

  it('should render the responsive actions', () => {
    const rendered = shallow(<ItemsTableActions {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ResponsiveActions');
    expect(rendered).toHaveProp({ baseUrl: '/reference/items' });
    expect(rendered).toHaveProp({ deleteEndpoint });
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp({ resourceName: 'item' });
  });

  describe('with onDelete: function', () => {
    const onDelete = jest.fn();

    it('should render the responsive actions', () => {
      const rendered = shallow(<ItemsTableActions {...defaultProps} onDelete={onDelete} />);

      expect(rendered).toHaveDisplayName('ResponsiveActions');
      expect(rendered).toHaveProp({ baseUrl: '/reference/items' });
      expect(rendered).toHaveProp({ deleteEndpoint });
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ onDelete });
      expect(rendered).toHaveProp({ resourceName: 'item' });
    });
  });
});
