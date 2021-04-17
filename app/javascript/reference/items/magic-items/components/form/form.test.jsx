import React from 'react';
import { shallow } from 'enzyme';

import { INITIALIZED } from 'api/status';
import {
  toHaveFormControl,
  toHaveFormGroup,
  toHaveFormInput,
} from 'utils/enzyme';
import MagicItemForm from './form';

expect.extend({
  toHaveFormControl: toHaveFormControl(expect),
  toHaveFormGroup: toHaveFormGroup(expect),
  toHaveFormInput: toHaveFormInput(expect),
});

describe('<MagicItemForm />', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const onSubmitAction = jest.fn(() => ({ ok: true }));
  const magicItem = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Collect Call of Cthulhu',
    slug: 'collect-call-cthulhu',
    category: 'wondrous item',
    cost: 'Priceless',
    rarity: 'artifact',
    data: {
      magic: 'eldritch',
      masonry: 'Cyclopean',
      texture: 'squamous',
    },
    description: 'Not even strange aeons can kill the phone company.',
    shortDescription: "A direct line to the halls of R'lyeh.",
    type: 'References::Items::MagicItem',
  };
  const data = { magicItem };
  const errors = {};
  const defaultProps = {
    data,
    errors,
    onChangeAction,
    onSubmitAction,
    status: INITIALIZED,
  };
  const form = {
    data,
    errors,
    path: ['magicItem'],
    onChangeAction,
    onSubmitAction,
  };
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

  it('should render a form', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Form');
    expect(rendered).toHaveProp({ form });
  });

  it('should render the category field', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('CategoryField', (formGroup) => {
      expect(formGroup).toHaveFormInput(
        {
          inputType: 'FormSelectInput',
          form,
          prop: 'category',
        },
        (input) => {
          expect(input).toHaveProp({ options: selectCategoryOptions });
        },
      );
    });
  });

  it('should render the cost field', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('CostField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'cost' });
    });
  });

  it('should render the description field', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('DescriptionField', (formGroup) => {
      expect(formGroup).toHaveFormInput({
        inputType: 'FormTextAreaInput',
        form,
        prop: 'description',
      });
    });
  });

  it('should render the name field', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('NameField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'name' });
    });
  });

  it('should render the rarity field', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('RarityField', (formGroup) => {
      expect(formGroup).toHaveFormInput(
        {
          inputType: 'FormSelectInput',
          form,
          prop: 'rarity',
        },
        (input) => {
          expect(input).toHaveProp({ options: selectRarityOptions });
        },
      );
    });
  });

  it('should render the shortDescription field', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('ShortDescriptionField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'shortDescription' });
    });
  });

  it('should render the slug field', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('SlugField', (formGroup) => {
      expect(formGroup).toHaveFormInput({ form, prop: 'slug' });
    });
  });

  it('should render the cancel button', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toHaveFormGroup('CancelButton', (formGroup) => {
      expect(formGroup).toHaveFormControl('FormCancelButton', {
        baseUrl: '/magic-items',
        form,
        isUpdate: false,
        resourceName: 'Magic Item',
      });
    });
  });

  it('should render the submit button', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);
    const { status } = defaultProps;

    expect(rendered).toHaveFormGroup('SubmitButton', (formGroup) => {
      expect(formGroup).toHaveFormControl('FormSubmitButton', {
        actionName: 'Create',
        form,
        resourceName: 'Magic Item',
        status,
      });
    });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<MagicItemForm {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/reference/items/magic-items';

    it('should render the cancel button', () => {
      const rendered = shallow(<MagicItemForm {...defaultProps} baseUrl={baseUrl} />);

      expect(rendered).toHaveFormGroup('CancelButton', (formGroup) => {
        expect(formGroup).toHaveFormControl('FormCancelButton', {
          baseUrl,
          form,
          isUpdate: false,
          resourceName: 'Magic Item',
        });
      });
    });
  });
});
