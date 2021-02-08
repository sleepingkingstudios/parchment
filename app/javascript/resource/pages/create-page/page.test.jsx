import React from 'react';
import { shallow } from 'enzyme';

import { PENDING } from 'api/status';
import CreatePage from './page';

describe('<CreatePage />', () => {
  const Form = () => (<div />);
  const data = { widget: {} };
  const errors = { purpose: ['is unknown'] };
  const status = PENDING;
  const submitRequest = jest.fn();
  const useSubmitRequest = jest.fn(() => submitRequest);
  const updateForm = jest.fn();
  const useUpdateForm = jest.fn(() => updateForm);
  const hooks = {
    useForm: jest.fn(() => ({ data, errors })),
    useSubmitRequest,
    useSubmitStatus: jest.fn(() => status),
    useUpdateForm,
  };
  const resourceName = 'widget';
  const defaultProps = {
    Form,
    hooks,
    resourceName,
  };

  describe('with default props', () => {
    const rendered = shallow(<CreatePage {...defaultProps} />);

    it('should render a page', () => {
      expect(rendered).toHaveDisplayName('Page');
    });

    it('should render the page heading', () => {
      const heading = rendered.find('h1');

      expect(heading).toExist();
      expect(heading).toHaveText('Create Widget');
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
          label: 'Create Widget',
          url: '/widgets/create',
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });

    it('should render the form', () => {
      const content = rendered.find('Form');

      expect(content).toExist();
      expect(content).toHaveProp({ data });
      expect(content).toHaveProp({ errors });
      expect(content).toHaveProp({ status });
      expect(content).toHaveProp({ onChangeAction: updateForm });
      expect(content).toHaveProp({ onSubmitAction: submitRequest });
    });
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/tools/widgets';
    const rendered = shallow(<CreatePage {...defaultProps} baseUrl={baseUrl} />);

    it('should set the breadcrumbs', () => {
      const expected = [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Widgets',
          url: '/tools/widgets',
        },
        {
          label: 'Create Widget',
          url: '/tools/widgets/create',
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
    const rendered = shallow(<CreatePage {...defaultProps} breadcrumbs={breadcrumbs} />);

    it('should set the breadcrumbs', () => {
      const expected = [
        ...breadcrumbs,
        {
          label: 'Widgets',
          url: '/widgets',
        },
        {
          label: 'Create Widget',
          url: '/widgets/create',
          active: true,
        },
      ];

      expect(rendered).toHaveProp({ breadcrumbs: expected });
    });
  });
});
