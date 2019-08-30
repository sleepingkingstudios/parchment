import React from 'react';

import SpellForm from '../../components/form';
import { hooks } from '../../store/createSpellForm';

const { useEndpoint, useSubmitForm, useUpdateForm } = hooks;

const CreateSpellForm = () => {
  const { data, errors, status } = useEndpoint();
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm();

  return (
    <SpellForm
      data={data}
      errors={errors}
      status={status}
      onChangeAction={onChangeAction}
      onSubmitAction={onSubmitAction}
    />
  );
};

CreateSpellForm.defaultProps = {};

CreateSpellForm.propTypes = {};

export default CreateSpellForm;
