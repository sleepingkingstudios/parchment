import React from 'react';
import { shallow } from 'enzyme';

import ShowActionPage from './page';
import { MechanicBlock } from '../../../components/block';
import endpoint, { hooks } from '../../store/showFindAction';

jest.mock('../../store/showFindAction');

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
        url: `/mechanics/actions}/${id}`,
        active: true,
      },
    ];
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowActionPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
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
          url: `/mechanics/actions}/${id}`,
          active: true,
        },
      ];
      const action = { id, name: 'Self-Destruct' };
      const state = { data: { action } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowActionPage {...defaultProps} />);

      expect(rendered).toHaveProp({ breadcrumbs });
    });
  });
});
