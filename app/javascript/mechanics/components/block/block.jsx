import React from 'react';

import PlainText from '../../../components/plain-text';
import { mechanicType } from '../../entities';
import { exists } from '../../../utils/object';

import './mechanic-block-styles.css';

const MechanicBlockType = ({ type }) => {
  if (!exists(type)) { return null; }

  const unqualifiedType = type.split('::')[1];

  return (
    <small className="mechanic-block-type">({ unqualifiedType })</small>
  );
};

const MechanicBlock = ({ data }) => (
  <div className="mechanic-block">
    <p className="mechanic-block-name">
      { data.name } <MechanicBlockType {...data} />
    </p>

    <p className="mechanic-block-short-description">
      <strong>Short Description:</strong> { data.shortDescription }
    </p>

    <PlainText className="mechanic-block-description" text={data.description} />
  </div>
);

MechanicBlock.defaultProps = {};

MechanicBlock.propTypes = {
  data: mechanicType.isRequired,
};

export default MechanicBlock;
