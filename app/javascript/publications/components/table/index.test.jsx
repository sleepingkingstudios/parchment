import React from 'react';
import { shallow } from 'enzyme';

import PublicationsTable from './index';
import columns from './columns';
import { publicationsData } from '../../fixtures';

describe('<PublicationsTable />', () => {
  const onDelete = jest.fn();
  const defaultProps = { onDelete };
  const emptyMessage = 'There are no publications matching the criteria.';

  describe('with publications: empty Array', () => {
    const props = { ...defaultProps, publications: [] };

    it('should render the Table', () => {
      const rendered = shallow(<PublicationsTable {...props} />);
      const table = rendered.find('Table');

      expect(table).toExist();
      expect(table).toHaveProp('columns', columns);
      expect(table).toHaveProp('data', []);
      expect(table).toHaveProp('message', emptyMessage);
      expect(table).toHaveProp('cellProps', { onDelete });
    });
  });

  describe('with publications: Array with many items', () => {
    const props = { ...defaultProps, publications: publicationsData };

    it('should render the Table', () => {
      const rendered = shallow(<PublicationsTable {...props} />);
      const table = rendered.find('Table');

      expect(table).toExist();
      expect(table).toHaveProp('columns', columns);
      expect(table).toHaveProp('data', publicationsData);
      expect(table).toHaveProp('cellProps', { onDelete });
    });
  });
});
