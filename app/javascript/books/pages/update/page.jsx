import React from 'react';
import PropTypes from 'prop-types';

import { BookForm } from '../../components/form';
import { UpdatePage } from '../../../components/update-page';
import findEndpoint from '../../store/updateFindBook';
import formEndpoint from '../../store/updateBookForm';

const UpdateBookPage = ({ match }) => (
  <UpdatePage
    Form={BookForm}
    findEndpoint={findEndpoint}
    formEndpoint={formEndpoint}
    mapData={data => data}
    mapResource={data => data.book}
    match={match}
    resourceName="Book"
    resourceNameProp="title"
  />
);

UpdateBookPage.defaultProps = {};

UpdateBookPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UpdateBookPage;
