import React from 'react';
import { shallow } from 'enzyme';

import CreatePublicationPage from './index';

describe('<CreatePublicationPage />', () => {
  const defaultProps = {};
  const breadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Publications',
      url: '/publications',
    },
    {
      label: 'Create',
      url: '/publications/create',
      active: true,
    },
  ];

  it('should render a Page', () => {
    const rendered = shallow(<CreatePublicationPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-create-publication');
    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the heading', () => {
    const rendered = shallow(<CreatePublicationPage {...defaultProps} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toHaveText('Create Publication');
  });

  it('should render the create Publication form', () => {
    const rendered = shallow(<CreatePublicationPage {...defaultProps} />);
    const form = rendered.find('CreatePublicationForm');

    expect(form).toExist();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<CreatePublicationPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
