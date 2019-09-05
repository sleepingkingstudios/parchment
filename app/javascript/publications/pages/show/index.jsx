import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../../components/page';
import ShowPublicationBlock from './block';
import ShowPublicationBreadcrumbs from './breadcrumbs';
import ShowPublicationHeading from './heading';
import { hooks } from '../../store/showFindPublication';

const getPublicationId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const { useRequestData } = hooks;

const ShowPublicationPage = (props) => {
  const id = getPublicationId(props);
  const requestData = useRequestData({ wildcards: { id } });

  requestData();

  return (
    <Page breadcrumbs={<ShowPublicationBreadcrumbs />} className="page-show-publication">
      <ShowPublicationHeading />

      <ShowPublicationBlock />
    </Page>
  );
};

ShowPublicationPage.defaultProps = {};

ShowPublicationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowPublicationPage;
