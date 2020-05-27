import React from 'react';
import { shallow } from 'enzyme';

import IndexSpellsPage from './page';
import DynamicTable from '../../../components/dynamic-table';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindSpells';

describe('IndexSpellsPage', () => {
  const defaultProps = {};

  it('should render the index page', () => {
    const rendered = shallow(<IndexSpellsPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('IndexPage');
    expect(rendered).toHaveProp({ columns });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Spell' });
    expect(rendered).toHaveProp({ Table: DynamicTable });
  });
});
