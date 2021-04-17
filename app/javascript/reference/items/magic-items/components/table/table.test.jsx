import React from 'react';
import { shallow } from 'enzyme';

import MagicItemsTable from './table';
import columns from './columns';

describe('<MagicItemsTable />', () => {
  const data = { magicItems: [] };
  const pluralDisplayName = 'magic items';
  const resourceName = 'magicItems';
  const defaultOptions = { data, pluralDisplayName, resourceName };

  describe('with default options', () => {
    const rendered = shallow(<MagicItemsTable {...defaultOptions} />);

    it('should be an IndexPageTable', () => {
      expect(rendered).toHaveDisplayName('IndexPageTable');
    });

    it('should set the columns', () => {
      expect(rendered).toHaveProp({ columns });
    });
  });
});
