import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import Page from 'components/page';
import {
  exists,
  valueOrDefault,
} from 'utils/object';
import { titleize } from 'utils/string';
import UpdatePageContent from './content';

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
  const name = resource && resource[resourceNameProp];
  const loaded = exists(name) && name.length > 0;

  return (
    [
      ...valueOrDefault(breadcrumbs, defaultBreadcrumbs),
      {
        label: titleize(pluralize(resourceName)),
        url: baseUrl,
      },
      {
        label: (loaded ? name : 'Loading...'),
        url: `${baseUrl}/${id}`,
        active: !loaded,
      },
      {
        label: 'Update',
        url: `${baseUrl}/${id}/update`,
        active: true,
      },
    ]
  );
};

const UpdatePage = (props) => {
  const {
    Form,
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
    useDataStatus,
    useForm,
    useRequestData,
    useSubmitRequest,
    useSubmitStatus,
    useUpdateForm,
  } = hooks;
  const { data, errors } = useForm();
  const status = useDataStatus();
  const submitStatus = useSubmitStatus();
  const requestData = useRequestData({ wildcards: { id } });
  const submitForm = useSubmitRequest({ wildcards: { id } });
  const updateForm = useUpdateForm();
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

  requestData();

  return (
    <Page breadcrumbs={breadcrumbs}>
      <h1>Update {titleize(resourceName)}</h1>

      <UpdatePageContent
        Form={Form}
        data={data}
        errors={errors}
        onChangeAction={updateForm}
        onSubmitAction={submitForm}
        resourceName={resourceName}
        status={status}
        submitStatus={submitStatus}
      />
    </Page>
  );
};

UpdatePage.defaultProps = {
  Form: null,
  breadcrumbs: null,
  mapData: null,
  resourceNameProp: 'name',
};

UpdatePage.propTypes = {
  Form: PropTypes.elementType,
  baseUrl: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  hooks: PropTypes.shape({
    useDataStatus: PropTypes.func.isRequired,
    useForm: PropTypes.func.isRequired,
    useRequestData: PropTypes.func.isRequired,
    useSubmitRequest: PropTypes.func.isRequired,
    useSubmitStatus: PropTypes.func.isRequired,
    useUpdateForm: PropTypes.func.isRequired,
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
