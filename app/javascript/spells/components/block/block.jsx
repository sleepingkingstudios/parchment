import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PlainText from '../../../components/plain-text';
import { spellType } from '../../entities';
import {
  formatComponents,
  formatSchoolAndLevel,
} from '../../utils';
import { exists } from '../../../utils/object';

import './spell-block-styles.css';

const renderAdditionalDetails = ({ spell, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  return (
    <Fragment>
      <hr />

      <div className="spell-block-additional-details">
        <p className="spell-block-slug">
          <em>Slug:</em> { spell.slug }
        </p>
        <p className="spell-block-short-description">
          <em>Short Description:</em> { spell.shortDescription }
        </p>
      </div>
    </Fragment>
  );
};

const SpellBlock = ({ showAdditionalDetails, spell }) => (
  <div className="spell-block">
    <p className="spell-block-name">{ spell.name }</p>

    <p className="spell-block-source">
      { exists(spell.source) ? spell.source.name : 'Homebrew' }
    </p>

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

    { renderAdditionalDetails({ spell, showAdditionalDetails }) }
  </div>
);

SpellBlock.defaultProps = {
  showAdditionalDetails: false,
};

SpellBlock.propTypes = {
  showAdditionalDetails: PropTypes.bool,
  spell: spellType.isRequired,
};

export default SpellBlock;
