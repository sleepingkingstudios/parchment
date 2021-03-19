import React from 'react';
import PropTypes from 'prop-types';

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
const generateBreadcrumbs = ({ baseUrl, breadcrumbs, pluralDisplayName }) => (
  [
    ...valueOrDefault(breadcrumbs, defaultBreadcrumbs),
    {
      label: titleize(pluralDisplayName),
      url: baseUrl,
    },
    {
      label: 'Create',
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
    `/${underscore(resourceName).replace(/_/g, '-')}`,
  );
  const breadcrumbs = generateBreadcrumbs({
    baseUrl,
    // eslint-disable-next-line react/destructuring-assignment
    breadcrumbs: props.breadcrumbs,
    pluralDisplayName,
  });

  return (
    <Page breadcrumbs={breadcrumbs}>
      <h1>Create {titleize(singularDisplayName)}</h1>

      <Form
        baseUrl={baseUrl}
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
  pluralDisplayName: null,
  singularDisplayName: null,
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
  pluralDisplayName: PropTypes.string,
  resourceName: PropTypes.string.isRequired,
  singularDisplayName: PropTypes.string,
  singularResourceName: PropTypes.string.isRequired,
};

export default CreatePage;
