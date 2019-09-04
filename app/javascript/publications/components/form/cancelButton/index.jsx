import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../../../../components/link-button';
import { formType } from '../../../../components/form/entities';

const cancelUrl = ({ form, isUpdate }) => {
  if (!isUpdate) { return '/publications'; }

  const { data } = form;
  const { publication } = data;
  const { id } = publication;

  return `/publications/${id}`;
};

const PublicationFormCancelButton = ({ form, isUpdate }) => {
  const url = cancelUrl({ form, isUpdate });

  return (
    <LinkButton block outline buttonStyle="secondary" url={url}>
      Cancel
    </LinkButton>
  );
};

PublicationFormCancelButton.defaultProps = {
  isUpdate: false,
};

PublicationFormCancelButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool,
};

export default PublicationFormCancelButton;
