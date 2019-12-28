import React from 'react';
import { shallow } from 'enzyme';

import UpdateBookBreadcrumbs from './breadcrumbs';
import { hooks } from '../../store/updateFindBook';
import { booksData } from '../../fixtures';

jest.mock('../../store/updateFindBook');

describe('UpdateBookBreadcrumbs', () => {
  const defaultProps = {};

  describe('when the selector does not return a book', () => {
    const expected = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Books',
        url: '/books',
      },
      {
        label: 'Loading...',
        url: null,
      },
      {
        label: 'Update',
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { book: {} } }));
    });

    it('should render the loading breadcrumbs', () => {
      const rendered = shallow(<UpdateBookBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });

  describe('when the selector returns a book', () => {
    const book = booksData[0];
    const { id } = book;
    const expected = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Books',
        url: '/books',
      },
      {
        label: book.title,
        url: `/books/${id}`,
      },
      {
        label: 'Update',
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { book } }));
    });

    it('should render the breadcrumbs for the book', () => {
      const rendered = shallow(<UpdateBookBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });
});
