import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bookType } from '../../entities';

import './book-block-styles.css';

const renderAdditionalDetails = ({ book, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  return (
    <Fragment>
      <hr />

      <div className="book-block-additional-details">
        <p className="book-block-abbreviation">
          <em>Abbreviation:</em> { book.abbreviation }
        </p>
        <p className="book-block-slug">
          <em>Slug:</em> { book.slug }
        </p>
      </div>
    </Fragment>
  );
};

const BookBlock = ({ data, showAdditionalDetails }) => {
  const { book } = data;

  return (
    <div className="book-block">
      <p className="book-block-title">{ book.title }</p>

      <p className="book-block-publisher">
        <strong>Publisher:</strong> { book.publisherName }
      </p>

      <p className="book-block-publication-date">
        <strong>Publication Date:</strong> { book.publicationDate }
      </p>

      { renderAdditionalDetails({ book, showAdditionalDetails }) }
    </div>
  );
};

BookBlock.defaultProps = {
  showAdditionalDetails: false,
};

BookBlock.propTypes = {
  data: PropTypes.shape({
    book: bookType.isRequired,
  }).isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default BookBlock;
