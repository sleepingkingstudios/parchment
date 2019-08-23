import React from 'react';

import { LoaderSwitch } from '../../../components/loader';
import { SpellBlock } from '../../components/block';
import { useSpell } from '../../show/store';

const renderFailure = () => (
  <p>Unable to load spell from the server.</p>
);
const renderPending = () => (
  <p>Loading spell from the server...</p>
);

const ShowSpellBlock = () => {
  const { spell, status } = useSpell();

  return (
    <LoaderSwitch
      renderFailure={renderFailure}
      renderInitialized={renderPending}
      renderPending={renderPending}
      renderSuccess={() => (<SpellBlock spell={spell} />)}
      status={status}
    />
  );
};

ShowSpellBlock.defaultProps = {};

ShowSpellBlock.propTypes = {};

export default ShowSpellBlock;
