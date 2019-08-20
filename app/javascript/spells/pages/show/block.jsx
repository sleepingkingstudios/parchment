import React from 'react';
import PropTypes from 'prop-types';

import { LoaderSwitch } from '../../../components/loader';
import { SpellBlock } from '../../components/block';
import { spellType } from '../../entities';

const renderFailure = () => (
  <p>Unable to load spell from the server.</p>
);
const renderPending = () => (
  <p>Loading spell from the server...</p>
);

const ShowSpellBlock = props => (
  <LoaderSwitch
    {...props}
    renderFailure={renderFailure}
    renderInitialized={renderPending}
    renderPending={renderPending}
    renderSuccess={SpellBlock}
  />
);

ShowSpellBlock.defaultProps = {};

ShowSpellBlock.propTypes = {
  spell: PropTypes.oneOfType([
    spellType,
    PropTypes.object,
  ]).isRequired,
  status: PropTypes.string.isRequired,
};

export default ShowSpellBlock;
