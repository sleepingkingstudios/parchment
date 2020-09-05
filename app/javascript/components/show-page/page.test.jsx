import React from 'react';
import { shallow } from 'enzyme';

import ShowPage from './page';
import { valueOrDefault } from '../../utils/object';

const buildEndpoint = ({ requestData, state }) => ({
  hooks: {
    useEndpoint: () => state,
    useRequestData: () => valueOrDefault(requestData, () => {}),
  },
});

describe('<ShowPage />', () => {
  const Block = () => {};
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const resourceName = 'Widget';
  const defaultProps = {
    Block,
    match,
    resourceName,
  };
  const emptyBreadcrumbs = [
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
      active: true,
    },
  ];

  it('should wrap the contents in a Page', () => {
    const endpoint = buildEndpoint({ state: { data: {} } });
    const rendered = shallow(<ShowPage {...defaultProps} endpoint={endpoint} />);

    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-show-widget');
    expect(rendered).toHaveProp('breadcrumbs', emptyBreadcrumbs);
  });

  it('should render the heading', () => {
    const endpoint = buildEndpoint({ state: { data: {} } });
    const rendered = shallow(<ShowPage {...defaultProps} endpoint={endpoint} />);
    const heading = rendered.find('ShowPageHeading');

    expect(heading).toExist();
    expect(heading).toHaveProp({ id });
    expect(heading).toHaveProp({ resource: null });
    expect(heading).toHaveProp({ resourceName });
  });

  it('should render the block', () => {
    const endpoint = buildEndpoint({ state: { data: {} } });
    const rendered = shallow(<ShowPage {...defaultProps} endpoint={endpoint} />);
    const block = rendered.find('ShowPageBlock');

    expect(block).toExist();
    expect(block).toHaveProp({ Block });
    expect(block).toHaveProp({ endpoint });
    expect(block).toHaveProp({ mapData: null });
    expect(block).toHaveProp({ resourceName });
  });

  it('should find the book by id', () => {
    const performRequest = jest.fn();
    const useRequestData = jest.fn(() => performRequest);
    const endpoint = buildEndpoint({ state: { data: {} } });

    endpoint.hooks.useRequestData = useRequestData;

    shallow(<ShowPage {...defaultProps} endpoint={endpoint} />);

    expect(useRequestData).toHaveBeenCalledWith(
      { wildcards: { id } },
      [{ id }],
    );
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const endpoint = buildEndpoint({ state: { data: {} } });
    const rendered = shallow(<ShowPage {...defaultProps} endpoint={endpoint} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('when the resource is loaded', () => {
    const widget = { name: 'Gadget' };
    const state = { data: { widget } };
    const expectedBreadcrumbs = [
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
        active: true,
      },
    ];

    it('should wrap the contents in a Page', () => {
      const endpoint = buildEndpoint({ state });
      const rendered = shallow(<ShowPage {...defaultProps} endpoint={endpoint} />);

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-show-widget');
      expect(rendered).toHaveProp('breadcrumbs', expectedBreadcrumbs);
    });

    it('should render the heading', () => {
      const endpoint = buildEndpoint({ state });
      const rendered = shallow(<ShowPage {...defaultProps} endpoint={endpoint} />);
      const heading = rendered.find('ShowPageHeading');

      expect(heading).toExist();
      expect(heading).toHaveProp({ id });
      expect(heading).toHaveProp({ resource: widget });
      expect(heading).toHaveProp({ resourceName });
    });

    it('should render the block', () => {
      const endpoint = buildEndpoint({ state });
      const rendered = shallow(<ShowPage {...defaultProps} endpoint={endpoint} />);
      const block = rendered.find('ShowPageBlock');

      expect(block).toExist();
      expect(block).toHaveProp({ Block });
      expect(block).toHaveProp({ endpoint });
      expect(block).toHaveProp({ mapData: null });
      expect(block).toHaveProp({ resourceName });
    });

    it('should match the snapshot', () => {
      const endpoint = buildEndpoint({ state });
      const rendered = shallow(<ShowPage {...defaultProps} endpoint={endpoint} />);

      expect(rendered).toMatchSnapshot();
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
      const endpoint = buildEndpoint({ state: { data: {} } });
      const rendered = shallow(
        <ShowPage {...defaultProps} endpoint={endpoint} breadcrumbs={breadcrumbs} />,
      );

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-show-widget');
      expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
    });
  });

  describe('with buttons: array', () => {
    const buttons = [
      {
        buttonStyle: 'danger',
        label: 'Do Not Push',
        onClick: () => {},
      },
    ];

    it('should render the heading', () => {
      const endpoint = buildEndpoint({ state: { data: {} } });
      const rendered = shallow(
        <ShowPage {...defaultProps} buttons={buttons} endpoint={endpoint} />,
      );
      const heading = rendered.find('ShowPageHeading');

      expect(heading).toExist();
      expect(heading).toHaveProp({ buttons });
      expect(heading).toHaveProp({ id });
      expect(heading).toHaveProp({ resource: null });
      expect(heading).toHaveProp({ resourceName });
    });
  });

  describe('with deleteEndpoint: endpoint', () => {
    const deleteEndpoint = { hooks: { useDeleteData: () => {} } };

    it('should render the heading', () => {
      const endpoint = buildEndpoint({ state: { data: {} } });
      const rendered = shallow(
        <ShowPage {...defaultProps} endpoint={endpoint} deleteEndpoint={deleteEndpoint} />,
      );
      const heading = rendered.find('ShowPageHeading');

      expect(heading).toExist();
      expect(heading).toHaveProp({ deleteEndpoint });
      expect(heading).toHaveProp({ id });
      expect(heading).toHaveProp({ resource: null });
      expect(heading).toHaveProp({ resourceName });
    });
  });

  describe('with mapData: function', () => {
    const widget = { name: 'Gadget' };
    const state = { data: { resource: widget } };
    const mapData = data => data.resource;
    const expectedBreadcrumbs = [
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
        active: true,
      },
    ];

    it('should wrap the contents in a Page', () => {
      const endpoint = buildEndpoint({ state });
      const rendered = shallow(
        <ShowPage {...defaultProps} endpoint={endpoint} mapData={mapData} />,
      );

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-show-widget');
      expect(rendered).toHaveProp('breadcrumbs', expectedBreadcrumbs);
    });

    it('should render the heading', () => {
      const endpoint = buildEndpoint({ state });
      const rendered = shallow(
        <ShowPage {...defaultProps} endpoint={endpoint} mapData={mapData} />,
      );
      const heading = rendered.find('ShowPageHeading');

      expect(heading).toExist();
      expect(heading).toHaveProp({ id });
      expect(heading).toHaveProp({ resource: widget });
      expect(heading).toHaveProp({ resourceName });
    });
  });

  describe('with resourceNameProp: value', () => {
    const resourceNameProp = 'title';
    const widget = { title: 'Gadget' };
    const state = { data: { widget } };
    const expectedBreadcrumbs = [
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
        active: true,
      },
    ];

    it('should wrap the contents in a Page', () => {
      const endpoint = buildEndpoint({ state });
      const rendered = shallow(
        <ShowPage {...defaultProps} endpoint={endpoint} resourceNameProp={resourceNameProp} />,
      );

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-show-widget');
      expect(rendered).toHaveProp('breadcrumbs', expectedBreadcrumbs);
    });
  });
});
