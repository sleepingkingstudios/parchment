import React from 'react';
import { shallow } from 'enzyme';

import BooksTable from './table';
import columns from './columns';

describe('<BooksTable />', () => {
  const data = { books: [] };
  const pluralDisplayName = 'books';
  const resourceName = 'books';
  const defaultOptions = { data, pluralDisplayName, resourceName };

  describe('with default options', () => {
    const rendered = shallow(<BooksTable {...defaultOptions} />);

    it('should be an IndexPageTable', () => {
      expect(rendered).toHaveDisplayName('IndexPageTable');
    });

    it('should set the columns', () => {
      expect(rendered).toHaveProp({ columns });
    });
  });
});
