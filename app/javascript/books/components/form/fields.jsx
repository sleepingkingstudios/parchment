import React from 'react';
import PropTypes from 'prop-types';

import FormCancelButton from '../../../components/form/cancel-button';
import FormSubmitButton from '../../../components/form/submit-button';
import FormInput from '../../../components/form/input';
import {
  formField,
  formGroup,
} from '../../../components/form/wrappers';
import { formType } from '../../../components/form/entities';

const PublicationDateField = formField(FormInput, 'publicationDate');

PublicationDateField.defaultProps = {};

PublicationDateField.propTypes = {
  form: formType.isRequired,
};

const PublisherNameField = formField(FormInput, 'publisherName');

PublisherNameField.defaultProps = {};

PublisherNameField.propTypes = {
  form: formType.isRequired,
};

const SlugField = formField(FormInput, 'slug');

SlugField.defaultProps = {};

SlugField.propTypes = {
  form: formType.isRequired,
};

const TitleField = formField(FormInput, 'title');

TitleField.defaultProps = {};

TitleField.propTypes = {
  form: formType.isRequired,
};

const BookFormCancelButton = ({ form, isUpdate }) => (
  <FormCancelButton form={form} isUpdate={isUpdate} resourceName="Book" propName="slug" />
);

const CancelButton = formGroup(BookFormCancelButton, { displayName: 'CancelButton' });

CancelButton.defaultProps = {};

CancelButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool.isRequired,
};

const BookFormSubmitButton = ({ form, isUpdate }) => (
  <FormSubmitButton form={form} actionName={isUpdate ? 'Update' : 'Create'} resourceName="Book" />
);

const SubmitButton = formGroup(BookFormSubmitButton, { displayName: 'SubmitButton' });

SubmitButton.defaultProps = {
  disabled: false,
};

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  form: formType.isRequired,
  status: PropTypes.string.isRequired,
};

export {
  CancelButton,
  PublicationDateField,
  PublisherNameField,
  SlugField,
  SubmitButton,
  TitleField,
};
