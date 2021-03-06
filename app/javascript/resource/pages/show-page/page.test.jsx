import React from 'react';
import { shallow } from 'enzyme';

import { PENDING } from 'api/status';
import { titleize } from 'utils/string';
import ShowPage from './page';

describe('<ShowPage />', () => {
  const Block = () => (<div />);
  const baseUrl = '/widgets';
  const id = 'self-sealing-stem-bolt';
  const match = { params: { id } };
  const data = { widget: {} };
  const status = PENDING;
  const requestData = jest.fn();
  const destroyRequest = jest.fn();
  const useDestroyRequest = jest.fn(() => destroyRequest);
  const useRequestData = jest.fn(() => requestData);
  const hooks = {
    useData: jest.fn(() => data),
    useDataStatus: jest.fn(() => status),
    useDestroyRequest,
    useRequestData,
  };
  const resourceName = 'widgets';
  const singularResourceName = 'widget';
  const defaultProps = {
    Block,
    baseUrl,
    destroy: true,
    hooks,
    match,
    resourceName,
    resources: { update: true },
    singularResourceName,
  };

  beforeEach(() => {
    useRequestData.mockClear();
    requestData.mockClear();
  });

  describe('with default props', () => {
    const rendered = shallow(<ShowPage {...defaultProps} />);

    it('should render a page', () => {
      expect(rendered).toHaveDisplayName('Page');
    });

    it('should render the page heading', () => {
      const heading = rendered.find('HeadingWithButtons');
      const expected = [];

      expect(heading).toExist();
      expect(heading.shallow()).toIncludeText('Show Widget');
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
        },
        {
          label: 'Loading...',
          url: `/widgets/${id}`,
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });

    it('should request the data', () => {
      shallow(<ShowPage {...defaultProps} />);

      expect(useRequestData).toHaveBeenCalledWith({ wildcards: { id } });
      expect(requestData).toHaveBeenCalled();
    });

    it('should render the default content', () => {
      const content = rendered.find('ShowPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Block });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status });
    });

    describe('when the resource has loaded', () => {
      const widget = { id, name: 'Self-Sealing Stem Bolt' };
      const loadedHooks = Object.assign(
        {},
        hooks,
        { useData: () => ({ widget }) },
      );
      const loaded = shallow(<ShowPage {...defaultProps} hooks={loadedHooks} />);

      it('should render the page heading', () => {
        const heading = loaded.find('HeadingWithButtons');
        const expected = [
          {
            label: 'Update Widget',
            outline: true,
            url: `${baseUrl}/${id}/update`,
          },
          {
            buttonStyle: 'danger',
            label: 'Delete Widget',
            onClick: destroyRequest,
            outline: true,
          },
        ];

        expect(heading).toExist();
        expect(heading.shallow()).toIncludeText('Show Widget');
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
          },
          {
            label: 'Self-Sealing Stem Bolt',
            url: '/widgets/self-sealing-stem-bolt',
            active: true,
          },
        ];

        expect(loaded).toHaveProp({ breadcrumbs: expected });
      });
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
    const rendered = shallow(
      <ShowPage {...defaultProps} baseUrl="/tools/widgets" breadcrumbs={breadcrumbs} />,
    );

    it('should set the breadcrumbs', () => {
      const expected = [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Tools',
          url: '/tools',
        },
        {
          label: 'Widgets',
          url: '/tools/widgets',
        },
        {
          label: 'Loading...',
          url: `/tools/widgets/${id}`,
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });

    describe('when the resource has loaded', () => {
      const widget = { id, name: 'Self-Sealing Stem Bolt' };
      const loadedHooks = Object.assign(
        {},
        hooks,
        { useData: () => ({ widget }) },
      );
      const loaded = shallow(
        <ShowPage
          {...defaultProps}
          baseUrl="/tools/widgets"
          breadcrumbs={breadcrumbs}
          hooks={loadedHooks}
        />,
      );

      it('should set the breadcrumbs', () => {
        const expected = [
          {
            label: 'Home',
            url: '/',
          },
          {
            label: 'Tools',
            url: '/tools',
          },
          {
            label: 'Widgets',
            url: '/tools/widgets',
          },
          {
            label: 'Self-Sealing Stem Bolt',
            url: '/tools/widgets/self-sealing-stem-bolt',
            active: true,
          },
        ];

        expect(loaded).toHaveProp({ breadcrumbs: expected });
      });
    });
  });

  describe('with destroy: false', () => {
    describe('when the resource has loaded', () => {
      const widget = { id, name: 'Self-Sealing Stem Bolt' };
      const loadedHooks = Object.assign(
        {},
        hooks,
        { useData: () => ({ widget }) },
      );
      const loaded = shallow(<ShowPage {...defaultProps} hooks={loadedHooks} destroy={false} />);

      it('should render the page heading', () => {
        const heading = loaded.find('HeadingWithButtons');
        const expected = [
          {
            label: 'Update Widget',
            outline: true,
            url: `${baseUrl}/${id}/update`,
          },
        ];

        expect(heading).toExist();
        expect(heading.shallow()).toIncludeText('Show Widget');
        expect(heading).toHaveProp({ buttons: expected });
      });
    });
  });

  describe('with pluralDisplayName: value', () => {
    const pluralDisplayName = 'gadgets';
    const rendered = shallow(
      <ShowPage {...defaultProps} pluralDisplayName={pluralDisplayName} />,
    );

    it('should set the breadcrumbs', () => {
      const expected = [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Gadgets',
          url: '/widgets',
        },
        {
          label: 'Loading...',
          url: `/widgets/${id}`,
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });

    it('should render the default content', () => {
      const content = rendered.find('ShowPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Block });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status });
    });

    describe('when the resource has loaded', () => {
      const widget = { id, name: 'Self-Sealing Stem Bolt' };
      const loadedHooks = Object.assign(
        {},
        hooks,
        { useData: () => ({ widget }) },
      );
      const loaded = shallow(
        <ShowPage {...defaultProps} pluralDisplayName={pluralDisplayName} hooks={loadedHooks} />,
      );

      it('should set the breadcrumbs', () => {
        const expected = [
          {
            label: 'Home',
            url: '/',
          },
          {
            label: 'Gadgets',
            url: '/widgets',
          },
          {
            label: 'Self-Sealing Stem Bolt',
            url: '/widgets/self-sealing-stem-bolt',
            active: true,
          },
        ];

        expect(loaded).toHaveProp({ breadcrumbs: expected });
      });
    });
  });

  describe('with resourceNameProp: value', () => {
    const resourceNameProp = 'title';

    describe('when the resource has loaded', () => {
      const widget = { id, title: 'On Self-Sealing Stem Bolts' };
      const loadedHooks = Object.assign(
        {},
        hooks,
        { useData: () => ({ widget }) },
      );
      const loaded = shallow(
        <ShowPage {...defaultProps} resourceNameProp={resourceNameProp} hooks={loadedHooks} />,
      );

      it('should set the breadcrumbs', () => {
        const expected = [
          {
            label: 'Home',
            url: '/',
          },
          {
            label: 'Widgets',
            url: '/widgets',
          },
          {
            label: 'On Self-Sealing Stem Bolts',
            url: '/widgets/self-sealing-stem-bolt',
            active: true,
          },
        ];

        expect(loaded).toHaveProp({ breadcrumbs: expected });
      });
    });
  });

  describe('with resources: object', () => {
    const resources = { create: true };

    describe('when the resource has loaded', () => {
      const widget = { id, name: 'Self-Sealing Stem Bolt' };
      const loadedHooks = Object.assign(
        {},
        hooks,
        { useData: () => ({ widget }) },
      );
      const loaded = shallow(
        <ShowPage {...defaultProps} hooks={loadedHooks} resources={resources} />,
      );

      it('should render the page heading', () => {
        const heading = loaded.find('HeadingWithButtons');
        const expected = [
          {
            buttonStyle: 'danger',
            label: 'Delete Widget',
            onClick: destroyRequest,
            outline: true,
          },
        ];

        expect(heading).toExist();
        expect(heading.shallow()).toIncludeText('Show Widget');
        expect(heading).toHaveProp({ buttons: expected });
      });
    });
  });

  describe('with singularDisplayName: value', () => {
    const singularDisplayName = 'gadget';
    const rendered = shallow(
      <ShowPage {...defaultProps} singularDisplayName={singularDisplayName} />,
    );

    it('should render the page heading', () => {
      const heading = rendered.find('HeadingWithButtons');
      const expected = [];

      expect(heading).toExist();
      expect(heading.shallow()).toIncludeText(`Show ${titleize(singularDisplayName)}`);
      expect(heading).toHaveProp({ buttons: expected });
    });

    it('should render the default content', () => {
      const content = rendered.find('ShowPageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Block });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName });
      expect(content).toHaveProp({ status });
    });

    describe('when the resource has loaded', () => {
      const widget = { id, name: 'Self-Sealing Stem Bolt' };
      const loadedHooks = Object.assign(
        {},
        hooks,
        { useData: () => ({ widget }) },
      );
      const loaded = shallow(
        <ShowPage
          {...defaultProps}
          singularDisplayName={singularDisplayName}
          hooks={loadedHooks}
        />,
      );

      it('should render the page heading', () => {
        const heading = loaded.find('HeadingWithButtons');
        const expected = [
          {
            label: 'Update Gadget',
            outline: true,
            url: `${baseUrl}/${id}/update`,
          },
          {
            buttonStyle: 'danger',
            label: 'Delete Gadget',
            onClick: destroyRequest,
            outline: true,
          },
        ];

        expect(heading).toExist();
        expect(heading.shallow()).toIncludeText(`Show ${titleize(singularDisplayName)}`);
        expect(heading).toHaveProp({ buttons: expected });
      });
    });
  });
});
