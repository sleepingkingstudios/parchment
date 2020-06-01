import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PlainText from '../../../components/plain-text';
import RichText from '../../../components/rich-text';
import { mechanicType } from '../../entities';
import { exists } from '../../../utils/object';

import './mechanic-block-styles.css';

const renderAdditionalDetails = ({ data, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  if (!exists(data.notes) || data.notes.length === 0) { return null; }

  return (
    <Fragment>
      <hr />

      <div className="mechanic-block-additional-details">
        <p><em>Notes</em></p>

        <PlainText className="mechanic-block-notes" text={data.notes} />
      </div>
    </Fragment>
  );
};

const MechanicBlockType = ({ type }) => {
  if (!exists(type)) { return null; }

  const unqualifiedType = type.split('::')[1];

  return (
    <small className="mechanic-block-type">({ unqualifiedType })</small>
  );
};

const MechanicBlock = ({ data, showAdditionalDetails }) => (
  <div className="mechanic-block">
    <p className="mechanic-block-name">
      { data.name } <MechanicBlockType {...data} />
    </p>

    <p className="mechanic-block-short-description">
      <strong>Short Description:</strong> { data.shortDescription }
    </p>

    <RichText className="mechanic-block-description" text={data.description} />

    { renderAdditionalDetails({ data, showAdditionalDetails })}
  </div>
);

MechanicBlock.defaultProps = {
  showAdditionalDetails: false,
};

MechanicBlock.propTypes = {
  data: mechanicType.isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default MechanicBlock;
