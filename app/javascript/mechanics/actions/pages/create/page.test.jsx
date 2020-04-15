import React from 'react';
import { shallow } from 'enzyme';

import { MechanicForm } from '../../../components/form';
import CreateActionPage from './page';
import endpoint from '../../store/createActionForm';

describe('CreateActionPage', () => {
  const defaultProps = {};

  it('should render the create page', () => {
    const rendered = shallow(<CreateActionPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('CreatePage');
    expect(rendered).toHaveProp({ Form: MechanicForm });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Action' });
  });

  it('should set the breadcrumbs', () => {
    const rendered = shallow(<CreateActionPage {...defaultProps} />);
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Mechanics',
        url: '/mechanics',
        active: true,
      },
      {
        label: 'Actions',
        url: '/mechanics/actions',
      },
      {
        label: 'Create',
        url: '/mechanics/actions/create',
        active: true,
      },
    ];

    expect(rendered).toHaveProp({ breadcrumbs });
  });
});
