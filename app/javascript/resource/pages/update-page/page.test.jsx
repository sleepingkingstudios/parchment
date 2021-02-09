import React from 'react';
import { shallow } from 'enzyme';

import {
  PENDING,
  SUCCESS,
} from 'api/status';
import { titleize } from 'utils/string';
import UpdatePage from './page';

describe('<UpdatePage />', () => {
  const Form = () => (<div />);
  const baseUrl = '/widgets';
  const id = 'self-sealing-stem-bolt';
  const match = { params: { id } };
  const data = { widget: {} };
  const errors = {};
  const requestData = jest.fn();
  const useRequestData = jest.fn(() => requestData);
  const submitRequest = jest.fn();
  const useSubmitRequest = jest.fn(() => submitRequest);
  const updateForm = jest.fn();
  const useUpdateForm = jest.fn(() => updateForm);
  const findStatus = SUCCESS;
  const submitStatus = PENDING;
  const hooks = {
    useDataStatus: jest.fn(() => findStatus),
    useForm: jest.fn(() => ({ data, errors })),
    useRequestData,
    useSubmitRequest,
    useSubmitStatus: jest.fn(() => submitStatus),
    useUpdateForm,
  };
  const resourceName = 'widgets';
  const singularResourceName = 'widget';
  const defaultProps = {
    Form,
    baseUrl,
    hooks,
    match,
    resourceName,
    singularResourceName,
  };

  beforeEach(() => {
    useRequestData.mockClear();
    requestData.mockClear();
  });

  describe('with default props', () => {
    const rendered = shallow(<UpdatePage {...defaultProps} />);

    it('should render a page', () => {
      expect(rendered).toHaveDisplayName('Page');
    });

    it('should render the page heading', () => {
      const heading = rendered.find('h1');

      expect(heading).toExist();
      expect(heading).toHaveText('Update Widget');
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
        {
          label: 'Update',
          url: `/widgets/${id}/update`,
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });

    it('should request the data', () => {
      shallow(<UpdatePage {...defaultProps} />);

      expect(useRequestData).toHaveBeenCalledWith({ wildcards: { id } });
      expect(requestData).toHaveBeenCalled();
    });

    it('should render the default content', () => {
      const content = rendered.find('UpdatePageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Form });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ errors });
      expect(content).toHaveProp({ onChangeAction: updateForm });
      expect(content).toHaveProp({ onSubmitAction: submitRequest });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ singularResourceName: 'widget' });
      expect(content).toHaveProp({ status: findStatus });
    });

    describe('when the resource has loaded', () => {
      const widget = { id, name: 'Self-Sealing Stem Bolt' };
      const loadedHooks = Object.assign(
        {},
        hooks,
        {
          useDataStatus: () => SUCCESS,
          useForm: () => ({ data: { widget }, errors }),
        },
      );
      const loaded = shallow(<UpdatePage {...defaultProps} hooks={loadedHooks} />);

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
            active: false,
          },
          {
            label: 'Update',
            url: '/widgets/self-sealing-stem-bolt/update',
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
      <UpdatePage {...defaultProps} baseUrl="/tools/widgets" breadcrumbs={breadcrumbs} />,
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
        {
          label: 'Update',
          url: `/tools/widgets/${id}/update`,
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
        {
          useDataStatus: () => SUCCESS,
          useForm: () => ({ data: { widget }, errors }),
        },
      );
      const loaded = shallow(
        <UpdatePage
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
            active: false,
          },
          {
            label: 'Update',
            url: '/tools/widgets/self-sealing-stem-bolt/update',
            active: true,
          },
        ];

        expect(loaded).toHaveProp({ breadcrumbs: expected });
      });
    });
  });

  describe('with pluralDisplayName: value', () => {
    const pluralDisplayName = 'gadgets';
    const rendered = shallow(
      <UpdatePage {...defaultProps} pluralDisplayName={pluralDisplayName} />,
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
        {
          label: 'Update',
          url: `/widgets/${id}/update`,
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });

    it('should render the default content', () => {
      const content = rendered.find('UpdatePageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Form });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ errors });
      expect(content).toHaveProp({ onChangeAction: updateForm });
      expect(content).toHaveProp({ onSubmitAction: submitRequest });
      expect(content).toHaveProp({ pluralDisplayName });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName: 'widget' });
      expect(content).toHaveProp({ status: findStatus });
    });

    describe('when the resource has loaded', () => {
      const widget = { id, name: 'Self-Sealing Stem Bolt' };
      const loadedHooks = Object.assign(
        {},
        hooks,
        {
          useDataStatus: () => SUCCESS,
          useForm: () => ({ data: { widget }, errors }),
        },
      );
      const loaded = shallow(
        <UpdatePage
          {...defaultProps}
          hooks={loadedHooks}
          pluralDisplayName={pluralDisplayName}
        />,
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
            active: false,
          },
          {
            label: 'Update',
            url: '/widgets/self-sealing-stem-bolt/update',
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
        {
          useDataStatus: () => SUCCESS,
          useForm: () => ({ data: { widget }, errors }),
        },
      );
      const loaded = shallow(
        <UpdatePage {...defaultProps} resourceNameProp={resourceNameProp} hooks={loadedHooks} />,
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
            active: false,
          },
          {
            label: 'Update',
            url: '/widgets/self-sealing-stem-bolt/update',
            active: true,
          },
        ];

        expect(loaded).toHaveProp({ breadcrumbs: expected });
      });
    });
  });

  describe('with singularDisplayName: value', () => {
    const singularDisplayName = 'gadget';
    const rendered = shallow(
      <UpdatePage {...defaultProps} singularDisplayName={singularDisplayName} />,
    );

    it('should render the page heading', () => {
      const heading = rendered.find('h1');

      expect(heading).toExist();
      expect(heading).toHaveText(`Update ${titleize(singularDisplayName)}`);
    });

    it('should render the default content', () => {
      const content = rendered.find('UpdatePageContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Form });
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ errors });
      expect(content).toHaveProp({ onChangeAction: updateForm });
      expect(content).toHaveProp({ onSubmitAction: submitRequest });
      expect(content).toHaveProp({ pluralDisplayName: 'widgets' });
      expect(content).toHaveProp({ resourceName });
      expect(content).toHaveProp({ singularDisplayName });
      expect(content).toHaveProp({ status: findStatus });
    });
  });
});
