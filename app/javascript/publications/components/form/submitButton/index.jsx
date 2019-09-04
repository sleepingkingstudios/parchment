import React from 'react';
import PropTypes from 'prop-types';

import FormSubmitButton from '../../../../components/form/submit-button';
import Spinner from '../../../../components/spinner';

import { formType } from '../../../../components/form/entities';
import {
  FAILURE,
  INITIALIZED,
  PENDING,
  SUCCESS,
} from '../../../../api/status';

const isButtonDisabled = (status) => {
  switch (status) {
    case INITIALIZED:
    case FAILURE:
    case SUCCESS:
      return false;
    case PENDING:
    default:
      return true;
  }
};

const submitLabel = ({ isUpdate, status }) => {
  if (status === PENDING) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner className="mr-1" size="small" />
        { isUpdate ? 'Updating Publication...' : 'Creating Publication...' }
      </div>
    );
  }

  return isUpdate ? 'Update Publication' : 'Create Publication';
};

const PublicationFormSubmitButton = ({ form, isUpdate, status }) => (
  <FormSubmitButton block outline form={form} disabled={isButtonDisabled(status)}>
    { submitLabel({ isUpdate, status }) }
  </FormSubmitButton>
);

PublicationFormSubmitButton.defaultProps = {
  isUpdate: false,
};

PublicationFormSubmitButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool,
  status: PropTypes.string.isRequired,
};

export default PublicationFormSubmitButton;
