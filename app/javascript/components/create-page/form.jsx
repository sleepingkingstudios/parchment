import React from 'react';
import PropTypes from 'prop-types';

import { valueOrDefault } from '../../utils/object';
import { underscore } from '../../utils/string';

const defaultMapData = resourceName => data => (data[resourceName]);

const CreatePageForm = (props) => {
  const {
    Form,
    endpoint,
    mapData,
    resourceName,
  } = props;
  const singularResourceName = underscore(resourceName);
  const { hooks } = endpoint;
  const { useEndpoint, useSubmitForm, useUpdateForm } = hooks;
  const { data, errors, status } = useEndpoint();
  const actualMapData = valueOrDefault(
    mapData,
    defaultMapData(singularResourceName),
  );
  const mappedData = actualMapData(data);
  const onChangeAction = useUpdateForm();
  const onSubmitAction = useSubmitForm();

  return (
    <Form
      data={mappedData}
      errors={errors}
      status={status}
      onChangeAction={onChangeAction}
      onSubmitAction={onSubmitAction}
    />
  );
};

CreatePageForm.defaultProps = {
  mapData: null,
};

CreatePageForm.propTypes = {
  Form: PropTypes.elementType.isRequired,
  endpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func.isRequired,
      useSubmitForm: PropTypes.func.isRequired,
      useUpdateForm: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  mapData: PropTypes.func,
  resourceName: PropTypes.string.isRequired,
};

export default CreatePageForm;
