import React from 'react';
import { shallow } from 'enzyme';

import ShowItemPage from './page';
import { ItemBlock } from '../../components/block';
import endpoint, { hooks } from '../../store/showFindItem';
import deleteEndpoint, { hooks as deleteHooks } from '../../store/deleteItem';

jest.mock('../../store/deleteItem');

jest.mock('../../store/showFindItem');

deleteHooks.useDeleteData.mockImplementation(() => ({}));

hooks.useEndpoint.mockImplementation(() => () => ({}));

describe('<ShowItemPage />', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the show page', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowItemPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ShowPage');
    expect(rendered).toHaveProp({ Block: ItemBlock });
    expect(rendered).toHaveProp({ deleteEndpoint });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Item' });
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
        active: true,
      },
    ];
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowItemPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the buttons', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowItemPage {...defaultProps} />);

    expect(rendered).toHaveProp({ buttons: [] });
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
          active: true,
        },
      ];
      const item = { id, name: 'Big Red Button' };
      const state = { data: { item } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowItemPage {...defaultProps} />);

      expect(rendered).toHaveProp({ breadcrumbs });
    });

    it('should render the buttons', () => {
      const deleteData = jest.fn();
      const useDeleteData = jest.fn(() => deleteData);
      const buttons = [
        {
          label: 'Update Item',
          outline: true,
          url: `/reference/items/${id}/update`,
        },
        {
          label: 'Delete Item',
          buttonStyle: 'danger',
          outline: true,
          onClick: deleteData,
        },
      ];
      const item = { id, name: 'Big Red Button' };
      const state = { data: { item } };

      deleteHooks.useDeleteData.mockImplementationOnce(useDeleteData);

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowItemPage {...defaultProps} />);

      expect(rendered).toHaveProp({ buttons });

      expect(useDeleteData).toHaveBeenCalledWith({ wildcards: { id } });
    });
  });
});
