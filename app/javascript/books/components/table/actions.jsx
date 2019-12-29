import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import LinkButton from '../../../components/link-button';
import { hooks } from '../../store/deleteBook';

const { useDeleteData } = hooks;

const BooksTableActions = ({ id, onDelete }) => {
  const onSuccess = next => (props) => {
    next(props);

    onDelete(props);
  };
  const deleteBook = useDeleteData({
    onSuccess,
    wildcards: { id },
  });

  return (
    <div className="book-actions">
      <LinkButton
        url={`/books/${id}`}
        link
        buttonSize="sm"
        buttonStyle="info"
      >
        Show
      </LinkButton>
      <LinkButton
        url={`/books/${id}/update`}
        link
        buttonSize="sm"
        buttonStyle="link"
      >
        Update
      </LinkButton>
      <Button
        onClick={deleteBook}
        link
        buttonSize="sm"
        buttonStyle="danger"
      >
        Delete
      </Button>
    </div>
  );
};

BooksTableActions.defaultProps = {
  onDelete: () => {},
};

BooksTableActions.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default BooksTableActions;
