import React from 'react';
import { shallow } from 'enzyme';

import ShowConditionPage from './page';
import { MechanicBlock } from '../../../components/block';
import endpoint, { hooks } from '../../store/showFindCondition';
import deleteEndpoint, { hooks as deleteHooks } from '../../store/deleteCondition';

jest.mock('../../store/deleteCondition');

jest.mock('../../store/showFindCondition');

deleteHooks.useDeleteData.mockImplementation(() => ({}));

hooks.useEndpoint.mockImplementation(() => () => ({}));

describe('ShowConditionPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the show page', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowConditionPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ShowPage');
    expect(rendered).toHaveProp({ Block: MechanicBlock });
    expect(rendered).toHaveProp({ deleteEndpoint });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Condition' });
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
        label: 'Conditions',
        url: '/mechanics/conditions',
      },
      {
        label: 'Loading...',
        url: `/mechanics/conditions/${id}`,
        active: true,
      },
    ];
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowConditionPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the buttons', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowConditionPage {...defaultProps} />);

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
          label: 'Conditions',
          url: '/mechanics/conditions',
        },
        {
          label: 'Lethargy',
          url: `/mechanics/conditions/${id}`,
          active: true,
        },
      ];
      const condition = { id, name: 'Lethargy' };
      const state = { data: { condition } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowConditionPage {...defaultProps} />);

      expect(rendered).toHaveProp({ breadcrumbs });
    });

    it('should render the buttons', () => {
      const deleteData = jest.fn();
      const useDeleteData = jest.fn(() => deleteData);
      const buttons = [
        {
          label: 'Update Condition',
          outline: true,
          url: `/mechanics/conditions/${id}/update`,
        },
        {
          label: 'Delete Condition',
          buttonStyle: 'danger',
          outline: true,
          onClick: deleteData,
        },
      ];
      const condition = { id, name: 'Lethargy' };
      const state = { data: { condition } };

      deleteHooks.useDeleteData.mockImplementationOnce(useDeleteData);

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowConditionPage {...defaultProps} />);

      expect(rendered).toHaveProp({ buttons });

      expect(useDeleteData).toHaveBeenCalledWith({ wildcards: { id } });
    });
  });
});
