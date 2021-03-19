import React from 'react';
import { shallow } from 'enzyme';

import ItemsTable from './table';
import columns from './columns';

describe('<ItemsTable />', () => {
  const data = { items: [] };
  const pluralDisplayName = 'items';
  const resourceName = 'items';
  const defaultOptions = { data, pluralDisplayName, resourceName };

  describe('with default options', () => {
    const rendered = shallow(<ItemsTable {...defaultOptions} />);

    it('should be an IndexPageTable', () => {
      expect(rendered).toHaveDisplayName('IndexPageTable');
    });

    it('should set the columns', () => {
      expect(rendered).toHaveProp({ columns });
    });
  });
});
