import React from 'react';
import PropTypes from 'prop-types';

import FormRow from '../../../components/form/row';
import FormGroup from '../../../components/form/group';
import {
  MaterialInput,
  SomaticInput,
  VerbalInput,
} from './fields';

import { formType } from '../../../components/form/entities';

const SpellFormComponentsField = ({ colWidth, form }) => (
  <FormGroup className="mb-0" colWidth={colWidth}>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label>Components</label>

    <FormRow>
      <VerbalInput form={form} colWidth="2" label="Verbal" />

      <SomaticInput form={form} colWidth="2" label="Somatic" />

      <MaterialInput form={form} colWidth="8" placeholder="Material" />
    </FormRow>
  </FormGroup>
);

SpellFormComponentsField.defaultProps = {
  colWidth: '12',
};

SpellFormComponentsField.propTypes = {
  colWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  form: formType.isRequired,
};

export default SpellFormComponentsField;
