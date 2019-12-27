import React from 'react';
import { shallow } from 'enzyme';

import ShowBookHeading from './heading';
import { hooks } from '../../store/showFindBook';
import { booksData } from '../../fixtures';

jest.mock('../../store/showFindBook');

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
    const expected = [];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => ({ data: { book } }));
    });

    it('should render the heading', () => {
      const rendered = shallow(<ShowBookHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(heading).toExist();
      expect(heading).toHaveProp('children', 'Show Book');
    });

    it('should not render buttons', () => {
      const rendered = shallow(<ShowBookHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', expected);
    });
  });
});
