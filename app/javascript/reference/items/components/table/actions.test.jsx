import React from 'react';
import { shallow } from 'enzyme';

import ItemsTableActions from './actions';

describe('<ItemsTableActions />', () => {
  const defaultProps = { id: '00000000-0000-0000-0000-000000000000' };
  const { id } = defaultProps;

  it('should render the responsive actions', () => {
    const rendered = shallow(<ItemsTableActions {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ResponsiveActions');
    expect(rendered).toHaveProp({ actions: ['show', 'update'] });
    expect(rendered).toHaveProp({ baseUrl: '/reference/items' });
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp({ resourceName: 'item' });
  });
});
