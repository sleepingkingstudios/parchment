import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../../../components/link-button';
import { formType } from '../../../components/form/entities';

const cancelUrl = ({ form, isUpdate }) => {
  if (!isUpdate) { return '/spells'; }

  const { data } = form;
  const { spell } = data;
  const { id } = spell;

  return `/spells/${id}`;
};

const SpellFormCancelButton = ({ form, isUpdate }) => {
  const url = cancelUrl({ form, isUpdate });

  return (
    <LinkButton block outline buttonStyle="secondary" url={url}>
      Cancel
    </LinkButton>
  );
};

SpellFormCancelButton.defaultProps = {
  isUpdate: false,
};

SpellFormCancelButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool,
};

export default SpellFormCancelButton;
