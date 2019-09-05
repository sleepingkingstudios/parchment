import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../../components/page';
import UpdatePublicationBreadcrumbs from './breadcrumbs';
import UpdatePublicationForm from './form';
import { hooks } from '../../store/updateFindPublication';

const getPublicationId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const { useRequestData } = hooks;

const UpdatePublicationPage = (props) => {
  const id = getPublicationId(props);
  const requestData = useRequestData({ wildcards: { id } });

  requestData();

  return (
    <Page
      breadcrumbs={<UpdatePublicationBreadcrumbs />}
      className="page-update-publication"
    >
      <h1>Update Publication</h1>

      <UpdatePublicationForm />
    </Page>
  );
};

UpdatePublicationPage.defaultProps = {};

UpdatePublicationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UpdatePublicationPage;
