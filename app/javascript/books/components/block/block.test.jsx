import React from 'react';
import { shallow } from 'enzyme';

import BookBlock from './block';
import { booksData } from '../../fixtures';

const book = booksData[0];

describe('<BookBlock />', () => {
  const defaultProps = { data: { book } };

  it('should wrap the contents in a <div> element', () => {
    const rendered = shallow(<BookBlock {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('book-block');
  });

  it('should render the book publication date', () => {
    const rendered = shallow(<BookBlock {...defaultProps} />);
    const publicationDateElement = rendered.find('.book-block-publication-date');

    expect(publicationDateElement).toHaveDisplayName('p');
    expect(publicationDateElement).toHaveText(`Publication Date: ${book.publicationDate}`);
  });

  it('should render the book publisher name', () => {
    const rendered = shallow(<BookBlock {...defaultProps} />);
    const publisherElement = rendered.find('.book-block-publisher');

    expect(publisherElement).toHaveDisplayName('p');
    expect(publisherElement).toHaveText(`Publisher: ${book.publisherName}`);
  });

  it('should render the book title', () => {
    const rendered = shallow(<BookBlock {...defaultProps} />);
    const titleElement = rendered.find('.book-block-title');

    expect(titleElement).toHaveDisplayName('p');
    expect(titleElement).toHaveText(book.title);
  });

  it('should be match the snapshot', () => {
    const rendered = shallow(<BookBlock {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with showAdditionalDetails: true', () => {
    it('should render the book abbreviation', () => {
      const rendered = shallow(<BookBlock {...defaultProps} showAdditionalDetails />);
      const titleElement = rendered.find('.book-block-abbreviation');

      expect(titleElement).toHaveDisplayName('p');
      expect(titleElement).toHaveText(`Abbreviation: ${book.abbreviation}`);
    });

    it('should render the book slug', () => {
      const rendered = shallow(<BookBlock {...defaultProps} showAdditionalDetails />);
      const titleElement = rendered.find('.book-block-slug');

      expect(titleElement).toHaveDisplayName('p');
      expect(titleElement).toHaveText(`Slug: ${book.slug}`);
    });
  });
});
