import React from 'react';

import PlainText from '../../../components/plain-text';
import { spellType } from '../../entities';
import {
  formatComponents,
  formatSchoolAndLevel,
} from '../../utils';

import './block-styles.css';

const SpellBlock = ({ spell }) => (
  <div className="spell-block">
    <p className="spell-block-name">{ spell.name }</p>

    <p className="spell-block-level-school">
      { formatSchoolAndLevel(spell) }
    </p>

    <div className="spell-block-stats">
      <p className="spell-block-casting-time">
        <strong>Casting Time:</strong> { spell.castingTime }
      </p>
      <p className="spell-block-range">
        <strong>Range:</strong> { spell.range }
      </p>
      <p className="spell-block-components">
        <strong>Components:</strong> { formatComponents(spell, true) }
      </p>
      <p className="spell-block-duration">
        <strong>Duration:</strong> { spell.duration }
      </p>
    </div>

    <PlainText className="spell-block-description" text={spell.description} />
  </div>
);

SpellBlock.defaultProps = {};

SpellBlock.propTypes = {
  spell: spellType.isRequired,
};

export default SpellBlock;
