import React from 'react';
import PropTypes from 'prop-types';

import { connectLoader } from '../../../components/loader';
import ShowSpellBlock from './block';
import endpoint from '../../show/store/index';

const mapDataToProps = data => ({ spell: data.spell });
const ConnectedLoader = connectLoader(endpoint);

const ShowSpellBlockLoader = (props) => {
  const { id } = props;
  const requestOptions = {
    wildcards: { id },
  };

  return (
    <ConnectedLoader
      mapDataToProps={mapDataToProps}
      render={ShowSpellBlock}
      requestOptions={requestOptions}
    />
  );
};

ShowSpellBlockLoader.defaultProps = {};

ShowSpellBlockLoader.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShowSpellBlockLoader;
