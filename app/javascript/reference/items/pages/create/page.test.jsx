import React from 'react';
import { shallow } from 'enzyme';

import CreateItemPage from './page';
import endpoint from '../../store/createItemForm';

describe('<CreateConditionPage />', () => {
  const defaultProps = {};

  it('should render the create page', () => {
    const rendered = shallow(<CreateItemPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('CreatePage');
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Item' });
  });

  it('should render the form', () => {
    const rendered = shallow(<CreateItemPage {...defaultProps} />);
    const form = rendered.renderProp('Form')({
      data: {},
      errors: {},
      onChangeAction: () => {},
      onSubmitAction: () => {},
      status: '',
    });
    const baseUrl = '/reference/items';

    expect(form).toHaveDisplayName('ItemForm');
    expect(form).toHaveProp({ baseUrl });
  });

  it('should set the breadcrumbs', () => {
    const rendered = shallow(<CreateItemPage {...defaultProps} />);
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Reference',
        url: '/reference',
        active: true,
      },
      {
        label: 'Items',
        url: '/reference/items',
      },
      {
        label: 'Create',
        url: '/reference/items/create',
        active: true,
      },
    ];

    expect(rendered).toHaveProp({ breadcrumbs });
  });
});
