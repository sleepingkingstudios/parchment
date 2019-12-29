import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../../components/page';
import ShowBookBlock from './block';
import ShowBookBreadcrumbs from './breadcrumbs';
import ShowBookHeading from './heading';
import { hooks } from '../../store/showFindBook';

const getBookId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const { useRequestData } = hooks;

const ShowBookPage = (props) => {
  const id = getBookId(props);
  const requestData = useRequestData({ wildcards: { id } });

  requestData();

  return (
    <Page breadcrumbs={<ShowBookBreadcrumbs />} className="page-show-book">
      <ShowBookHeading />

      <ShowBookBlock />
    </Page>
  );
};

ShowBookPage.defaultProps = {};

ShowBookPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowBookPage;
