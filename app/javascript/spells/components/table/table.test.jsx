import React from 'react';
import { shallow } from 'enzyme';

import SpellsTable from './table';
import columns from './columns';

describe('<SpellsTable />', () => {
  const data = { spells: [] };
  const pluralDisplayName = 'spells';
  const resourceName = 'spells';
  const defaultOptions = { data, pluralDisplayName, resourceName };

  describe('with default options', () => {
    const rendered = shallow(<SpellsTable {...defaultOptions} />);

    it('should be an IndexPageTable', () => {
      expect(rendered).toHaveDisplayName('IndexPageTable');
    });

    it('should set the columns', () => {
      expect(rendered).toHaveProp({ columns });
    });
  });
});
