import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../../components/page';
import UpdateBookBreadcrumbs from './breadcrumbs';
import UpdateBookForm from './form';
import { hooks } from '../../store/updateFindBook';

const getBookId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const { useRequestData } = hooks;

const UpdateBookPage = (props) => {
  const id = getBookId(props);
  const requestData = useRequestData({ wildcards: { id } });

  requestData();

  return (
    <Page breadcrumbs={<UpdateBookBreadcrumbs />} className="page-update-book">
      <h1>Update Book</h1>

      <UpdateBookForm />
    </Page>
  );
};

UpdateBookPage.defaultProps = {};

UpdateBookPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UpdateBookPage;
