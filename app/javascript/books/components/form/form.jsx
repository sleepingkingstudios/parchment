import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../../components/form';
import FormRow from '../../../components/form/row';

import { formErrorsType } from '../../../components/form/entities';
import { bookFormType } from '../../entities';
import {
  CancelButton,
  PublicationDateField,
  PublisherNameField,
  SlugField,
  SubmitButton,
  TitleField,
} from './fields';

const BookForm = (props) => {
  const {
    data,
    errors,
    isUpdate,
    onChangeAction,
    onSubmitAction,
    status,
  } = props;
  const form = {
    data,
    errors,
    path: ['book'],
    onChangeAction,
    onSubmitAction,
  };

  return (
    <Form className="book-form" form={form}>
      <FormRow>
        <TitleField form={form} colWidth="8" />

        <SlugField form={form} colWidth="4" />

        <PublisherNameField form={form} colWidth="8" />

        <PublicationDateField form={form} colWidth="4" />
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

BookForm.defaultProps = {
  isUpdate: false,
};

BookForm.propTypes = {
  data: bookFormType.isRequired,
  errors: formErrorsType.isRequired,
  isUpdate: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default BookForm;
