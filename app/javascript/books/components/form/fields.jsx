import React from 'react';
import PropTypes from 'prop-types';

import FormCancelButton from '../../../components/form/cancel-button';
import FormInput from '../../../components/form/input';
import BookFormSubmitButton from './submit-button';
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
  <FormCancelButton form={form} isUpdate={isUpdate} resourceName="Book" />
);

const CancelButton = formGroup(BookFormCancelButton, { displayName: 'CancelButton' });

CancelButton.defaultProps = {};

CancelButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool.isRequired,
};

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
