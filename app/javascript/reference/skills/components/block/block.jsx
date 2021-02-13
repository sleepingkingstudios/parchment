import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RichText from '../../../../components/rich-text';
import { skillType } from '../../entities';
import { capitalize } from '../../../../utils/string';

import './skill-block-styles.css';

const renderAdditionalDetails = ({ showAdditionalDetails, skill }) => {
  if (!showAdditionalDetails) { return null; }

  return (
    <Fragment>
      <hr />

      <div className="skill-block-additional-details">
        <p className="skill-block-slug">
          <em>Slug:</em> { skill.slug }
        </p>

        <p className="skill-block-short-description">
          <em>Short Description:</em> { skill.shortDescription }
        </p>
      </div>
    </Fragment>
  );
};

const SkillBlock = ({ data, showAdditionalDetails }) => {
  const { skill } = data;

  return (
    <div className="skill-block">
      <p className="skill-block-name">{ skill.name }</p>

      <p className="skill-block-ability-score">
        <strong>Ability Score:</strong> { capitalize(skill.abilityScore) }
      </p>

      <RichText className="skill-block-description" text={skill.description} />

      { renderAdditionalDetails({ showAdditionalDetails, skill })}
    </div>
  );
};


SkillBlock.defaultProps = {
  showAdditionalDetails: false,
};

SkillBlock.propTypes = {
  data: PropTypes.shape({
    skill: skillType.isRequired,
  }).isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default SkillBlock;
