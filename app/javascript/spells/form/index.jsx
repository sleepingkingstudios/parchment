import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/form';
import FormRow from '../../components/form/row';
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
  SubmitButton,
} from './fields';

import { formErrorsType } from '../../components/form/entities';
import { spellType } from '../entities';

const SpellForm = ({
  errors,
  isUpdate,
  onChangeAction,
  onSubmitAction,
  requestStatus,
  spell,
}) => {
  const form = {
    data: spell,
    errors,
    namespace: 'spell',
    onChangeAction,
    onSubmitAction,
  };

  return (
    <Form className="spell-form" form={form}>
      <FormRow>
        <NameField form={form} colWidth="12" />

        <SchoolField form={form} colWidth="8" />

        <LevelField form={form} colWidth="2" />

        <RitualField form={form} colWidth="2" />

        <CastingTimeField form={form} colWidth="4" />

        <RangeField form={form} colWidth="4" />

        <DurationField form={form} colWidth="4" />

        <SpellFormComponentsField form={form} />

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
          requestStatus={requestStatus}
        />
      </FormRow>
    </Form>
  );
};

SpellForm.defaultProps = {
  isUpdate: false,
};

SpellForm.propTypes = {
  errors: formErrorsType.isRequired,
  isUpdate: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  requestStatus: PropTypes.string.isRequired,
  spell: spellType.isRequired,
};

export default SpellForm;
