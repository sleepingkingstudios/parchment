import React from 'react';

import { LoaderSwitch } from '../../../components/loader';
import SpellForm from '../../components/form';
import { hooks } from '../../store/updateSpellForm';
import { dig } from '../../../utils/object';

const renderFailure = () => (
  <p>Unable to load spell from the server.</p>
);
const renderPending = () => (
  <p>Loading spell from the server...</p>
);
const { useEndpoint, useSubmitForm, useUpdateForm } = hooks;

const UpdateSpellForm = () => {
  const { data, errors, status } = useEndpoint();
  const id = dig(data, 'spell', 'id');
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm({ wildcards: { id } });

  return (
    <LoaderSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (
        <SpellForm
          data={data}
          errors={errors}
          status={status}
          onChangeAction={onChangeAction}
          onSubmitAction={onSubmitAction}
          isUpdate
        />
      )}
      status={status}
    />
  );
};

UpdateSpellForm.defaultProps = {};

UpdateSpellForm.propTypes = {};

export default UpdateSpellForm;
