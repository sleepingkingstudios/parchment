import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bookType } from '../../entities';

import './book-block-styles.css';

const renderAdditionalDetails = ({ data, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  return (
    <Fragment>
      <hr />

      <div className="book-block-additional-details">
        <p className="book-block-abbreviation">
          <em>Abbreviation:</em> { data.abbreviation }
        </p>
        <p className="book-block-slug">
          <em>Slug:</em> { data.slug }
        </p>
      </div>
    </Fragment>
  );
};

const BookBlock = ({ data, showAdditionalDetails }) => (
  <div className="book-block">
    <p className="book-block-title">{ data.title }</p>

    <p className="book-block-publisher">
      <strong>Publisher:</strong> { data.publisherName }
    </p>

    <p className="book-block-publication-date">
      <strong>Publication Date:</strong> { data.publicationDate }
    </p>

    { renderAdditionalDetails({ data, showAdditionalDetails }) }
  </div>
);

BookBlock.defaultProps = {
  showAdditionalDetails: false,
};

BookBlock.propTypes = {
  data: bookType.isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default BookBlock;
