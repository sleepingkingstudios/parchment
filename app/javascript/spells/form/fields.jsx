import PropTypes from 'prop-types';

import FormCheckboxInput from '../../components/form/checkbox-input';
import FormInput from '../../components/form/input';
import FormNumericInput from '../../components/form/numeric-input';
import FormSelectInput from '../../components/form/select-input';
import FormSubmitButton from '../../components/form/submit-button';
import FormTextAreaInput from '../../components/form/text-area-input';

import {
  formField,
  formGroup,
} from '../../components/form/wrappers';
import { formType } from '../../components/form/entities';
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

const SubmitButton = formGroup(FormSubmitButton, { displayName: 'SubmitButton' });

SubmitButton.defaultProps = {};

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  form: formType.isRequired,
};

export {
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
