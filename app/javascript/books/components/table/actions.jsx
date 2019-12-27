import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../../../components/link-button';

const BooksTableActions = ({ id }) => (
  <div className="book-actions">
    <LinkButton
      url={`/books/${id}`}
      link
      buttonSize="sm"
      buttonStyle="info"
    >
      Show
    </LinkButton>
  </div>
);

BooksTableActions.defaultProps = {};

BooksTableActions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BooksTableActions;