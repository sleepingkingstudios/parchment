import React from 'react';
import { shallow } from 'enzyme';

import CreateActionPage from './page';
import endpoint from '../../store/createActionForm';

describe('CreateActionPage', () => {
  const defaultProps = {};

  it('should render the create page', () => {
    const rendered = shallow(<CreateActionPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('CreatePage');
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Action' });
  });

  it('should render the form', () => {
    const rendered = shallow(<CreateActionPage {...defaultProps} />);
    const form = rendered.renderProp('Form')({
      data: {},
      errors: {},
      onChangeAction: () => {},
      onSubmitAction: () => {},
      status: '',
    });
    const baseUrl = '/mechanics/actions';

    expect(form).toHaveDisplayName('MechanicForm');
    expect(form).toHaveProp({ baseUrl });
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
