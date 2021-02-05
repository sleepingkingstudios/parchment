import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import HeadingWithButtons from 'components/heading-with-buttons';
import Page from 'components/page';
import { valueOrDefault } from 'utils/object';
import { titleize } from 'utils/string';
import ShowPageContent from './content';

const defaultBreadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
];
const generateBreadcrumbs = (props) => {
  const {
    baseUrl,
    breadcrumbs,
    id,
    resource,
    resourceName,
    resourceNameProp,
  } = props;

  return (
    [
      ...valueOrDefault(breadcrumbs, defaultBreadcrumbs),
      {
        label: titleize(pluralize(resourceName)),
        url: baseUrl,
      },
      {
        label: ((resource && resource[resourceNameProp]) || 'Loading...'),
        url: `${baseUrl}/${id}`,
        active: true,
      },
    ]
  );
};
const generateDeleteButton = ({ destroyRequest, resourceName }) => ({
  buttonStyle: 'danger',
  label: `Delete ${titleize(resourceName)}`,
  onClick: destroyRequest,
  outline: true,
});
const generateUpdateButton = ({ baseUrl, id, resourceName }) => ({
  label: `Update ${titleize(resourceName)}`,
  outline: true,
  url: `${baseUrl}/${id}/update`,
});
const generateButtons = ({
  baseUrl,
  destroyRequest,
  id,
  resource,
  resourceName,
}) => {
  if (!(resource && resource.id)) { return []; }

  return [
    generateUpdateButton({ baseUrl, id, resourceName }),
    generateDeleteButton({ destroyRequest, resourceName }),
  ];
};

const ShowPage = (props) => {
  const {
    Block,
    baseUrl,
    hooks,
    match,
    resourceName,
    resourceNameProp,
  } = props;
  const mapData = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.mapData,
    data => data[resourceName],
  );
  const { params } = match;
  const { id } = params;
  const {
    useData,
    useDataStatus,
    useDestroyRequest,
    useRequestData,
  } = hooks;
  const data = useData();
  const status = useDataStatus();
  const destroyRequest = useDestroyRequest({ wildcards: { id } });
  const requestData = useRequestData({ wildcards: { id } });
  const resource = mapData(data);
  const breadcrumbs = generateBreadcrumbs({
    baseUrl,
    // eslint-disable-next-line react/destructuring-assignment
    breadcrumbs: props.breadcrumbs,
    id,
    resource,
    resourceName,
    resourceNameProp,
  });
  const buttons = generateButtons({
    baseUrl,
    destroyRequest,
    id,
    resource,
    resourceName,
  });

  requestData();

  return (
    <Page breadcrumbs={breadcrumbs}>
      <HeadingWithButtons buttons={buttons}>
        Show {titleize(resourceName)}
      </HeadingWithButtons>

      <ShowPageContent
        Block={Block}
        data={data}
        resourceName={resourceName}
        status={status}
      />
    </Page>
  );
};

ShowPage.defaultProps = {
  Block: null,
  breadcrumbs: null,
  mapData: null,
  resourceNameProp: 'name',
};

ShowPage.propTypes = {
  Block: PropTypes.elementType,
  baseUrl: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  hooks: PropTypes.shape({
    useData: PropTypes.func.isRequired,
    useDataStatus: PropTypes.func.isRequired,
    useDestroyRequest: PropTypes.func.isRequired,
    useRequestData: PropTypes.func.isRequired,
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
