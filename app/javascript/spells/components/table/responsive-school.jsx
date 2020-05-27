import React from 'react';
import PropTypes from 'prop-types';

import { shortOrdinal } from '../../../utils/number';
import { capitalize } from '../../../utils/string';

const ResponsiveSchool = (props) => {
  const { level, school } = props;
  const prefix = capitalize(school.slice(0, 3));

  if (level === 0) {
    return (
      <span>
        { prefix }
        <span className="d-none d-md-inline">{ school.slice(3) }</span>
        <span className="d-none d-lg-inline"> cantrip</span>
        <span className="d-inline d-lg-none"> 0</span>
      </span>
    );
  }

  return (
    <span>
      <span className="d-none d-lg-inline">{shortOrdinal(level)}-level {school}</span>
      <span className="d-inline d-lg-none">
        {capitalize(prefix)}<span className="d-none d-md-inline">{school.slice(3)}</span> {level}
      </span>
    </span>
  );
};

ResponsiveSchool.defaultProps = {};

ResponsiveSchool.propTypes = {
  level: PropTypes.number.isRequired,
  school: PropTypes.string.isRequired,
};

export default ResponsiveSchool;
