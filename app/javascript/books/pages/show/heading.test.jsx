import React from 'react';
import { shallow } from 'enzyme';

import ShowBookHeading from './heading';
import { hooks } from '../../store/showFindBook';
import { hooks as deleteHooks } from '../../store/deleteBook';
import { booksData } from '../../fixtures';

jest.mock('../../store/deleteBook');
jest.mock('../../store/showFindBook');

const deleteData = jest.fn();

describe('<ShowBookHeading />', () => {
  const defaultProps = {};

  describe('when the selector does not return a book', () => {
    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => ({ data: {} }));
    });

    it('should render the heading with no buttons', () => {
      const rendered = shallow(<ShowBookHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', []);
      expect(heading).toHaveProp('children', 'Show Book');
    });
  });

  describe('when the selector returns a book', () => {
    const book = booksData[0];
    const { id } = book;
    const expected = [
      {
        label: 'Update Book',
        outline: true,
        url: `/books/${book.id}/update`,
      },
      {
        buttonStyle: 'danger',
        label: 'Delete Book',
        outline: true,
        onClick: deleteData,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => ({ data: { book } }));

      deleteHooks.useDeleteData.mockImplementationOnce(() => deleteData);
    });

    it('should render the heading', () => {
      const rendered = shallow(<ShowBookHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(heading).toExist();
      expect(heading).toHaveProp('children', 'Show Book');
    });

    it('should render the update and delete buttons', () => {
      const rendered = shallow(<ShowBookHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', expected);

      expect(deleteHooks.useDeleteData).toHaveBeenCalledWith({ wildcards: { id } });
    });
  });
});
