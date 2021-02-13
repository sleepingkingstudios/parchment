import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RichText from '../../../components/rich-text';
import { spellType } from '../../entities';
import {
  formatComponents,
  formatSchoolAndLevel,
} from '../../utils';
import { exists } from '../../../utils/object';

import './spell-block-styles.css';

const renderAdditionalDetails = ({ data, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  const { spell } = data;

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

const SpellBlock = ({ data, showAdditionalDetails }) => {
  const { spell } = data;

  return (
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

      <RichText className="spell-block-description" text={spell.description} />

      { renderAdditionalDetails({ data, showAdditionalDetails }) }
    </div>
  );
};

SpellBlock.defaultProps = {
  showAdditionalDetails: false,
};

SpellBlock.propTypes = {
  data: PropTypes.shape({
    spell: spellType.isRequired,
  }).isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default SpellBlock;
