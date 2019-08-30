import PropTypes from 'prop-types';

import FormCheckboxInput from '../../../components/form/checkbox-input';
import FormInput from '../../../components/form/input';
import FormNumericInput from '../../../components/form/numeric-input';
import FormSelectInput from '../../../components/form/select-input';
import FormTextAreaInput from '../../../components/form/text-area-input';
import SpellFormCancelButton from './cancel-button';
import SpellFormSubmitButton from './submit-button';

import {
  formField,
  formGroup,
} from '../../../components/form/wrappers';
import { formType } from '../../../components/form/entities';
import selectSchoolOptions from './selectSchoolOptions';

const CastingTimeField = formField(FormInput, 'castingTime');

CastingTimeField.defaultProps = {};

CastingTimeField.propTypes = {
  form: formType.isRequired,
};

const DescriptionField = formField(FormTextAreaInput, 'description');

DescriptionField.defaultProps = {};

DescriptionField.propTypes = {
  form: formType.isRequired,
};

const DurationField = formField(FormInput, 'duration');

DurationField.defaultProps = {};

DurationField.propTypes = {
  form: formType.isRequired,
};

const LevelField = formField(FormNumericInput, 'level');

LevelField.defaultProps = {};

LevelField.propTypes = {
  form: formType.isRequired,
};

const NameField = formField(FormInput, 'name');

NameField.defaultProps = {};

NameField.propTypes = {
  form: formType.isRequired,
};

const RangeField = formField(FormInput, 'range');

RangeField.defaultProps = {};

RangeField.propTypes = {
  form: formType.isRequired,
};

const RitualField = formField(FormCheckboxInput, 'ritual');

RitualField.defaultProps = {};

RitualField.propTypes = {
  form: formType.isRequired,
};

const SchoolField = formField(FormSelectInput, 'school');

SchoolField.defaultProps = {
  options: selectSchoolOptions,
};

SchoolField.propTypes = {
  form: formType.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
};

const CancelButton = formGroup(SpellFormCancelButton, { displayName: 'CancelButton' });

CancelButton.defaultProps = {};

CancelButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool.isRequired,
};

const SubmitButton = formGroup(SpellFormSubmitButton, { displayName: 'SubmitButton' });

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
  CastingTimeField,
  DescriptionField,
  DurationField,
  LevelField,
  NameField,
  RangeField,
  RitualField,
  SchoolField,
  SubmitButton,
};
