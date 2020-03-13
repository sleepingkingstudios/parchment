import React from 'react';

import StatusSwitch from '../../../components/status-switch';
import { SpellForm } from '../../components/form';
import { hooks as findHooks } from '../../store/updateFindSpell';
import { hooks as formHooks } from '../../store/updateSpellForm';
import { dig } from '../../../utils/object';

const renderFailure = () => (
  <p>Unable to load spell from the server.</p>
);
const renderPending = () => (
  <p>Loading spell from the server...</p>
);
const useFindEndpoint = findHooks.useEndpoint;
const { useEndpoint, useSubmitForm, useUpdateForm } = formHooks;

const UpdateSpellForm = () => {
  const { data, errors, status } = useEndpoint();
  const findStatus = useFindEndpoint().status;
  const id = dig(data, 'spell', 'id');
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm({ wildcards: { id } });

  return (
    <StatusSwitch
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
      status={findStatus}
    />
  );
};

UpdateSpellForm.defaultProps = {};

UpdateSpellForm.propTypes = {};

export default UpdateSpellForm;
