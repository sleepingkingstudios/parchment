import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/form';
import FormCheckboxInput from '../../components/form/checkbox-input';
import FormInput from '../../components/form/input';
import FormNumericInput from '../../components/form/numeric-input';
import FormRow from '../../components/form/row';
import FormSelectInput from '../../components/form/select-input';
import FormSubmitButton from '../../components/form/submit-button';
import FormTextAreaInput from '../../components/form/text-area-input';
import SpellFormComponentsField from './components-field';

import { spellType } from '../entities';

import {
  formField,
  formGroup,
} from '../../components/form/wrappers';
import selectSchoolOptions from './selectSchoolOptions';

export const NameField = formField(FormInput, 'name');

export const SchoolField = formField(FormSelectInput, 'school');

export const LevelField = formField(FormNumericInput, 'level');

export const RitualField = formField(FormCheckboxInput, 'ritual');

export const CastingTimeField = formField(FormInput, 'castingTime');

export const RangeField = formField(FormInput, 'range');

export const DurationField = formField(FormInput, 'duration');

export const DescriptionField = formField(FormTextAreaInput, 'description');

export const SubmitButton = formGroup(FormSubmitButton, { displayName: 'SubmitButton' });

const submitLabel = isUpdate => (isUpdate ? 'Update Spell' : 'Create Spell');

const SpellForm = ({
  isUpdate, onChangeAction, onSubmitAction, spell,
}) => {
  const form = {
    data: spell,
    namespace: 'spell',
    onChangeAction,
    onSubmitAction,
  };

  return (
    <Form className="spell-form" form={form}>
      <FormRow>
        <NameField form={form} colWidth="12" />

        <SchoolField form={form} colWidth="8" options={selectSchoolOptions} />

        <LevelField form={form} colWidth="2" />

        <RitualField form={form} colWidth="2" />

        <CastingTimeField form={form} colWidth="4" />

        <RangeField form={form} colWidth="4" />

        <DurationField form={form} colWidth="4" />

        <SpellFormComponentsField form={form} />

        <DescriptionField form={form} colWidth="12" rows={5} />
      </FormRow>

      <FormRow align="right">
        <SubmitButton colWidth="4" form={form} block>{ submitLabel(isUpdate) }</SubmitButton>
      </FormRow>
    </Form>
  );
};

SpellForm.defaultProps = {
  isUpdate: false,
};

SpellForm.propTypes = {
  isUpdate: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  spell: spellType.isRequired,
};

export default SpellForm;
