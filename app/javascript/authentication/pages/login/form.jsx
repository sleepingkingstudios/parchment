import React from 'react';
import PropTypes from 'prop-types';

import { AuthenticationLoginForm } from '../../components/form';

const ConnectedAuthenticationLoginForm = (props) => {
  const { endpoint } = props;
  const { hooks } = endpoint;
  const { useEndpoint, useSubmitForm, useUpdateForm } = hooks;
  const { data, errors, status } = useEndpoint();
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm();

  return (
    <AuthenticationLoginForm
      data={data}
      errors={errors}
      status={status}
      onChangeAction={onChangeAction}
      onSubmitAction={onSubmitAction}
    />
  );
};

ConnectedAuthenticationLoginForm.propTypes = {
  endpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func.isRequired,
      useSubmitForm: PropTypes.func.isRequired,
      useUpdateForm: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ConnectedAuthenticationLoginForm;
