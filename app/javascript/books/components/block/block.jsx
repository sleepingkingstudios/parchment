import React from 'react';

import { bookType } from '../../entities';

import './book-block-styles.css';

const BookBlock = ({ book }) => (
  <div className="book-block">
    <p className="book-block-title">{ book.title }</p>

    <p className="book-block-publisher">
      <strong>Publisher:</strong> { book.publisherName }
    </p>

    <p className="book-block-publication-date">
      <strong>Publication Date:</strong> { book.publicationDate }
    </p>
  </div>
);

BookBlock.defaultProps = {};

BookBlock.propTypes = {
  book: bookType.isRequired,
};

export default BookBlock;
