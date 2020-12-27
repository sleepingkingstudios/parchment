import React from 'react';
import { shallow } from 'enzyme';

import IndexItemsPage from './page';
import DynamicTable from '../../../../components/dynamic-table';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindItems';

describe('<IndexItemsPage />', () => {
  const defaultProps = {};

  it('should render the index page', () => {
    const rendered = shallow(<IndexItemsPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('IndexPage');
    expect(rendered).toHaveProp({ Table: DynamicTable });
    expect(rendered).toHaveProp({ columns });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Item' });
  });

  it('should set the breadcrumbs', () => {
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Reference',
        url: 'reference/',
        active: true,
      },
      {
        label: 'Items',
        url: 'reference/items',
        active: true,
      },
    ];
    const rendered = shallow(<IndexItemsPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should set the buttons', () => {
    const buttons = [
      {
        label: 'Create Item',
        outline: true,
        url: '/reference/items/create',
      },
    ];
    const rendered = shallow(<IndexItemsPage {...defaultProps} />);

    expect(rendered).toHaveProp({ buttons });
  });
});
