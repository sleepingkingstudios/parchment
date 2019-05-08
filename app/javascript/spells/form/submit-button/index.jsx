import React from 'react';
import PropTypes from 'prop-types';

import FormSubmitButton from '../../../components/form/submit-button';
import Spinner from '../../../components/spinner';

import { formType } from '../../../components/form/entities';
import {
  FAILURE,
  INITIALIZED,
  PENDING,
  SUCCESS,
} from '../../../store/requestStatus';

const isButtonDisabled = (requestStatus) => {
  switch (requestStatus) {
    case INITIALIZED:
    case FAILURE:
    case SUCCESS:
      return false;
    case PENDING:
    default:
      return true;
  }
};

const submitLabel = ({ isUpdate, requestStatus }) => {
  if (requestStatus === PENDING) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner className="mr-1" size="small" />
        { isUpdate ? 'Updating Spell...' : 'Creating Spell...' }
      </div>
    );
  }

  return isUpdate ? 'Update Spell' : 'Create Spell';
};

const SpellFormSubmitButton = ({ form, isUpdate, requestStatus }) => (
  <FormSubmitButton block form={form} disabled={isButtonDisabled(requestStatus)}>
    { submitLabel({ isUpdate, requestStatus }) }
  </FormSubmitButton>
);

SpellFormSubmitButton.defaultProps = {
  isUpdate: false,
};

SpellFormSubmitButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool,
  requestStatus: PropTypes.string.isRequired,
};

export default SpellFormSubmitButton;
