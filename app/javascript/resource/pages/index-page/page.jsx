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
    resourceName,
    resources,
  } = props;
  const baseUrl = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.baseUrl,
    `/${underscore(resourceName).replace(/_/g, '-')}`,
  );
  const pluralDisplayName = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.pluralDisplayName,
    pluralize(resourceName),
  );
  const singularDisplayName = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.singularDisplayName,
    pluralize.singular(resourceName),
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

      <IndexPageContent
        Table={Table}
        actions={actions}
        baseUrl={baseUrl}
        data={data}
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
  Table: null,
  baseUrl: null,
  breadcrumbs: null,
  destroy: true,
  pluralDisplayName: null,
  singularDisplayName: null,
};

IndexPage.propTypes = {
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
  pluralDisplayName: PropTypes.string,
  resourceName: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  resources: PropTypes.object.isRequired,
  singularDisplayName: PropTypes.string,
};

export default IndexPage;
