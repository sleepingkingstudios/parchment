import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../../components/form';
import FormRow from '../../../components/form/row';
import SpellFormComponentsField from './components-field';
import {
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
} from './fields';

import { formErrorsType } from '../../../components/form/entities';
import { spellFormType } from '../../entities';

const SpellForm = ({
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
    path: ['spell'],
    onChangeAction,
    onSubmitAction,
  };

  return (
    <Form className="spell-form" form={form}>
      <FormRow>
        <NameField form={form} colWidth="8" />

        <SlugField form={form} colWidth="4" />

        <SchoolField form={form} colWidth="4" />

        <LevelField form={form} colWidth="2" />

        <RitualField form={form} colWidth="2" />

        <SourceField form={form} colWidth="4" />

        <CastingTimeField form={form} colWidth="4" />

        <RangeField form={form} colWidth="4" />

        <DurationField form={form} colWidth="4" />

        <SpellFormComponentsField form={form} />

        <ShortDescriptionField form={form} colWidth="12" />

        <DescriptionField form={form} colWidth="12" rows={5} />
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

SpellForm.defaultProps = {
  isUpdate: false,
};

SpellForm.propTypes = {
  data: spellFormType.isRequired,
  errors: formErrorsType.isRequired,
  isUpdate: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default SpellForm;
