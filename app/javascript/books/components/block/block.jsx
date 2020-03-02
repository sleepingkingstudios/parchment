import React from 'react';

import { bookType } from '../../entities';

import './book-block-styles.css';

const BookBlock = ({ data }) => (
  <div className="book-block">
    <p className="book-block-title">{ data.title }</p>

    <p className="book-block-publisher">
      <strong>Publisher:</strong> { data.publisherName }
    </p>

    <p className="book-block-publication-date">
      <strong>Publication Date:</strong> { data.publicationDate }
    </p>
  </div>
);

BookBlock.defaultProps = {};

BookBlock.propTypes = {
  data: bookType.isRequired,
};

export default BookBlock;
