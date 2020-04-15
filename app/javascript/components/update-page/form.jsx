import React from 'react';
import PropTypes from 'prop-types';

import StatusSwitch from '../status-switch';
import {
  dig,
  valueOrDefault,
} from '../../utils/object';
import { underscore } from '../../utils/string';

const defaultMapData = resourceName => data => dig(data, resourceName);
const renderFailure = (resourceName) => {
  const UpdatePageFailureMessage = () => (
    <p>Unable to load {resourceName} from the server.</p>
  );

  return UpdatePageFailureMessage;
};
const renderPending = (resourceName) => {
  const UpdatePagePendingMessage = () => (
    <p>Loading {resourceName} from the server...</p>
  );

  return UpdatePagePendingMessage;
};

const UpdatePageForm = (props) => {
  const {
    Form,
    findEndpoint,
    formEndpoint,
    id,
    mapData,
    resourceName,
  } = props;
  const singularResourceName = underscore(resourceName);
  const findHooks = findEndpoint.hooks;
  const useFindEndpoint = findHooks.useEndpoint;
  const findStatus = useFindEndpoint().status;
  const { hooks } = formEndpoint;
  const { useEndpoint, useSubmitForm, useUpdateForm } = hooks;
  const { data, errors, status } = useEndpoint();
  const actualMapData = valueOrDefault(
    mapData,
    defaultMapData(singularResourceName),
  );
  const mappedData = actualMapData(data);
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm({ wildcards: { id } });

  return (
    <StatusSwitch
      status={findStatus}
      renderFailure={renderFailure(singularResourceName)}
      renderInitialized={renderPending(singularResourceName)}
      renderPending={renderPending(singularResourceName)}
      renderSuccess={() => (
        <Form
          data={mappedData}
          errors={errors}
          status={status}
          onChangeAction={onChangeAction}
          onSubmitAction={onSubmitAction}
          isUpdate
        />
      )}
    />
  );
};

UpdatePageForm.defaultProps = {
  id: null,
  mapData: null,
};

UpdatePageForm.propTypes = {
  Form: PropTypes.elementType.isRequired,
  findEndpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  formEndpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func.isRequired,
      useSubmitForm: PropTypes.func.isRequired,
      useUpdateForm: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  id: PropTypes.string,
  mapData: PropTypes.func,
  resourceName: PropTypes.string.isRequired,
};

export default UpdatePageForm;
