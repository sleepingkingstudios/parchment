import React from 'react';
import { shallow } from 'enzyme';

import IndexActionsPage from './page';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindActions';

describe('IndexActionsPage', () => {
  const defaultProps = {};

  it('should render the index page', () => {
    const rendered = shallow(<IndexActionsPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('IndexPage');
    expect(rendered).toHaveProp({ columns });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Action' });
  });
});
