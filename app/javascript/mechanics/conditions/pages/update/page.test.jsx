import React from 'react';
import { shallow } from 'enzyme';

import UpdateConditionPage from './page';
import findEndpoint, { hooks } from '../../store/updateFindCondition';
import formEndpoint from '../../store/updateConditionForm';

jest.mock('../../store/updateFindCondition');

hooks.useEndpoint.mockImplementation(() => () => ({}));

describe('<UpdateConditionPage />', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the update page', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateConditionPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('UpdatePage');
    expect(rendered).toHaveProp({ findEndpoint });
    expect(rendered).toHaveProp({ formEndpoint });
    expect(rendered).toHaveProp({ match });
    expect(rendered).toHaveProp({ resourceName: 'Condition' });
  });

  it('should render the form', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateConditionPage {...defaultProps} />);
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
      },
      {
        label: 'Update',
        active: true,
      },
    ];
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateConditionPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should map the data', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<UpdateConditionPage {...defaultProps} />);
    const mapData = rendered.prop('mapData');
    const condition = { id };
    const data = { condition };

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
          label: 'Conditions',
          url: '/mechanics/conditions',
        },
        {
          label: 'Lethargy',
          url: `/mechanics/conditions/${id}`,
        },
        {
          label: 'Update',
          active: true,
        },
      ];
      const condition = { id, name: 'Lethargy' };
      const state = { data: { condition } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<UpdateConditionPage {...defaultProps} />);

      expect(rendered).toHaveProp({ breadcrumbs });
    });
  });
});
