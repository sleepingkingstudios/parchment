import React from 'react';
import { shallow } from 'enzyme';

import { BookForm } from '../../components/form';
import UpdateBookPage from './page';
import findEndpoint from '../../store/updateFindBook';
import formEndpoint from '../../store/updateBookForm';
import { booksData } from '../../fixtures';

describe('UpdateBookPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the update page', () => {
    const rendered = shallow(<UpdateBookPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('UpdatePage');
    expect(rendered).toHaveProp({ Form: BookForm });
    expect(rendered).toHaveProp({ findEndpoint });
    expect(rendered).toHaveProp({ formEndpoint });
    expect(rendered).toHaveProp({ match });
    expect(rendered).toHaveProp({ resourceName: 'Book' });
    expect(rendered).toHaveProp({ resourceNameProp: 'title' });
  });

  it('should map the data', () => {
    const rendered = shallow(<UpdateBookPage {...defaultProps} />);
    const mapData = rendered.prop('mapData');
    const book = booksData[0];
    const data = { book };

    expect(typeof mapData).toEqual('function');
    expect(mapData(data)).toEqual(data);
  });

  it('should map the resource', () => {
    const rendered = shallow(<UpdateBookPage {...defaultProps} />);
    const mapResource = rendered.prop('mapResource');
    const book = booksData[0];
    const data = { book };

    expect(typeof mapResource).toEqual('function');
    expect(mapResource(data)).toEqual(book);
  });
});
