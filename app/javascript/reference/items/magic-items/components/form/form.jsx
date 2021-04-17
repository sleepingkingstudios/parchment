import React from 'react';
import PropTypes from 'prop-types';

import Form from 'components/form';
import FormCancelButton from 'components/form/cancel-button';
import FormInput from 'components/form/input';
import FormRow from 'components/form/row';
import FormSelectInput from 'components/form/select-input';
import FormSubmitButton from 'components/form/submit-button';
import FormTextAreaInput from 'components/form/text-area-input';
import { formErrorsType } from 'components/form/entities';
import { formField, formGroup } from 'components/form/wrappers';
import { dig } from 'utils/object';
import { injectProps } from 'utils/react';
import { slugify } from 'utils/string';
import { magicItemFormType } from '../../entities';

const defaultCosts = {
  common: '50-100 gp',
  uncommon: '101-500 gp',
  rare: '501-5,000 gp',
  'very rare': '5,001-50,000 gp',
  legendary: '50,001+ gp',
  artifact: 'Priceless',
};

const generateCost = ({ data, path }) => {
  const rarity = dig(data, ...path, 'rarity');

  return defaultCosts[rarity];
};

const generatePlaceholder = propName => ({ data, path }) => (
  slugify(dig(data, ...path, propName))
);

const selectCategoryOptions = [
  {
    label: 'Armor',
    value: 'armor',
  },
  {
    label: 'Potion',
    value: 'potion',
  },
  {
    label: 'Ring',
    value: 'ring',
  },
  {
    label: 'Rod',
    value: 'rod',
  },
  {
    label: 'Scroll',
    value: 'scroll',
  },
  {
    label: 'Staff',
    value: 'staff',
  },
  {
    label: 'Wand',
    value: 'wand',
  },
  {
    label: 'Weapon',
    value: 'weapon',
  },
  {
    label: 'Wondrous Item',
    value: 'wondrous item',
  },
];

const selectRarityOptions = [
  {
    label: 'Common',
    value: 'common',
  },
  {
    label: 'Uncommon',
    value: 'uncommon',
  },
  {
    label: 'Rare',
    value: 'rare',
  },
  {
    label: 'Very Rare',
    value: 'very rare',
  },
  {
    label: 'Legendary',
    value: 'legendary',
  },
  {
    label: 'Artifact',
    value: 'artifact',
  },
];

const CategoryField = formField(FormSelectInput, 'category');

CategoryField.defaultProps = {
  options: selectCategoryOptions,
};

const CostField = formField(FormInput, 'cost', { mapDataToPlaceholder: generateCost });

const DescriptionField = formField(FormTextAreaInput, 'description');

const NameField = formField(FormInput, 'name');

const RarityField = formField(FormSelectInput, 'rarity');

RarityField.defaultProps = {
  options: selectRarityOptions,
};

const ShortDescriptionField = formField(FormInput, 'shortDescription');

const SlugField = formField(FormInput, 'slug', { mapDataToPlaceholder: generatePlaceholder('name') });

const CancelButton = formGroup(
  injectProps(FormCancelButton, { propName: 'slug', resourceName: 'Magic Item' }),
  { displayName: 'CancelButton' },
);

const SubmitButton = formGroup(
  injectProps(FormSubmitButton, { resourceName: 'Magic Item' }),
  { displayName: 'SubmitButton' },
);

const MagicItemForm = (props) => {
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
    path: ['magicItem'],
    onChangeAction,
    onSubmitAction,
  };

  return (
    <Form className="magic-item-form" form={form}>
      <h2>Magic Item Form</h2>

      <FormRow>
        <NameField form={form} colWidth={8} />

        <SlugField form={form} colWidth={4} />

        <CategoryField form={form} colWidth={4} />

        <RarityField form={form} colWidth={4} />

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

MagicItemForm.defaultProps = {
  baseUrl: '/magic-items',
  isUpdate: false,
};

MagicItemForm.propTypes = {
  baseUrl: PropTypes.string,
  data: magicItemFormType.isRequired,
  errors: formErrorsType.isRequired,
  isUpdate: PropTypes.bool,
  onChangeAction: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default MagicItemForm;
