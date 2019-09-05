import React from 'react';

import StatusSwitch from '../../../components/status-switch';
import PublicationForm from '../../components/form';
import { hooks as findHooks } from '../../store/updateFindPublication';
import { hooks as formHooks } from '../../store/updatePublicationForm';
import { dig } from '../../../utils/object';

const renderFailure = () => (
  <p>Unable to load publication from the server.</p>
);
const renderPending = () => (
  <p>Loading publication from the server...</p>
);
const useFindEndpoint = findHooks.useEndpoint;
const { useEndpoint, useSubmitForm, useUpdateForm } = formHooks;

const UpdatePublicationForm = () => {
  const { data, errors, status } = useEndpoint();
  const findStatus = useFindEndpoint().status;
  const id = dig(data, 'publication', 'id');
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm({ wildcards: { id } });

  return (
    <StatusSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (
        <PublicationForm
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

UpdatePublicationForm.defaultProps = {};

UpdatePublicationForm.propTypes = {};

export default UpdatePublicationForm;
