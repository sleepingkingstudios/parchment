import React from 'react';
import { shallow } from 'enzyme';

import UpdatePage from './page';
import { INITIALIZED } from '../../api/status';

const buildEndpoint = ({ state, submitForm, updateForm }) => ({
  hooks: {
    useEndpoint: () => state,
    useSubmitForm: jest.fn(() => submitForm),
    useUpdateForm: jest.fn(() => updateForm),
  },
});

describe('<UpdatePage />', () => {
  const Form = () => {};
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const resourceName = 'Widget';
  const performRequest = jest.fn();
  const findEndpoint = {
    hooks: {
      useEndpoint: () => ({ status: INITIALIZED }),
      useRequestData: jest.fn(() => performRequest),
    },
  };
  const defaultProps = {
    Form,
    findEndpoint,
    formEndpoint: buildEndpoint({ state: { data: {} } }),
    match,
    resourceName,
  };

  it('should wrap the contents in a Page', () => {
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Widgets',
        url: '/widgets',
      },
      {
        label: 'Loading...',
        url: `/widgets/${id}`,
      },
      {
        label: 'Update',
        active: true,
      },
    ];
    const rendered = shallow(<UpdatePage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-update-widget');
    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the heading', () => {
    const rendered = shallow(<UpdatePage {...defaultProps} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toHaveText('Update Widget');
  });

  it('should render the form', () => {
    const rendered = shallow(<UpdatePage {...defaultProps} />);
    const form = rendered.find('UpdatePageForm');
    const { formEndpoint } = defaultProps;

    expect(form).toExist();
    expect(form).toHaveProp({ Form });
    expect(form).toHaveProp({ findEndpoint });
    expect(form).toHaveProp({ formEndpoint });
    expect(form).toHaveProp({ id });
    expect(form).toHaveProp({ mapData: null });
    expect(form).toHaveProp({ resourceName });
  });

  it('should find the resource by id', () => {
    const { hooks } = findEndpoint;
    const { useRequestData } = hooks;

    shallow(<UpdatePage {...defaultProps} />);

    expect(useRequestData).toHaveBeenCalledWith({ wildcards: { id } });
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<UpdatePage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('when the resource is loaded', () => {
    const widget = { name: 'Gadget' };
    const state = { data: { widget } };
    const formEndpoint = buildEndpoint({ state });

    it('should wrap the contents in a Page', () => {
      const rendered = shallow(<UpdatePage {...defaultProps} formEndpoint={formEndpoint} />);
      const breadcrumbs = [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Widgets',
          url: '/widgets',
        },
        {
          label: 'Gadget',
          url: `/widgets/${id}`,
        },
        {
          label: 'Update',
          active: true,
        },
      ];

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-update-widget');
      expect(rendered).toHaveProp({ breadcrumbs });
    });
  });

  describe('with breadcrumbs: array', () => {
    const breadcrumbs = [
      {
        label: 'The Void',
        url: '/dev/null',
      },
    ];

    it('should wrap the contents in a Page', () => {
      const rendered = shallow(
        <UpdatePage {...defaultProps} breadcrumbs={breadcrumbs} />,
      );

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-update-widget');
      expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
    });
  });

  describe('with mapData: function', () => {
    const widget = { name: 'Gadget' };
    const state = { data: { resource: widget } };
    const formEndpoint = buildEndpoint({ state });
    const mapData = data => data.resource;
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Widgets',
        url: '/widgets',
      },
      {
        label: 'Gadget',
        url: `/widgets/${id}`,
      },
      {
        label: 'Update',
        active: true,
      },
    ];

    it('should wrap the contents in a Page', () => {
      const rendered = shallow(
        <UpdatePage {...defaultProps} formEndpoint={formEndpoint} mapData={mapData} />,
      );

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-update-widget');
      expect(rendered).toHaveProp({ breadcrumbs });
    });
  });

  describe('with resourceNameProp: value', () => {
    const resourceNameProp = 'title';
    const widget = { title: 'Gadget' };
    const state = { data: { widget } };
    const formEndpoint = buildEndpoint({ state });
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Widgets',
        url: '/widgets',
      },
      {
        label: 'Gadget',
        url: `/widgets/${id}`,
      },
      {
        label: 'Update',
        active: true,
      },
    ];

    it('should wrap the contents in a Page', () => {
      const rendered = shallow(
        <UpdatePage
          {...defaultProps}
          formEndpoint={formEndpoint}
          resourceNameProp={resourceNameProp}
        />,
      );

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-update-widget');
      expect(rendered).toHaveProp({ breadcrumbs });
    });
  });
});
