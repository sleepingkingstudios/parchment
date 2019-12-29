import React from 'react';

import BookForm from '../../components/form';
import { hooks } from '../../store/createBookForm';

const { useEndpoint, useSubmitForm, useUpdateForm } = hooks;

const CreateBookForm = () => {
  const { data, errors, status } = useEndpoint();
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm();

  return (
    <BookForm
      data={data}
      errors={errors}
      status={status}
      onChangeAction={onChangeAction}
      onSubmitAction={onSubmitAction}
    />
  );
};

CreateBookForm.defaultProps = {};

CreateBookForm.propTypes = {};

export default CreateBookForm;
