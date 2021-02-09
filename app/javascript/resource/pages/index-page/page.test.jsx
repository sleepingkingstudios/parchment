import React from 'react';
import { shallow } from 'enzyme';

import { PENDING } from 'api/status';
import { titleize } from 'utils/string';
import IndexPage from './page';

describe('<IndexPage />', () => {
  const Table = () => (<div />);
  const data = { widgets: [] };
  const status = PENDING;
  const requestData = jest.fn();
  const useDestroyRequest = jest.fn();
  const hooks = {
    useData: jest.fn(() => data),
    useDataStatus: jest.fn(() => status),
    useDestroyRequest,
    useRequestData: jest.fn(() => requestData),
  };
  const resourceName = 'widgets';
  const defaultProps = {
    Table,
    hooks,
    resourceName,
  };

  beforeEach(() => {
    requestData.mockClear();
  });

  describe('with default props', () => {
    const rendered = shallow(<IndexPage {...defaultProps} />);

    it('should render a page', () => {
      expect(rendered).toHaveDisplayName('Page');
    });

    it('should render the page heading', () => {
      const heading = rendered.find('HeadingWithButtons');
      const expected = [
        {
          label: 'Create Widget',
          outline: true,
          url: '/widgets/create',
        },
      ];

      expect(heading).toExist();
      expect(heading).toHaveProp('children', titleize(resourceName));
      expect(heading).toHaveProp({ buttons: expected });
    });

    it('should set the breadcrumbs', () => {
      const expected = [
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

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });

    it('should request the data', () => {
      shallow(<IndexPage {...defaultProps} />);

      expect(requestData).toHaveBeenCalled();
    });

    it('should render the default content', () => {
      const content = rendered.find('IndexPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
    });
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/tools/widgets';
    const rendered = shallow(<IndexPage {...defaultProps} baseUrl={baseUrl} />);

    it('should render the page heading', () => {
      const heading = rendered.find('HeadingWithButtons');
      const expected = [
        {
          label: 'Create Widget',
          outline: true,
          url: `${baseUrl}/create`,
        },
      ];

      expect(heading).toExist();
      expect(heading).toHaveProp('children', titleize(resourceName));
      expect(heading).toHaveProp({ buttons: expected });
    });

    it('should set the breadcrumbs', () => {
      const expected = [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Widgets',
          url: '/tools/widgets',
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });
  });

  describe('with breadcrumbs: array', () => {
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Tools',
        url: '/tools',
      },
    ];
    const rendered = shallow(<IndexPage {...defaultProps} breadcrumbs={breadcrumbs} />);

    it('should set the breadcrumbs', () => {
      const expected = [
        ...breadcrumbs,
        {
          label: 'Widgets',
          url: '/widgets',
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });
  });

  describe('with pluralDisplayName: value', () => {
    const pluralDisplayName = 'gadgets';
    const rendered = shallow(
      <IndexPage {...defaultProps} pluralDisplayName={pluralDisplayName} />,
    );

    it('should render the page heading', () => {
      const heading = rendered.find('HeadingWithButtons');
      const expected = [
        {
          label: 'Create Widget',
          outline: true,
          url: '/widgets/create',
        },
      ];

      expect(heading).toExist();
      expect(heading).toHaveProp('children', titleize(pluralDisplayName));
      expect(heading).toHaveProp({ buttons: expected });
    });

    it('should set the breadcrumbs', () => {
      const expected = [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Gadgets',
          url: '/widgets',
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });

    it('should render the default content', () => {
      const content = rendered.find('IndexPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
    });
  });

  describe('with singularDisplayName: value', () => {
    const singularDisplayName = 'gadget';
    const rendered = shallow(
      <IndexPage {...defaultProps} singularDisplayName={singularDisplayName} />,
    );

    it('should render the page heading', () => {
      const heading = rendered.find('HeadingWithButtons');
      const expected = [
        {
          label: 'Create Gadget',
          outline: true,
          url: '/widgets/create',
        },
      ];

      expect(heading).toExist();
      expect(heading).toHaveProp('children', titleize(resourceName));
      expect(heading).toHaveProp({ buttons: expected });
    });

    it('should render the default content', () => {
      const content = rendered.find('IndexPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
    });
  });
});
