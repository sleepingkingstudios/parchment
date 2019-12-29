import React from 'react';
import { shallow } from 'enzyme';

import ShowBookBreadcrumbs from './breadcrumbs';
import { hooks } from '../../store/showFindBook';
import { booksData } from '../../fixtures';

jest.mock('../../store/showFindBook');

describe('<ShowBookBreadcrumbs />', () => {
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
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { book: {} } }));
    });

    it('should render the loading breadcrumbs', () => {
      const rendered = shallow(<ShowBookBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });

  describe('when the selector returns a book', () => {
    const book = booksData[0];
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
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { book } }));
    });

    it('should render the breadcrumbs for the book', () => {
      const rendered = shallow(<ShowBookBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });
});
