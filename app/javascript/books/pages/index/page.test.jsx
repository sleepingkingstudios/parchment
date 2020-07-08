import React from 'react';
import { shallow } from 'enzyme';

import IndexBooksPage from './page';
import DynamicTable from '../../../components/dynamic-table';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindBooks';

describe('IndexBooksPage', () => {
  const defaultProps = {};

  it('should render the index page', () => {
    const rendered = shallow(<IndexBooksPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('IndexPage');
    expect(rendered).toHaveProp({ columns });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Book' });
    expect(rendered).toHaveProp({ Table: DynamicTable });
  });
});
