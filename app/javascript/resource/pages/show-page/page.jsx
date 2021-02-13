import React from 'react';
import PropTypes from 'prop-types';

import HeadingWithButtons from 'components/heading-with-buttons';
import Page from 'components/page';
import { valueOrDefault } from 'utils/object';
import { titleize } from 'utils/string';
import ShowPageContent from './content';

const generateActions = ({ destroy, resources }) => {
  const actions = Object.keys(resources);

  if (destroy) { actions.push('destroy'); }

  return actions;
};
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
    pluralDisplayName,
    resource,
    resourceNameProp,
  } = props;

  return (
    [
      ...valueOrDefault(breadcrumbs, defaultBreadcrumbs),
      {
        label: titleize(pluralDisplayName),
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
const generateDeleteButton = ({ destroyRequest, singularDisplayName }) => ({
  buttonStyle: 'danger',
  label: `Delete ${titleize(singularDisplayName)}`,
  onClick: destroyRequest,
  outline: true,
});
const generateUpdateButton = ({ baseUrl, id, singularDisplayName }) => ({
  label: `Update ${titleize(singularDisplayName)}`,
  outline: true,
  url: `${baseUrl}/${id}/update`,
});
const generateButtons = (options) => {
  const {
    actions,
    baseUrl,
    destroyRequest,
    id,
    resource,
    singularDisplayName,
  } = options;

  if (!(resource && resource.id)) { return []; }

  const buttons = [];

  if (actions.includes('update')) {
    buttons.push(generateUpdateButton({ baseUrl, id, singularDisplayName }));
  }

  if (actions.includes('destroy')) {
    buttons.push(generateDeleteButton({ destroyRequest, singularDisplayName }));
  }

  return buttons;
};

const ShowPage = (props) => {
  const {
    Block,
    baseUrl,
    destroy,
    hooks,
    match,
    resourceName,
    resourceNameProp,
    resources,
    singularResourceName,
  } = props;
  const pluralDisplayName = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.pluralDisplayName,
    resourceName,
  );
  const singularDisplayName = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.singularDisplayName,
    singularResourceName,
  );
  const mapData = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.mapData,
    data => data[singularResourceName],
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
  const actions = generateActions({ destroy, resources });
  const breadcrumbs = generateBreadcrumbs({
    baseUrl,
    // eslint-disable-next-line react/destructuring-assignment
    breadcrumbs: props.breadcrumbs,
    id,
    pluralDisplayName,
    resource,
    resourceName,
    resourceNameProp,
  });
  const buttons = generateButtons({
    actions,
    baseUrl,
    destroyRequest,
    id,
    resource,
    resourceName,
    singularDisplayName,
  });

  requestData();

  return (
    <Page breadcrumbs={breadcrumbs}>
      <HeadingWithButtons buttons={buttons}>
        Show {titleize(singularDisplayName)}
      </HeadingWithButtons>

      <ShowPageContent
        Block={Block}
        data={data}
        pluralDisplayName={pluralDisplayName}
        resourceName={resourceName}
        singularDisplayName={singularDisplayName}
        status={status}
      />
    </Page>
  );
};

ShowPage.defaultProps = {
  Block: null,
  breadcrumbs: null,
  destroy: true,
  mapData: null,
  pluralDisplayName: null,
  resourceNameProp: 'name',
  singularDisplayName: null,
};

ShowPage.propTypes = {
  Block: PropTypes.elementType,
  baseUrl: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  destroy: PropTypes.bool,
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
  pluralDisplayName: PropTypes.string,
  resourceName: PropTypes.string.isRequired,
  resourceNameProp: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  resources: PropTypes.object.isRequired,
  singularDisplayName: PropTypes.string,
  singularResourceName: PropTypes.string.isRequired,
};

export default ShowPage;
