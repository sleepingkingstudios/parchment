import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RichText from '../../../../components/rich-text';
import { skillType } from '../../entities';
import { capitalize } from '../../../../utils/string';

import './skill-block-styles.css';

const renderAdditionalDetails = ({ data, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  return (
    <Fragment>
      <hr />

      <div className="skill-block-additional-details">
        <p className="skill-block-slug">
          <em>Slug:</em> { data.slug }
        </p>

        <p className="skill-block-short-description">
          <em>Short Description:</em> { data.shortDescription }
        </p>
      </div>
    </Fragment>
  );
};

const SkillBlock = ({ data, showAdditionalDetails }) => (
  <div className="skill-block">
    <p className="skill-block-name">{ data.name }</p>

    <p className="skill-block-ability-score">
      <strong>Ability Score:</strong> { capitalize(data.abilityScore) }
    </p>

    <RichText className="skill-block-description" text={data.description} />

    { renderAdditionalDetails({ data, showAdditionalDetails })}
  </div>
);

SkillBlock.defaultProps = {
  showAdditionalDetails: false,
};

SkillBlock.propTypes = {
  data: skillType.isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default SkillBlock;
