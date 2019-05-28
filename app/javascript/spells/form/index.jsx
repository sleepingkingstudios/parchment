import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/form';
import FormRow from '../../components/form/row';
import SpellFormComponentsField from './components-field';
import {
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

import { spellType } from '../entities';

const SpellForm = ({
  isUpdate, onChangeAction, onSubmitAction, requestStatus, spell,
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
        <SubmitButton
          colWidth="4"
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
  isUpdate: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  requestStatus: PropTypes.string.isRequired,
  spell: spellType.isRequired,
};

export default SpellForm;