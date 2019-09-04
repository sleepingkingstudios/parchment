import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../../components/form';
import FormRow from '../../../components/form/row';
import {
  AbbreviationField,
  CancelButton,
  NameField,
  PlaytestField,
  PublicationDateField,
  PublisherNameField,
  SlugField,
  SubmitButton,
} from './fields';
import { formErrorsType } from '../../../components/form/entities';
import { publicationFormType } from '../../entities';

const PublicationForm = ({
  data,
  errors,
  isUpdate,
  onChangeAction,
  onSubmitAction,
  status,
}) => {
  const form = {
    data,
    errors,
    path: ['publication'],
    onChangeAction,
    onSubmitAction,
  };

  return (
    <Form className="publication-form" form={form}>
      <FormRow>
        <NameField form={form} colWidth="12" />

        <PublisherNameField form={form} colWidth="8" />

        <PublicationDateField form={form} colWidth="4" />

        <SlugField form={form} colWidth="8" />

        <AbbreviationField form={form} colWidth="2" />

        <PlaytestField form={form} colWidth="2" />
      </FormRow>

      <FormRow align="right">
        <CancelButton
          colWidth="3"
          form={form}
          isUpdate={isUpdate}
        />
        <SubmitButton
          colWidth="3"
          form={form}
          isUpdate={isUpdate}
          status={status}
        />
      </FormRow>
    </Form>
  );
};

PublicationForm.defaultProps = {
  isUpdate: false,
};

PublicationForm.propTypes = {
  data: publicationFormType.isRequired,
  errors: formErrorsType.isRequired,
  isUpdate: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default PublicationForm;
