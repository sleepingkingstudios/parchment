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

  return (
    <Fragment>
      <hr />

      <div className="spell-block-additional-details">
        <p className="spell-block-slug">
          <em>Slug:</em> { data.slug }
        </p>
        <p className="spell-block-short-description">
          <em>Short Description:</em> { data.shortDescription }
        </p>
      </div>
    </Fragment>
  );
};

const SpellBlock = ({ data, showAdditionalDetails }) => (
  <div className="spell-block">
    <p className="spell-block-name">{ data.name }</p>

    <p className="spell-block-source">
      { exists(data.source) ? data.source.name : 'Homebrew' }
    </p>

    <p className="spell-block-level-school">
      { formatSchoolAndLevel(data) }
    </p>

    <div className="spell-block-stats">
      <p className="spell-block-casting-time">
        <strong>Casting Time:</strong> { data.castingTime }
      </p>
      <p className="spell-block-range">
        <strong>Range:</strong> { data.range }
      </p>
      <p className="spell-block-components">
        <strong>Components:</strong> { formatComponents(data, true) }
      </p>
      <p className="spell-block-duration">
        <strong>Duration:</strong> { data.duration }
      </p>
    </div>

    <RichText className="spell-block-description" text={data.description} />

    { renderAdditionalDetails({ data, showAdditionalDetails }) }
  </div>
);

SpellBlock.defaultProps = {
  showAdditionalDetails: false,
};

SpellBlock.propTypes = {
  data: spellType.isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default SpellBlock;
