import React from 'react';
import { shallow, mount } from 'enzyme';

import {
  MaterialInput,
  SomaticInput,
  VerbalInput,
} from './fields';

import { spellsData } from '../../fixtures';

describe('<SpellFormComponentsField /> fields', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const spell = spellsData[0];
  const form = {
    data: { spell },
    path: ['spell'],
    onChangeAction,
  };

  describe('<MaterialInput />', () => {
    const placeholder = 'Material';
    const defaultProps = { form, placeholder };

    it('should set the display name', () => {
      expect(MaterialInput.displayName).toEqual('MaterialInput');
    });

    it('should render a form group', () => {
      const rendered = shallow(<MaterialInput {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormGroup');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<MaterialInput {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<SomaticInput />', () => {
    const label = 'Somatic';
    const defaultProps = { form, label };

    it('should set the display name', () => {
      expect(SomaticInput.displayName).toEqual('SomaticInput');
    });

    it('should render a form group', () => {
      const rendered = shallow(<SomaticInput {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormGroup');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<SomaticInput {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<VerbalInput />', () => {
    const label = 'Verbal';
    const defaultProps = { form, label };

    it('should set the display name', () => {
      expect(VerbalInput.displayName).toEqual('VerbalInput');
    });

    it('should render a form group', () => {
      const rendered = shallow(<VerbalInput {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormGroup');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<VerbalInput {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
