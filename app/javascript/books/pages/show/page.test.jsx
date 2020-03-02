import React from 'react';
import { shallow } from 'enzyme';

import ShowBookPage from './page';
import { BookBlock } from '../../components/block';
import endpoint from '../../store/showFindBook';
import deleteEndpoint from '../../store/deleteBook';

describe('ShowBookPage', () => {
  const match = { params: { id: '00000000-0000-0000-0000-000000000000' } };
  const defaultProps = { match };

  it('should render the show page', () => {
    const rendered = shallow(<ShowBookPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ShowPage');
    expect(rendered).toHaveProp({ Block: BookBlock });
    expect(rendered).toHaveProp({ deleteEndpoint });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Book' });
  });
});
