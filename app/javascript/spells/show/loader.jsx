import React from 'react';
import PropTypes from 'prop-types';

import ConnectSpellLoader from '../loader/index';
import SpellPage from './page';
import findSpell from './store/index';

const getSpellId = (match) => {
  const { params } = match;

  return params.id;
};

const ConnectedSpellLoader = ConnectSpellLoader(findSpell);

const SpellPageLoader = (props) => {
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

SpellPageLoader.defaultProps = {};

SpellPageLoader.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SpellPageLoader;
