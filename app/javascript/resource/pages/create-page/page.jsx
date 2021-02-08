import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import Page from 'components/page';
import { valueOrDefault } from 'utils/object';
import {
  titleize,
  underscore,
} from 'utils/string';

const defaultBreadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
];
const generateBreadcrumbs = ({ baseUrl, breadcrumbs, resourceName }) => (
  [
    ...valueOrDefault(breadcrumbs, defaultBreadcrumbs),
    {
      label: titleize(pluralize(resourceName)),
      url: baseUrl,
    },
    {
      label: `Create ${titleize(resourceName)}`,
      url: `${baseUrl}/create`,
      active: true,
    },
  ]
);

const CreatePage = (props) => {
  const {
    Form,
    hooks,
    resourceName,
  } = props;
  const {
    useForm,
    useSubmitRequest,
    useSubmitStatus,
    useUpdateForm,
  } = hooks;
  const {
    data,
    errors,
  } = useForm();
  const submitStatus = useSubmitStatus();
  const submitForm = useSubmitRequest();
  const updateForm = useUpdateForm();
  const baseUrl = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.baseUrl,
    `/${underscore(pluralize(resourceName)).replace(/_/g, '-')}`,
  );
  const breadcrumbs = generateBreadcrumbs({
    baseUrl,
    // eslint-disable-next-line react/destructuring-assignment
    breadcrumbs: props.breadcrumbs,
    resourceName,
  });

  return (
    <Page breadcrumbs={breadcrumbs}>
      <h1>Create {titleize(resourceName)}</h1>

      <Form
        data={data}
        errors={errors}
        onChangeAction={updateForm}
        onSubmitAction={submitForm}
        status={submitStatus}
      />
    </Page>
  );
};

CreatePage.defaultProps = {
  Form: null,
  baseUrl: null,
  breadcrumbs: null,
};

CreatePage.propTypes = {
  Form: PropTypes.elementType,
  baseUrl: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  hooks: PropTypes.shape({
    useForm: PropTypes.func.isRequired,
    useSubmitRequest: PropTypes.func.isRequired,
    useSubmitStatus: PropTypes.func.isRequired,
    useUpdateForm: PropTypes.func.isRequired,
  }).isRequired,
  resourceName: PropTypes.string.isRequired,
};

export default CreatePage;
