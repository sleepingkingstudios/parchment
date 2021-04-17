import React from 'react';
import PropTypes from 'prop-types';

import Form from 'components/form';
import FormCancelButton from 'components/form/cancel-button';
import FormInput from 'components/form/input';
import FormRow from 'components/form/row';
import FormSubmitButton from 'components/form/submit-button';
import FormTextAreaInput from 'components/form/text-area-input';
import { formErrorsType } from 'components/form/entities';
import { formField, formGroup } from 'components/form/wrappers';
import { dig } from 'utils/object';
import { injectProps } from 'utils/react';
import { slugify } from 'utils/string';
import { itemFormType } from '../../entities';

const generatePlaceholder = propName => ({ data, path }) => (
  slugify(dig(data, ...path, propName))
);

const CostField = formField(FormInput, 'cost');

const DescriptionField = formField(FormTextAreaInput, 'description');

const NameField = formField(FormInput, 'name');

const ShortDescriptionField = formField(FormInput, 'shortDescription');

const SlugField = formField(FormInput, 'slug', { mapDataToPlaceholder: generatePlaceholder('name') });

const CancelButton = formGroup(
  injectProps(FormCancelButton, { propName: 'slug', resourceName: 'Item' }),
  { displayName: 'CancelButton' },
);

const SubmitButton = formGroup(
  injectProps(FormSubmitButton, { resourceName: 'Item' }),
  { displayName: 'SubmitButton' },
);

const ItemForm = (props) => {
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
    path: ['item'],
    onChangeAction,
    onSubmitAction,
  };

  return (
    <Form className="item-form" form={form}>
      <FormRow>
        <NameField form={form} colWidth={4} />

        <SlugField form={form} colWidth={4} />

        <CostField form={form} colWidth={4} />

        <ShortDescriptionField form={form} colWidth={12} />

        <DescriptionField form={form} colWidth={12} />
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

ItemForm.defaultProps = {
  baseUrl: '/items',
  isUpdate: false,
};

ItemForm.propTypes = {
  baseUrl: PropTypes.string,
  data: itemFormType.isRequired,
  errors: formErrorsType.isRequired,
  isUpdate: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default ItemForm;
