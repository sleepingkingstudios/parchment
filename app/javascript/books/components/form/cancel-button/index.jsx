import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../../../../components/link-button';
import { formType } from '../../../../components/form/entities';
import { dig } from '../../../../utils/object';

const cancelUrl = ({ form, isUpdate }) => {
  if (!isUpdate) { return '/books'; }

  const id = dig(form, 'data', 'id');

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
