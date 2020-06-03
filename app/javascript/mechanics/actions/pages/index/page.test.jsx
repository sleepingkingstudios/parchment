import React from 'react';
import { shallow } from 'enzyme';

import IndexActionsPage from './page';
import DynamicTable from '../../../../components/dynamic-table';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindActions';

describe('<IndexActionsPage />', () => {
  const defaultProps = {};

  it('should render the index page', () => {
    const rendered = shallow(<IndexActionsPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('IndexPage');
    expect(rendered).toHaveProp({ Table: DynamicTable });
    expect(rendered).toHaveProp({ columns });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Action' });
  });

  it('should set the breadcrumbs', () => {
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Mechanics',
        url: 'mechanics/',
        active: true,
      },
      {
        label: 'Actions',
        url: 'mechanics/actions',
        active: true,
      },
    ];
    const rendered = shallow(<IndexActionsPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should set the buttons', () => {
    const buttons = [
      {
        label: 'Create Action',
        outline: true,
        url: '/mechanics/actions/create',
      },
    ];
    const rendered = shallow(<IndexActionsPage {...defaultProps} />);

    expect(rendered).toHaveProp({ buttons });
  });
});
