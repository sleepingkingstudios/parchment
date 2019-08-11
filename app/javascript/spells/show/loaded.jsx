import React from 'react';
import PropTypes from 'prop-types';

import ConnectedSpellLoader from '../loader/index';
import SpellPage from './page';

const getSpellId = (match) => {
  const { params } = match;

  return params.id;
};

const LoadedSpellPage = (props) => {
  const { match, ...rest } = props;
  const id = getSpellId(match);

  return (
    <ConnectedSpellLoader
      spellId={id}
      render={({ spell, status }) => (
        <SpellPage {...rest} spell={spell} status={status} />
      )}
    />
  );
};

LoadedSpellPage.defaultProps = {};

LoadedSpellPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default LoadedSpellPage;
