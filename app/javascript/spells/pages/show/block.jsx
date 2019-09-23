import React from 'react';

import StatusSwitch from '../../../components/status-switch';
import { SpellBlock } from '../../components/block';
import { hooks } from '../../store/showFindSpell';

const renderFailure = () => (
  <p>Unable to load spell from the server.</p>
);
const renderPending = () => (
  <p>Loading spell from the server...</p>
);
const { useEndpoint } = hooks;

const ShowSpellBlock = () => {
  const { data, status } = useEndpoint();
  const { spell } = data;

  return (
    <StatusSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (<SpellBlock spell={spell} showAdditionalDetails />)}
      status={status}
    />
  );
};

ShowSpellBlock.defaultProps = {};

ShowSpellBlock.propTypes = {};

export default ShowSpellBlock;
