import React from 'react';
import PropTypes from 'prop-types';

import SelectSourceField, {
  mapSourceToValue,
  mapValueToSource,
} from 'origins/components/select-source-field';
import FormCancelButton from '../../../components/form/cancel-button';
import FormSubmitButton from '../../../components/form/submit-button';
import FormCheckboxInput from '../../../components/form/checkbox-input';
import FormInput from '../../../components/form/input';
import FormNumericInput from '../../../components/form/numeric-input';
import FormSelectInput from '../../../components/form/select-input';
import FormTextAreaInput from '../../../components/form/text-area-input';
import {
  formField,
  formGroup,
} from '../../../components/form/wrappers';
import { formType } from '../../../components/form/entities';
import selectSchoolOptions from './selectSchoolOptions';
import { dig } from '../../../utils/object';
import { slugify } from '../../../utils/string';

const generatePlaceholder = propName => ({ data, path }) => (
  slugify(dig(data, ...path, propName))
);

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

const ShortDescriptionField = formField(FormInput, 'shortDescription');

ShortDescriptionField.defaultProps = {};

ShortDescriptionField.propTypes = {
  form: formType.isRequired,
};

const SlugField = formField(FormInput, 'slug', { mapDataToPlaceholder: generatePlaceholder('name') });

SlugField.defaultProps = {};

SlugField.propTypes = {
  form: formType.isRequired,
};

const SourceField = formField(SelectSourceField, 'source', {
  mapDataToValue: mapSourceToValue,
  mapValueToData: mapValueToSource,
});

SourceField.defaultProps = {};

SourceField.propTypes = {
  form: formType.isRequired,
};

const SpellFormCancelButton = ({ form, isUpdate }) => (
  <FormCancelButton form={form} isUpdate={isUpdate} resourceName="Spell" propName="slug" />
);

const CancelButton = formGroup(SpellFormCancelButton, { displayName: 'CancelButton' });

CancelButton.defaultProps = {};

CancelButton.propTypes = {
  form: formType.isRequired,
  isUpdate: PropTypes.bool.isRequired,
};

const SpellFormSubmitButton = ({ form, isUpdate, status }) => (
  <FormSubmitButton form={form} actionName={isUpdate ? 'Update' : 'Create'} resourceName="Spell" status={status} />
);

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
  ShortDescriptionField,
  SlugField,
  SourceField,
  SubmitButton,
};
