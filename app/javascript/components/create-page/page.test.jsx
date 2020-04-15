import React from 'react';
import { shallow } from 'enzyme';

import CreatePage from './page';

const buildEndpoint = () => ({
  hooks: {
    useEndpoint: () => ({}),
    useSubmitForm: () => {},
    useUpdateForm: () => {},
  },
});

describe('<CreatePage />', () => {
  const Form = () => (<div />);
  const resourceName = 'Widget';
  const defaultProps = { Form, resourceName };

  it('should render the page', () => {
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
        label: 'Create',
        url: '/widgets/create',
        active: true,
      },
    ];
    const endpoint = buildEndpoint();
    const rendered = shallow(<CreatePage {...defaultProps} endpoint={endpoint} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-create-widget');
    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the heading', () => {
    const endpoint = buildEndpoint();
    const rendered = shallow(<CreatePage {...defaultProps} endpoint={endpoint} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toHaveText('Create Widget');
  });

  it('should render the form', () => {
    const endpoint = buildEndpoint();
    const rendered = shallow(<CreatePage {...defaultProps} endpoint={endpoint} />);
    const form = rendered.find('CreatePageForm');

    expect(form).toExist();
    expect(form).toHaveProp({ Form });
    expect(form).toHaveProp({ endpoint });
    expect(form).toHaveProp({ resourceName });
  });

  describe('with breadcrumbs: value', () => {
    const breadcrumbs = [
      {
        label: 'The Void',
        url: '/dev/null',
      },
    ];

    it('should render the page', () => {
      const endpoint = buildEndpoint();
      const rendered = shallow(
        <CreatePage {...defaultProps} breadcrumbs={breadcrumbs} endpoint={endpoint} />,
      );

      expect(rendered).toHaveDisplayName('Page');
      expect(rendered).toHaveClassName('page-create-widget');
      expect(rendered).toHaveProp({ breadcrumbs });
    });
  });

  describe('with mapData: function', () => {
    const mapData = () => {};

    it('should render the form', () => {
      const endpoint = buildEndpoint();
      const rendered = shallow(
        <CreatePage {...defaultProps} endpoint={endpoint} mapData={mapData} />,
      );
      const form = rendered.find('CreatePageForm');

      expect(form).toExist();
      expect(form).toHaveProp({ Form });
      expect(form).toHaveProp({ endpoint });
      expect(form).toHaveProp({ mapData });
      expect(form).toHaveProp({ resourceName });
    });
  });
});
