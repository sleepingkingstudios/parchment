import PropTypes from 'prop-types';

import FormCheckboxInput from '../../../components/form/checkbox-input';
import FormInput from '../../../components/form/input';
import {
  formField,
  formGroup,
} from '../../../components/form/wrappers';
import { formType } from '../../../components/form/entities';
import PublicationFormCancelButton from './cancelButton';
import PublicationFormSubmitButton from './submitButton';

const AbbreviationField = formField(FormInput, 'abbreviation');

AbbreviationField.defaultProps = {};

AbbreviationField.propTypes = {
  form: formType.isRequired,
};

const NameField = formField(FormInput, 'name');

const CancelButton = formGroup(
  PublicationFormCancelButton,
  { displayName: 'CancelButton' },
);

CancelButton.defaultProps = {};

CancelButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool.isRequired,
};

NameField.defaultProps = {};

NameField.propTypes = {
  form: formType.isRequired,
};

const PlaytestField = formField(FormCheckboxInput, 'playtest');

PlaytestField.defaultProps = {};

PlaytestField.propTypes = {
  form: formType.isRequired,
};

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

const SubmitButton = formGroup(
  PublicationFormSubmitButton,
  { displayName: 'SubmitButton' },
);

SubmitButton.defaultProps = {
  disabled: false,
};

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  form: formType.isRequired,
  status: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool.isRequired,
};

export {
  AbbreviationField,
  CancelButton,
  NameField,
  PlaytestField,
  PublicationDateField,
  PublisherNameField,
  SlugField,
  SubmitButton,
};
