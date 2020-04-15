import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import Page from '../page';
import CreatePageForm from './form';
import { valueOrDefault } from '../../utils/object';
import { underscore } from '../../utils/string';

const generateBreadcrumbs = ({ resourceName }) => (
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
      label: 'Create',
      url: `/${underscore(pluralize(resourceName))}/create`,
      active: true,
    },
  ]
);

const CreatePage = (props) => {
  const {
    Form,
    breadcrumbs,
    endpoint,
    mapData,
    resourceName,
  } = props;
  const singularResourceName = underscore(resourceName);
  const actualBreadcrumbs = valueOrDefault(
    breadcrumbs,
    generateBreadcrumbs({ resourceName }),
  );

  return (
    <Page
      breadcrumbs={actualBreadcrumbs}
      className={`page-create-${singularResourceName.replace(/_/g, '-')}`}
    >
      <h1>Create {resourceName}</h1>

      <CreatePageForm
        Form={Form}
        endpoint={endpoint}
        mapData={mapData}
        resourceName={resourceName}
      />
    </Page>
  );
};

CreatePage.defaultProps = {
  breadcrumbs: null,
  mapData: null,
};

CreatePage.propTypes = {
  Form: PropTypes.elementType.isRequired,
  breadcrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.element,
  ]),
  endpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useEndpoint: PropTypes.func.isRequired,
      useSubmitForm: PropTypes.func.isRequired,
      useUpdateForm: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  mapData: PropTypes.func,
  resourceName: PropTypes.string.isRequired,
};

export default CreatePage;
