import React from 'react';
import { shallow } from 'enzyme';

import IndexPage from './page';
import { valueOrDefault } from '../../utils/object';

const buildEndpoint = ({ requestData }) => ({
  hooks: {
    useEndpoint: () => {},
    useRequestData: () => valueOrDefault(requestData, () => {}),
  },
  request: {
    performRequest: () => {},
  },
});

describe('<IndexPage />', () => {
  const expectedBreadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Widgets',
      url: '/widgets',
      active: true,
    },
  ];
  const columns = [
    {
      label: 'Name',
      prop: 'name',
    },
  ];
  const resourceName = 'Widget';
  const defaultProps = { columns, resourceName };

  it('should wrap the contents in a Page', () => {
    const endpoint = buildEndpoint({});
    const rendered = shallow(<IndexPage {...defaultProps} endpoint={endpoint} />);

    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-widgets');
    expect(rendered).toHaveProp('breadcrumbs', expectedBreadcrumbs);
  });

  it('should render the index table', () => {
    const endpoint = buildEndpoint({});
    const rendered = shallow(<IndexPage {...defaultProps} endpoint={endpoint} />);

    const table = rendered.find('IndexPageTable');

    expect(table).toExist();
    expect(table).toHaveProp({ columns });
    expect(table).toHaveProp({ endpoint });
    expect(table).toHaveProp({ resourceName });
  });

  it('should request the resources', () => {
    const requestData = jest.fn();
    const endpoint = buildEndpoint({ requestData });

    shallow(<IndexPage {...defaultProps} endpoint={endpoint} />);

    expect(requestData).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const endpoint = buildEndpoint({});
    const rendered = shallow(<IndexPage {...defaultProps} endpoint={endpoint} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with breadcrumbs: array', () => {
    const breadcrumbs = [
      {
        label: 'The Void',
        url: '/dev/null',
      },
    ];

    it('should wrap the contents in a Page', () => {
      const endpoint = buildEndpoint({});
      const rendered = shallow(
        <IndexPage {...defaultProps} breadcrumbs={breadcrumbs} endpoint={endpoint} />,
      );

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-widgets');
      expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
    });
  });

  describe('with breadcrumbs: component', () => {
    const breadcrumbs = () => (<div />);

    it('should wrap the contents in a Page', () => {
      const endpoint = buildEndpoint({});
      const rendered = shallow(
        <IndexPage {...defaultProps} breadcrumbs={breadcrumbs} endpoint={endpoint} />,
      );

      expect(rendered).toHaveDisplayName('Page');

      expect(rendered).toHaveClassName('page-widgets');
      expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
    });
  });

  describe('with mapData: function', () => {
    const mapData = jest.fn();

    it('should render the index table', () => {
      const endpoint = buildEndpoint({});
      const rendered = shallow(
        <IndexPage {...defaultProps} endpoint={endpoint} mapData={mapData} />,
      );
      const table = rendered.find('IndexPageTable');

      expect(table).toExist();
      expect(table).toHaveProp({ columns });
      expect(table).toHaveProp({ endpoint });
      expect(table).toHaveProp({ mapData });
      expect(table).toHaveProp({ resourceName });
    });
  });
});
