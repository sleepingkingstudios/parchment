import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import Page from '../page';
import UpdatePageForm from './form';
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
    },
    {
      label: 'Update',
      active: true,
    },
  ]
);

const getResourceId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const UpdatePage = (props) => {
  const {
    Form,
    breadcrumbs,
    findEndpoint,
    formEndpoint,
    match,
    mapData,
    resourceName,
    resourceNameProp,
  } = props;
  const singularResourceName = underscore(resourceName);
  const id = getResourceId({ match });
  const { hooks } = formEndpoint;
  const { useEndpoint } = hooks;
  const { data } = useEndpoint();
  const actualMapData = valueOrDefault(
    mapData,
    defaultMapData(singularResourceName),
  );
  const mappedData = actualMapData(data);
  const findHooks = findEndpoint.hooks;
  const { useRequestData } = findHooks;
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
    <Page breadcrumbs={actualBreadcrumbs} className={`page-update-${singularResourceName}`}>
      <h1>Update {resourceName}</h1>

      <UpdatePageForm
        Form={Form}
        findEndpoint={findEndpoint}
        formEndpoint={formEndpoint}
        id={id}
        mapData={mapData}
        resourceName={resourceName}
      />
    </Page>
  );
};

UpdatePage.defaultProps = {
  breadcrumbs: null,
  mapData: null,
  resourceNameProp: 'name',
};

UpdatePage.propTypes = {
  Form: PropTypes.elementType.isRequired,
  breadcrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.element,
  ]),
  findEndpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func.isRequired,
      useRequestData: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  formEndpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func.isRequired,
      useSubmitForm: PropTypes.func.isRequired,
      useUpdateForm: PropTypes.func.isRequired,
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

export default UpdatePage;
