import React from 'react';
import { shallow } from 'enzyme';

import UpdateItemPage from './page';
import findEndpoint, { hooks } from '../../store/updateFindItem';
import formEndpoint from '../../store/updateItemForm';

jest.mock('../../store/updateFindItem');

hooks.useEndpoint.mockImplementation(() => () => ({}));

describe('<UpdateItemPage />', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the update page', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateItemPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('UpdatePage');
    expect(rendered).toHaveProp({ findEndpoint });
    expect(rendered).toHaveProp({ formEndpoint });
    expect(rendered).toHaveProp({ match });
    expect(rendered).toHaveProp({ resourceName: 'Item' });
  });

  it('should render the form', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateItemPage {...defaultProps} />);
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

  it('should render the breadcrumbs', () => {
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
        label: 'Loading...',
        url: `/reference/items/${id}`,
      },
      {
        label: 'Update',
        active: true,
      },
    ];
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateItemPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should map the data', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateItemPage {...defaultProps} />);
    const mapData = rendered.prop('mapData');
    const item = { id };
    const data = { item };

    expect(typeof mapData).toEqual('function');
    expect(mapData(data)).toEqual(data);
  });

  describe('when the resource is loaded', () => {
    it('should render the breadcrumbs', () => {
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
          label: 'Big Red Button',
          url: `/reference/items/${id}`,
        },
        {
          label: 'Update',
          active: true,
        },
      ];
      const item = { id, name: 'Big Red Button' };
      const state = { data: { item } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<UpdateItemPage {...defaultProps} />);

      expect(rendered).toHaveProp({ breadcrumbs });
    });
  });
});
