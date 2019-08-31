import React from 'react';
import PropTypes from 'prop-types';

import ConnectSpellLoader from '../loader/index';
import UpdateSpellPage from './page';
import findSpell from '../store/updateFindSpell';

const getSpellId = (match) => {
  const { params } = match;

  return params.id;
};

const ConnectedSpellLoader = ConnectSpellLoader(findSpell);

const LoadedSpellPage = (props) => {
  const { match, ...rest } = props;
  const id = getSpellId(match);

  return (
    <ConnectedSpellLoader
      spellId={id}
      render={({ spell, status }) => (
        <UpdateSpellPage
          {...rest}
          spell={spell}
          status={status}
        />
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
