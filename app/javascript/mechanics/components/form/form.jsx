import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../../components/form';
import FormCancelButton from '../../../components/form/cancel-button';
import FormInput from '../../../components/form/input';
import FormSubmitButton from '../../../components/form/submit-button';
import FormRow from '../../../components/form/row';
import FormTextAreaInput from '../../../components/form/text-area-input';
import { formField, formGroup } from '../../../components/form/wrappers';
import { injectProps } from '../../../utils/react';

import { formErrorsType } from '../../../components/form/entities';
import { mechanicFormType } from '../../entities';

const DescriptionField = formField(FormTextAreaInput, 'description');

const NameField = formField(FormInput, 'name');

const NotesField = formField(FormTextAreaInput, 'notes');

const ShortDescriptionField = formField(FormInput, 'shortDescription');

const CancelButton = formGroup(
  injectProps(FormCancelButton, { resourceName: 'Mechanic' }),
  { displayName: 'CancelButton' },
);

const SubmitButton = formGroup(
  injectProps(FormSubmitButton, { resourceName: 'Mechanic' }),
  { displayName: 'SubmitButton' },
);

const MechanicForm = (props) => {
  const {
    baseUrl,
    data,
    errors,
    isUpdate,
    onChangeAction,
    onSubmitAction,
    status,
  } = props;
  const form = {
    data,
    errors,
    path: ['mechanic'],
    onChangeAction,
    onSubmitAction,
  };

  return (
    <Form className="mechanic-form" form={form}>
      <FormRow>
        <NameField form={form} colWidth={4} />

        <ShortDescriptionField form={form} colWidth={8} />

        <DescriptionField form={form} colWidth={12} />

        <NotesField form={form} colWidth={12} />
      </FormRow>

      <FormRow align="right">
        <CancelButton
          baseUrl={baseUrl}
          colWidth="3"
          form={form}
          isUpdate={isUpdate}
        />
        <SubmitButton
          colWidth="3"
          form={form}
          actionName={isUpdate ? 'Update' : 'Create'}
          status={status}
        />
      </FormRow>
    </Form>
  );
};

MechanicForm.defaultProps = {
  baseUrl: '/mechanics',
  isUpdate: false,
};

MechanicForm.propTypes = {
  baseUrl: PropTypes.string,
  data: mechanicFormType.isRequired,
  errors: formErrorsType.isRequired,
  isUpdate: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default MechanicForm;
