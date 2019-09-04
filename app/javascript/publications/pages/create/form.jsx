import React from 'react';

import PublicationForm from '../../components/form';
import { hooks } from '../../store/createPublicationForm';

const { useEndpoint, useSubmitForm, useUpdateForm } = hooks;

const CreatePublicationForm = () => {
  const { data, errors, status } = useEndpoint();
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm();

  return (
    <PublicationForm
      data={data}
      errors={errors}
      status={status}
      onChangeAction={onChangeAction}
      onSubmitAction={onSubmitAction}
    />
  );
};

CreatePublicationForm.defaultProps = {};

CreatePublicationForm.propTypes = {};

export default CreatePublicationForm;
