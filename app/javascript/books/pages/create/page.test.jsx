import React from 'react';
import { shallow } from 'enzyme';

import { BookForm } from '../../components/form';
import CreateBookPage from './page';
import endpoint from '../../store/createBookForm';

describe('CreateBookPage', () => {
  const defaultProps = {};

  it('should render the create page', () => {
    const rendered = shallow(<CreateBookPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('CreatePage');
    expect(rendered).toHaveProp({ Form: BookForm });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Book' });
  });
});
