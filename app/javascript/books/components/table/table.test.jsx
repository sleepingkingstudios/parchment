import React from 'react';
import { shallow } from 'enzyme';

import BooksTable from './table';
import columns from './columns';
import { booksData } from '../../fixtures';

describe('<BooksTable />', () => {
  const onDelete = jest.fn();
  const defaultProps = { onDelete };
  const emptyMessage = 'There are no books matching the criteria.';

  describe('with books: empty Array', () => {
    const props = { ...defaultProps, books: [] };

    it('should render the Table', () => {
      const rendered = shallow(<BooksTable {...props} />);
      const table = rendered.find('Table');

      expect(table).toExist();
      expect(table).toHaveProp('columns', columns);
      expect(table).toHaveProp('data', []);
      expect(table).toHaveProp('message', emptyMessage);
      expect(table).toHaveProp('cellProps', { onDelete });
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<BooksTable {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with books: Array with many items', () => {
    const props = { ...defaultProps, books: booksData };

    it('should render the Table', () => {
      const rendered = shallow(<BooksTable {...props} />);
      const table = rendered.find('Table');

      expect(table).toExist();
      expect(table).toHaveProp('columns', columns);
      expect(table).toHaveProp('data', booksData);
      expect(table).toHaveProp('cellProps', { onDelete });
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<BooksTable {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
