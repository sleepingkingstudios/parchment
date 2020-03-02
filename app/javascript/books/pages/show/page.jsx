import React from 'react';
import PropTypes from 'prop-types';

import { ShowPage } from '../../../components/show-page';

import { BookBlock } from '../../components/block';
import endpoint from '../../store/showFindBook';
import deleteEndpoint from '../../store/deleteBook';

const ShowBookPage = ({ match }) => (
  <ShowPage
    Block={BookBlock}
    deleteEndpoint={deleteEndpoint}
    endpoint={endpoint}
    match={match}
    resourceName="Book"
    resourceNameProp="title"
  />
);

ShowBookPage.defaultProps = {};

ShowBookPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowBookPage;
