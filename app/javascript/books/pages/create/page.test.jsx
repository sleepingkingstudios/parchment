import React from 'react';
import { shallow } from 'enzyme';

import CreateBookPage from './page';

describe('<CreateBookPage />', () => {
  const defaultProps = {};
  const breadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Books',
      url: '/books',
    },
    {
      label: 'Create',
      url: '/books/create',
      active: true,
    },
  ];

  it('should render a Page', () => {
    const rendered = shallow(<CreateBookPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-create-book');
    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the heading', () => {
    const rendered = shallow(<CreateBookPage {...defaultProps} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toHaveText('Create Book');
  });

  it('should render the create Book form', () => {
    const rendered = shallow(<CreateBookPage {...defaultProps} />);
    const form = rendered.find('CreateBookForm');

    expect(form).toExist();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<CreateBookPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
