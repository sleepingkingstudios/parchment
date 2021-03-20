import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import HeadingWithButtons from 'components/heading-with-buttons';
import Page from 'components/page';
import { valueOrDefault } from 'utils/object';
import {
  titleize,
  underscore,
} from 'utils/string';
import IndexPageContent from './content';

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
const generateBreadcrumbs = ({ baseUrl, breadcrumbs, pluralDisplayName }) => (
  [
    ...valueOrDefault(breadcrumbs, defaultBreadcrumbs),
    {
      label: titleize(pluralDisplayName),
      url: `${baseUrl}`,
      active: true,
    },
  ]
);
const generateButtons = ({ actions, baseUrl, singularDisplayName }) => {
  const buttons = [];

  if (actions.includes('create')) {
    buttons.push(
      {
        label: `Create ${titleize(singularDisplayName)}`,
        outline: true,
        url: `${baseUrl}/create`,
      },
    );
  }

  return buttons;
};

const IndexPage = (props) => {
  const {
    Table,
    destroy,
    hooks,
    mapData,
    resourceName,
    resources,
  } = props;
  const PageContent = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.Content,
    IndexPageContent,
  );
  const baseUrl = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.baseUrl,
    `/${underscore(resourceName).replace(/_/g, '-')}`,
  );
  const pluralDisplayName = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.pluralDisplayName,
    underscore(pluralize(resourceName)).replace(/_/, ' '),
  );
  const singularDisplayName = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.singularDisplayName,
    underscore(pluralize.singular(resourceName)).replace(/_/, ' '),
  );
  const actions = generateActions({ destroy, resources });
  const breadcrumbs = generateBreadcrumbs({
    baseUrl,
    // eslint-disable-next-line react/destructuring-assignment
    breadcrumbs: props.breadcrumbs,
    pluralDisplayName,
  });
  const buttons = generateButtons({
    actions,
    baseUrl,
    singularDisplayName,
  });
  const {
    useData,
    useDataStatus,
    useDestroyRequest,
    useRequestData,
  } = hooks;
  const data = useData();
  const status = useDataStatus();
  const requestData = useRequestData();

  requestData();

  return (
    <Page breadcrumbs={breadcrumbs}>
      <HeadingWithButtons buttons={buttons}>
        {titleize(pluralDisplayName)}
      </HeadingWithButtons>

      <PageContent
        DefaultContent={IndexPageContent}
        Table={Table}
        actions={actions}
        baseUrl={baseUrl}
        data={data}
        mapData={mapData}
        pluralDisplayName={pluralDisplayName}
        resourceName={resourceName}
        singularDisplayName={singularDisplayName}
        status={status}
        useDestroyRequest={useDestroyRequest}
      />
    </Page>
  );
};

IndexPage.defaultProps = {
  Content: null,
  Table: null,
  baseUrl: null,
  breadcrumbs: null,
  destroy: true,
  mapData: null,
  pluralDisplayName: null,
  singularDisplayName: null,
};

IndexPage.propTypes = {
  Content: PropTypes.elementType,
  Table: PropTypes.elementType,
  baseUrl: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  destroy: PropTypes.bool,
  hooks: PropTypes.shape({
    useData: PropTypes.func.isRequired,
    useDataStatus: PropTypes.func.isRequired,
    useDestroyRequest: PropTypes.func.isRequired,
    useRequestData: PropTypes.func.isRequired,
  }).isRequired,
  mapData: PropTypes.func,
  pluralDisplayName: PropTypes.string,
  resourceName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  resources: PropTypes.object.isRequired,
  singularDisplayName: PropTypes.string,
};

export default IndexPage;
