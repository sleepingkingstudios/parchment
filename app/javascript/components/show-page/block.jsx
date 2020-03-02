import React from 'react';
import PropTypes from 'prop-types';

import StatusSwitch from '../status-switch';
import { valueOrDefault } from '../../utils/object';
import { underscore } from '../../utils/string';

const defaultMapData = resourceName => data => (data[resourceName]);

const renderFailure = (resourceName) => {
  const ShowPageBlockFailureMessage = () => (
    <p className="loading-message loading-message-failure">
      Unable to load {resourceName} from the server.
    </p>
  );

  return ShowPageBlockFailureMessage;
};
const renderPending = (resourceName) => {
  const ShowPageBlockFailureMessage = () => (
    <p className="loading-message loading-message-failure">
      Loading {resourceName} from the server...
    </p>
  );

  return ShowPageBlockFailureMessage;
};

const ShowPageBlock = (props) => {
  const {
    Block,
    endpoint,
    mapData,
    resourceName,
  } = props;
  const singularResourceName = underscore(resourceName);
  const { hooks } = endpoint;
  const { useEndpoint } = hooks;
  const { data, status } = useEndpoint();
  const actualMapData = valueOrDefault(
    mapData,
    defaultMapData(singularResourceName),
  );
  const mappedData = actualMapData(data);

  return (
    <StatusSwitch
      renderFailure={renderFailure(singularResourceName)}
      renderInitialized={renderPending(singularResourceName)}
      renderPending={renderPending(singularResourceName)}
      renderSuccess={() => (<Block data={mappedData} />)}
      status={status}
    />
  );
};

ShowPageBlock.defaultProps = {
  mapData: null,
};

ShowPageBlock.propTypes = {
  Block: PropTypes.elementType.isRequired,
  endpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  mapData: PropTypes.func,
  resourceName: PropTypes.string.isRequired,
};

export default ShowPageBlock;
