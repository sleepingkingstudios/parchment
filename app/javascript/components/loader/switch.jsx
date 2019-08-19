import PropTypes from 'prop-types';

import {
  INITIALIZED,
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/requestStatus';

const defaultRender = () => null;

const renderMethod = (props) => {
  const {
    renderFailure,
    renderInitialized,
    renderPending,
    renderSuccess,
    status,
  } = props;

  switch (status) {
    case FAILURE:
      return renderFailure;
    case INITIALIZED:
      return renderInitialized;
    case PENDING:
      return renderPending;
    case SUCCESS:
      return renderSuccess;
    default:
      return defaultRender;
  }
};

const LoaderSwitch = (props) => {
  const {
    renderFailure,
    renderInitialized,
    renderPending,
    renderSuccess,
    status,
    ...rest
  } = props;
  const render = renderMethod(props);

  return render({ status, ...rest });
};

LoaderSwitch.defaultProps = {
  renderFailure: defaultRender,
  renderInitialized: defaultRender,
  renderPending: defaultRender,
  renderSuccess: defaultRender,
};

LoaderSwitch.propTypes = {
  renderFailure: PropTypes.func,
  renderInitialized: PropTypes.func,
  renderPending: PropTypes.func,
  renderSuccess: PropTypes.func,
  status: PropTypes.string.isRequired,
};

export default LoaderSwitch;
