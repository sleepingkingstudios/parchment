import React from 'react';
import { shallow } from 'enzyme';

import PublicationsTable from './index';
import columns from './columns';
import { publicationsData } from '../../fixtures';

describe('<SpellsTable />', () => {
  const defaultProps = {};
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
    });
  });
});
