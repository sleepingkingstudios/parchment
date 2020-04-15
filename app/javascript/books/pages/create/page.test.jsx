import React from 'react';
import { shallow } from 'enzyme';

import { BookForm } from '../../components/form';
import CreateBookPage from './page';
import endpoint from '../../store/createBookForm';
import { booksData } from '../../fixtures';

describe('CreateBookPage', () => {
  const defaultProps = {};

  it('should render the create page', () => {
    const rendered = shallow(<CreateBookPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('CreatePage');
    expect(rendered).toHaveProp({ Form: BookForm });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Book' });
  });

  it('should map the data', () => {
    const rendered = shallow(<CreateBookPage {...defaultProps} />);
    const mapData = rendered.prop('mapData');
    const book = booksData[0];
    const data = { book };

    expect(typeof mapData).toEqual('function');
    expect(mapData(data)).toEqual(data);
  });
});
