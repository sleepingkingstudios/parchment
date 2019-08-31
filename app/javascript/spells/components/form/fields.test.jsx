import React from 'react';
import { shallow, mount } from 'enzyme';

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

import { spellsData } from '../../fixtures';
import { INITIALIZED } from '../../../api/status';

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
