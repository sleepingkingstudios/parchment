import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pluralise from 'pluralise';

import { exists } from '../../../utils/object';
import { underscore } from '../../../utils/string';

const emptySource = () => (
  <span className="text-muted">Homebrew</span>
);

const sourceLink = ({ id, sourceType }) => {
  const sourcePath = pluralise(2, underscore(sourceType));

  return `/${sourcePath}/${id}`;
};

const SpellSourceLink = ({ source, sourceType }) => {
  if (!exists(source) || !exists(sourceType)) { return emptySource(); }

  const { id, name } = source;

  return (
    <Link to={sourceLink({ id, sourceType })}>{ name }</Link>
  );
};

SpellSourceLink.defaultProps = {
  source: null,
  sourceType: null,
};

SpellSourceLink.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  sourceType: PropTypes.string,
};

export default SpellSourceLink;
