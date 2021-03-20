import React from 'react';
import { shallow } from 'enzyme';

import { PENDING } from 'api/status';
import { titleize } from 'utils/string';
import IndexPage from './page';
import IndexPageContent from './content';

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
    resources: {
      create: true,
      show: true,
      update: true,
    },
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
      const actions = ['create', 'show', 'update', 'destroy'];
      const content = rendered.find('IndexPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ actions });
      expect(content).toHaveProp({ baseUrl: '/widgets' });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
    });
  });

  describe('with Content: value', () => {
    const CustomContent = () => (<div />);
    const rendered = shallow(<IndexPage {...defaultProps} Content={CustomContent} />);

    it('should render the default content', () => {
      const actions = ['create', 'show', 'update', 'destroy'];
      const content = rendered.find('CustomContent');

      expect(content).toExist();
      expect(content).toHaveProp({ DefaultContent: IndexPageContent });
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ actions });
      expect(content).toHaveProp({ baseUrl: '/widgets' });
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

    it('should render the default content', () => {
      const content = rendered.find('IndexPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ baseUrl });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
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

  describe('with destroy: false', () => {
    const rendered = shallow(<IndexPage {...defaultProps} destroy={false} />);

    it('should render the default content', () => {
      const actions = ['create', 'show', 'update'];
      const content = rendered.find('IndexPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ actions });
      expect(content).toHaveProp({ baseUrl: '/widgets' });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
    });
  });

  describe('with mapData: function', () => {
    const mapData = obj => obj.widgets;
    const rendered = shallow(<IndexPage {...defaultProps} mapData={mapData} />);

    it('should render the default content', () => {
      const content = rendered.find('IndexPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ mapData });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
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
      expect(content).toHaveProp({ baseUrl: '/widgets' });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
    });
  });

  describe('with resourceName: a multiword string', () => {
    const customResourceName = 'rocket_parts';
    const rendered = shallow(<IndexPage {...defaultProps} resourceName={customResourceName} />);

    it('should render the default content', () => {
      const content = rendered.find('IndexPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'rocket parts' });
      expect(content).toHaveProp({ resourceName: customResourceName });
      expect(content).toHaveProp({ singularDisplayName: 'rocket part' });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
    });
  });

  describe('with resources: object', () => {
    const resources = {
      index: true,
      show: true,
    };
    const rendered = shallow(<IndexPage {...defaultProps} resources={resources} />);

    it('should render the page heading', () => {
      const heading = rendered.find('HeadingWithButtons');
      const expected = [];

      expect(heading).toExist();
      expect(heading).toHaveProp('children', titleize(resourceName));
      expect(heading).toHaveProp({ buttons: expected });
    });

    it('should render the default content', () => {
      const actions = ['index', 'show', 'destroy'];
      const content = rendered.find('IndexPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ actions });
      expect(content).toHaveProp({ baseUrl: '/widgets' });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
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
      expect(content).toHaveProp({ baseUrl: '/widgets' });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ useDestroyRequest });
    });
  });
});
