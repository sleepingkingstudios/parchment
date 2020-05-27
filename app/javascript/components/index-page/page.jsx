import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import HeadingWithButtons from '../heading-with-buttons';
import Page from '../page';
import IndexPageTable from './table';
import { valueOrDefault } from '../../utils/object';
import { underscore } from '../../utils/string';

const generateButtons = resourceName => (
  [
    {
      label: `Create ${resourceName}`,
      outline: true,
      url: `/${underscore(pluralize(resourceName))}/create`,
    },
  ]
);
const generateBreadcrumbs = ({ resourceName }) => (
  [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: pluralize(resourceName),
      url: `/${underscore(pluralize(resourceName))}`,
      active: true,
    },
  ]
);

const IndexPage = (props) => {
  const {
    Table,
    buttons,
    breadcrumbs,
    columns,
    endpoint,
    mapData,
    resourceName,
  } = props;
  const pluralResourceName = underscore(pluralize(resourceName));
  const { hooks } = endpoint;
  const { useRequestData } = hooks;

  const requestData = useRequestData();

  requestData();

  return (
    <Page
      breadcrumbs={valueOrDefault(breadcrumbs, generateBreadcrumbs({ resourceName }))}
      className={`page-${pluralResourceName.replace(/_/g, '-')}`}
    >
      <HeadingWithButtons buttons={valueOrDefault(buttons, generateButtons(resourceName))}>
        {pluralize(resourceName)}
      </HeadingWithButtons>

      <IndexPageTable
        Table={Table}
        columns={columns}
        endpoint={endpoint}
        mapData={mapData}
        resourceName={resourceName}
      />
    </Page>
  );
};

IndexPage.defaultProps = {
  Table: null,
  buttons: null,
  breadcrumbs: null,
  mapData: null,
};

IndexPage.propTypes = {
  Table: PropTypes.elementType,
  buttons: PropTypes.arrayOf(PropTypes.object),
  breadcrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.element,
    PropTypes.elementType,
  ]),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  endpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useRequestData: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  mapData: PropTypes.func,
  resourceName: PropTypes.string.isRequired,
};

export default IndexPage;
