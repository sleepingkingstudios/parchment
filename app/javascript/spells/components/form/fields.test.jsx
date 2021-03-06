import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';

import { INITIALIZED } from 'api/status';
import { hooks } from 'origins/store';
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
import { spellsData } from '../../fixtures';

jest.mock('origins/store');

describe('<SpellForm /> fields', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const onSubmitAction = jest.fn(() => ({ payload: { ok: true } }));
  const spell = spellsData[0];
  const form = {
    data: { spell },
    path: ['spell'],
    onChangeAction,
    onSubmitAction,
  };

  describe('<CancelButton />', () => {
    const children = 'Do Nothing';
    const defaultProps = {
      children,
      form,
      isUpdate: false,
    };

    it('should set the display name', () => {
      expect(CancelButton.displayName).toEqual('CancelButton');
    });

    it('should render a form group', () => {
      const rendered = shallow(<CancelButton {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormGroup');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<CancelButton {...defaultProps} />, { wrappingComponent: Router });

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<CastingTimeField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(CastingTimeField.displayName).toEqual('CastingTimeField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<CastingTimeField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<CastingTimeField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<DescriptionField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(DescriptionField.displayName).toEqual('DescriptionField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<DescriptionField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<DescriptionField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<DurationField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(DurationField.displayName).toEqual('DurationField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<DurationField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<DurationField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<LevelField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(LevelField.displayName).toEqual('LevelField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<LevelField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<LevelField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<NameField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(NameField.displayName).toEqual('NameField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<NameField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<NameField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<RangeField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(RangeField.displayName).toEqual('RangeField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<RangeField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<RangeField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<RitualField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(RitualField.displayName).toEqual('RitualField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<RitualField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<RitualField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<SchoolField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(SchoolField.displayName).toEqual('SchoolField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<SchoolField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<SchoolField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<ShortDescriptionField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(ShortDescriptionField.displayName).toEqual('ShortDescriptionField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<ShortDescriptionField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<ShortDescriptionField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<SlugField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(SlugField.displayName).toEqual('SlugField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<SlugField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<SlugField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<SourceField />', () => {
    const defaultProps = { form };

    beforeEach(() => {
      hooks.useData.mockImplementationOnce(() => ({}));
      hooks.useRequestData.mockImplementationOnce(() => jest.fn());
    });

    it('should set the display name', () => {
      expect(SourceField.displayName).toEqual('SourceField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<SourceField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<SourceField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<SubmitButton />', () => {
    const children = 'Do Something';
    const defaultProps = { children, form, status: INITIALIZED };

    it('should set the display name', () => {
      expect(SubmitButton.displayName).toEqual('SubmitButton');
    });

    it('should render a form group', () => {
      const rendered = shallow(<SubmitButton {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormGroup');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<SubmitButton {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
