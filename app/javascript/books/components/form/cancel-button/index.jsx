import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../../../../components/link-button';
import { formType } from '../../../../components/form/entities';

const cancelUrl = ({ form, isUpdate }) => {
  if (!isUpdate) { return '/books'; }

  const { data } = form;
  const { book } = data;
  const { id } = book;

  return `/books/${id}`;
};

const BookFormCancelButton = ({ form, isUpdate }) => {
  const url = cancelUrl({ form, isUpdate });

  return (
    <LinkButton block outline buttonStyle="secondary" url={url}>
      Cancel
    </LinkButton>
  );
};

BookFormCancelButton.defaultProps = {
  isUpdate: false,
};

BookFormCancelButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool,
};

export default BookFormCancelButton;
