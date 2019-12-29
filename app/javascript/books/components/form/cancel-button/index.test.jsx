import React from 'react';
import { shallow } from 'enzyme';

import BookFormCancelButton from './index';

import { booksData } from '../../../fixtures';

describe('<BookFormCancelButton />', () => {
  const book = booksData[0];
  const form = { data: { book } };
  const defaultProps = {
    form,
    isUpdate: false,
  };

  it('should render the button', () => {
    const rendered = shallow(<BookFormCancelButton {...defaultProps} />);
    const url = '/books';

    expect(rendered).toHaveDisplayName('LinkButton');
    expect(rendered).toHaveProp('block', true);
    expect(rendered).toHaveProp('outline', true);
    expect(rendered).toHaveProp({ url });
    expect(rendered).toHaveProp('children', 'Cancel');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<BookFormCancelButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with isUpdate: true', () => {
    const props = { ...defaultProps, isUpdate: true };

    it('should render the button', () => {
      const rendered = shallow(<BookFormCancelButton {...props} />);
      const url = `/books/${book.id}`;

      expect(rendered).toHaveDisplayName('LinkButton');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('outline', true);
      expect(rendered).toHaveProp({ url });
      expect(rendered).toHaveProp('children', 'Cancel');
    });
  });
});
