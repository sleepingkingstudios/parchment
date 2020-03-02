import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import Page from '../page';
import ShowPageBlock from './block';
import ShowPageHeading from './heading';
import { valueOrDefault } from '../../utils/object';
import { underscore } from '../../utils/string';

const defaultMapData = resourceName => data => (data[resourceName]);

const generateBreadcrumbs = ({
  id,
  resource,
  resourceName,
  resourceNameProp,
}) => (
  [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: pluralize(resourceName),
      url: `/${underscore(pluralize(resourceName))}`,
    },
    {
      label: ((resource && resource[resourceNameProp]) || 'Loading...'),
      url: `/${underscore(pluralize(resourceName))}/${id}`,
      active: true,
    },
  ]
);

const getResourceId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const ShowPage = (props) => {
  const {
    Block,
    breadcrumbs,
    deleteEndpoint,
    endpoint,
    match,
    mapData,
    resourceName,
    resourceNameProp,
  } = props;
  const singularResourceName = underscore(resourceName);
  const id = getResourceId({ match });
  const { hooks } = endpoint;
  const { useEndpoint, useRequestData } = hooks;
  const { data } = useEndpoint();
  const actualMapData = valueOrDefault(
    mapData,
    defaultMapData(singularResourceName),
  );
  const mappedData = actualMapData(data);
  const requestData = useRequestData({ wildcards: { id } });
  const actualBreadcrumbs = valueOrDefault(
    breadcrumbs,
    generateBreadcrumbs({
      id,
      resource: mappedData,
      resourceName,
      resourceNameProp,
    }),
  );

  requestData();

  return (
    <Page breadcrumbs={actualBreadcrumbs} className={`page-show-${singularResourceName}`}>
      <ShowPageHeading
        deleteEndpoint={deleteEndpoint}
        id={id}
        resource={mappedData}
        resourceName={resourceName}
      />

      <ShowPageBlock
        Block={Block}
        endpoint={endpoint}
        mapData={mapData}
        resourceName={resourceName}
      />
    </Page>
  );
};

ShowPage.defaultProps = {
  breadcrumbs: null,
  mapData: null,
  resourceNameProp: 'name',
};

ShowPage.propTypes = {
  Block: PropTypes.elementType.isRequired,
  breadcrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.element,
  ]),
  deleteEndpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useDeleteData: PropTypes.func.isRequired,
    }),
  }).isRequired,
  endpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func.isRequired,
      useRequestData: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  mapData: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  resourceName: PropTypes.string.isRequired,
  resourceNameProp: PropTypes.string,
};

export default ShowPage;
