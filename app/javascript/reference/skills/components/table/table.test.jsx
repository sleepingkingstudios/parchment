import React from 'react';
import { shallow } from 'enzyme';

import SkillsTable from './table';
import columns from './columns';

describe('<SkillsTable />', () => {
  const data = { skills: [] };
  const pluralDisplayName = 'skills';
  const resourceName = 'skills';
  const defaultOptions = { data, pluralDisplayName, resourceName };

  describe('with default options', () => {
    const rendered = shallow(<SkillsTable {...defaultOptions} />);

    it('should be an IndexPageTable', () => {
      expect(rendered).toHaveDisplayName('IndexPageTable');
    });

    it('should set the columns', () => {
      expect(rendered).toHaveProp({ columns });
    });
  });
});
