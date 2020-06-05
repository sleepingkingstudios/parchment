import React from 'react';
import { shallow } from 'enzyme';

import ShowActionPage from './page';
import { MechanicBlock } from '../../../components/block';
import endpoint, { hooks } from '../../store/showFindAction';
import deleteEndpoint, { hooks as deleteHooks } from '../../store/deleteAction';

jest.mock('../../store/deleteAction');

jest.mock('../../store/showFindAction');

deleteHooks.useDeleteData.mockImplementation(() => ({}));

hooks.useEndpoint.mockImplementation(() => () => ({}));

describe('ShowActionPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the show page', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowActionPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ShowPage');
    expect(rendered).toHaveProp({ Block: MechanicBlock });
    expect(rendered).toHaveProp({ deleteEndpoint });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Action' });
  });

  it('should render the breadcrumbs', () => {
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
        label: 'Loading...',
        url: `/mechanics/actions/${id}`,
        active: true,
      },
    ];
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowActionPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the buttons', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowActionPage {...defaultProps} />);

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
          label: 'Mechanics',
          url: '/mechanics',
          active: true,
        },
        {
          label: 'Actions',
          url: '/mechanics/actions',
        },
        {
          label: 'Self-Destruct',
          url: `/mechanics/actions/${id}`,
          active: true,
        },
      ];
      const action = { id, name: 'Self-Destruct' };
      const state = { data: { action } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowActionPage {...defaultProps} />);

      expect(rendered).toHaveProp({ breadcrumbs });
    });

    it('should render the buttons', () => {
      const deleteData = jest.fn();
      const useDeleteData = jest.fn(() => deleteData);
      const buttons = [
        {
          label: 'Update Action',
          outline: true,
          url: `/mechanics/actions/${id}/update`,
        },
        {
          label: 'Delete Action',
          buttonStyle: 'danger',
          outline: true,
          onClick: deleteData,
        },
      ];
      const action = { id, name: 'Self-Destruct' };
      const state = { data: { action } };

      deleteHooks.useDeleteData.mockImplementationOnce(useDeleteData);

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowActionPage {...defaultProps} />);

      expect(rendered).toHaveProp({ buttons });

      expect(useDeleteData).toHaveBeenCalledWith({ wildcards: { id } });
    });
  });
});
