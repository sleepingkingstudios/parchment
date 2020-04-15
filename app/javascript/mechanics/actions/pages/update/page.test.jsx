import React from 'react';
import { shallow } from 'enzyme';

import { MechanicForm } from '../../../components/form';
import UpdateActionPage from './page';
import findEndpoint, { hooks } from '../../store/updateFindAction';
import formEndpoint from '../../store/updateActionForm';

jest.mock('../../store/updateFindAction');

hooks.useEndpoint.mockImplementation(() => () => ({}));

describe('<UpdateActionPage />', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the update page', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateActionPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('UpdatePage');
    expect(rendered).toHaveProp({ Form: MechanicForm });
    expect(rendered).toHaveProp({ findEndpoint });
    expect(rendered).toHaveProp({ formEndpoint });
    expect(rendered).toHaveProp({ match });
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
      },
      {
        label: 'Update',
        active: true,
      },
    ];
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateActionPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should map the data', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateActionPage {...defaultProps} />);
    const mapData = rendered.prop('mapData');
    const action = { id };
    const data = { action };

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
        },
        {
          label: 'Update',
          active: true,
        },
      ];
      const action = { id, name: 'Self-Destruct' };
      const state = { data: { action } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<UpdateActionPage {...defaultProps} />);

      expect(rendered).toHaveProp({ breadcrumbs });
    });
  });
});
