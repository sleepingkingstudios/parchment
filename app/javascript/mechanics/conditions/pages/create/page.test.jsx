import React from 'react';
import { shallow } from 'enzyme';

import CreateConditionPage from './page';
import endpoint from '../../store/createConditionForm';

describe('<CreateConditionPage />', () => {
  const defaultProps = {};

  it('should render the create page', () => {
    const rendered = shallow(<CreateConditionPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('CreatePage');
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Condition' });
  });

  it('should render the form', () => {
    const rendered = shallow(<CreateConditionPage {...defaultProps} />);
    const form = rendered.renderProp('Form')({
      data: {},
      errors: {},
      onChangeAction: () => {},
      onSubmitAction: () => {},
      status: '',
    });
    const baseUrl = '/mechanics/conditions';

    expect(form).toHaveDisplayName('MechanicForm');
    expect(form).toHaveProp({ baseUrl });
  });

  it('should set the breadcrumbs', () => {
    const rendered = shallow(<CreateConditionPage {...defaultProps} />);
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
        label: 'Conditions',
        url: '/mechanics/conditions',
      },
      {
        label: 'Create',
        url: '/mechanics/conditions/create',
        active: true,
      },
    ];

    expect(rendered).toHaveProp({ breadcrumbs });
  });
});
