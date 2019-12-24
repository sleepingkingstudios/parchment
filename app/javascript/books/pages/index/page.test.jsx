import React from 'react';
import { shallow } from 'enzyme';

import BooksPage from './page';
import { hooks } from '../../store/indexFindBooks';

jest.mock('../../store/indexFindBooks');

hooks.useRequestData.mockImplementation(() => () => {});

describe('BooksPage', () => {
  const breadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Books',
      url: '/books',
      active: true,
    },
  ];
  const defaultProps = {};

  it('should wrap the contents in a Page', () => {
    const rendered = shallow(<BooksPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-books');
    expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
  });

  it('should render the books table', () => {
    const rendered = shallow(<BooksPage {...defaultProps} />);

    const table = rendered.find('IndexBooksTable');

    expect(table).toExist();
  });

  it('should find the books', () => {
    const performRequest = jest.fn();

    hooks.useRequestData.mockImplementationOnce(() => performRequest);

    shallow(<BooksPage {...defaultProps} />);

    expect(hooks.useRequestData).toHaveBeenCalled();
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<BooksPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
