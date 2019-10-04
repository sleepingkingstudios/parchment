import React from 'react';
import { shallow } from 'enzyme';

import SpellsTable from './table';
import columns from './columns';
import { spellsData } from '../../fixtures';

describe('<SpellsTable />', () => {
  const onDelete = jest.fn();
  const defaultProps = { onDelete };
  const emptyMessage = 'There are no spells matching the criteria.';

  describe('with spells: empty Array', () => {
    const props = { ...defaultProps, spells: [] };

    it('should render the Table', () => {
      const rendered = shallow(<SpellsTable {...props} />);
      const table = rendered.find('Table');

      expect(table).toExist();
      expect(table).toHaveProp('columns', columns);
      expect(table).toHaveProp('data', []);
      expect(table).toHaveProp('message', emptyMessage);
      expect(table).toHaveProp('cellProps', { onDelete });
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<SpellsTable {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with spells: Array with many items', () => {
    const props = { ...defaultProps, spells: spellsData };

    it('should render the Table', () => {
      const rendered = shallow(<SpellsTable {...props} />);
      const table = rendered.find('Table');

      expect(table).toExist();
      expect(table).toHaveProp('columns', columns);
      expect(table).toHaveProp('data', spellsData);
      expect(table).toHaveProp('cellProps', { onDelete });
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<SpellsTable {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
