import React from 'react';
import PropTypes from 'prop-types';

import StatusSwitch from 'components/status-switch';

const renderFailure = ({ singularDisplayName }) => {
  const ShowPageFailureMessage = () => (
    <p className="loading-message loading-message-failure">
      Unable to load {singularDisplayName} data from the server.
    </p>
  );

  return ShowPageFailureMessage;
};
const renderPending = ({ singularDisplayName }) => {
  const ShowPagePendingMessage = () => (
    <p className="loading-message loading-message-pending">
      Loading {singularDisplayName} data from the server...
    </p>
  );

  return ShowPagePendingMessage;
};
const renderSuccess = (props) => {
  const {
    Form,
    data,
    errors,
    onChangeAction,
    onSubmitAction,
    submitStatus,
  } = props;

  const UpdatePageForm = () => (
    <Form
      data={data}
      errors={errors}
      onChangeAction={onChangeAction}
      onSubmitAction={onSubmitAction}
      status={submitStatus}
      isUpdate
    />
  );

  return UpdatePageForm;
};

const UpdatePageContent = (props) => {
  const {
    Form,
    data,
    errors,
    onChangeAction,
    onSubmitAction,
    singularDisplayName,
    status,
    submitStatus,
  } = props;
  const failure = renderFailure({ singularDisplayName });
  const pending = renderPending({ singularDisplayName });
  const success = renderSuccess({
    Form,
    data,
    errors,
    onChangeAction,
    onSubmitAction,
    submitStatus,
  });

  return (
    <StatusSwitch
      renderFailure={failure}
      renderInitialized={pending}
      renderPending={pending}
      renderSuccess={success}
      status={status}
    />
  );
};

UpdatePageContent.defaultProps = {
  errors: {},
};

UpdatePageContent.propTypes = {
  Form: PropTypes.elementType.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any),
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  singularDisplayName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  submitStatus: PropTypes.string.isRequired,
};

export default UpdatePageContent;
