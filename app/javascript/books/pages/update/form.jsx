import React from 'react';

import StatusSwitch from '../../../components/status-switch';
import { BookForm } from '../../components/form';
import { hooks as findHooks } from '../../store/updateFindBook';
import { hooks as formHooks } from '../../store/updateBookForm';
import { dig } from '../../../utils/object';

const renderFailure = () => (
  <p>Unable to load book from the server.</p>
);
const renderPending = () => (
  <p>Loading book from the server...</p>
);
const useFindEndpoint = findHooks.useEndpoint;
const { useEndpoint, useSubmitForm, useUpdateForm } = formHooks;

const UpdateBookForm = () => {
  const { data, errors, status } = useEndpoint();
  const findStatus = useFindEndpoint().status;
  const id = dig(data, 'book', 'id');
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm({ wildcards: { id } });

  return (
    <StatusSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (
        <BookForm
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

UpdateBookForm.defaultProps = {};

UpdateBookForm.propTypes = {};

export default UpdateBookForm;
