import React from 'react';
import { shallow, mount } from 'enzyme';

import SpellFormSubmitButton from './index';

import { spellsData } from '../../fixtures';
import {
  FAILURE,
  INITIALIZED,
  PENDING,
  SUCCESS,
} from '../../../store/requestStatus';

describe('<SpellFormSubmitButton />', () => {
  const onSubmitAction = jest.fn(() => ({ payload: { ok: true } }));
  const spell = spellsData[0];
  const form = {
    data: spell,
    namespace: 'spell',
    onSubmitAction,
  };
  const defaultProps = {
    form,
    isUpdate: false,
    requestStatus: INITIALIZED,
  };

  it('should render the button', () => {
    const rendered = shallow(<SpellFormSubmitButton {...defaultProps} />);

    expect(rendered).toHaveDisplayName('FormSubmitWrapper');
    expect(rendered).toHaveProp('block', true);
    expect(rendered).toHaveProp('disabled', false);
    expect(rendered).toHaveProp({ form });
  });

  it('should set the button text', () => {
    const rendered = mount(<SpellFormSubmitButton {...defaultProps} />);

    expect(rendered).toHaveText('Create Spell');
  });

  it('should not show a spinner', () => {
    const rendered = shallow(<SpellFormSubmitButton {...defaultProps} />);

    expect(rendered).not.toContainMatchingElement('Spinner');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SpellFormSubmitButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with isUpdate: true', () => {
    const updateProps = { ...defaultProps, isUpdate: true };

    it('should render the button', () => {
      const rendered = shallow(<SpellFormSubmitButton {...updateProps} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', false);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<SpellFormSubmitButton {...updateProps} />);

      expect(rendered).toHaveText('Update Spell');
    });

    it('should not show a spinner', () => {
      const rendered = shallow(<SpellFormSubmitButton {...updateProps} />);

      expect(rendered).not.toContainMatchingElement('Spinner');
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<SpellFormSubmitButton {...updateProps} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('with requestStatus: FAILURE', () => {
      const props = { ...updateProps, requestStatus: FAILURE };

      it('should set the button text', () => {
        const rendered = mount(<SpellFormSubmitButton {...props} />);

        expect(rendered).toHaveText('Update Spell');
      });

      it('should not show a spinner', () => {
        const rendered = shallow(<SpellFormSubmitButton {...props} />);

        expect(rendered).not.toContainMatchingElement('Spinner');
      });
    });

    describe('with requestStatus: PENDING', () => {
      const props = { ...updateProps, requestStatus: PENDING };

      it('should set the button text', () => {
        const rendered = mount(<SpellFormSubmitButton {...props} />);

        expect(rendered).toHaveText('Updating Spell...');
      });

      it('should not show a spinner', () => {
        const rendered = shallow(<SpellFormSubmitButton {...props} />);

        expect(rendered).toContainMatchingElement('Spinner');
      });
    });

    describe('with requestStatus: SUCCESS', () => {
      const props = { ...updateProps, requestStatus: SUCCESS };

      it('should set the button text', () => {
        const rendered = mount(<SpellFormSubmitButton {...props} />);

        expect(rendered).toHaveText('Update Spell');
      });

      it('should not show a spinner', () => {
        const rendered = shallow(<SpellFormSubmitButton {...props} />);

        expect(rendered).not.toContainMatchingElement('Spinner');
      });
    });
  });

  describe('with requestStatus: FAILURE', () => {
    const props = { ...defaultProps, requestStatus: FAILURE };

    it('should render the button', () => {
      const rendered = shallow(<SpellFormSubmitButton {...props} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', false);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<SpellFormSubmitButton {...defaultProps} />);

      expect(rendered).toHaveText('Create Spell');
    });

    it('should not show a spinner', () => {
      const rendered = shallow(<SpellFormSubmitButton {...defaultProps} />);

      expect(rendered).not.toContainMatchingElement('Spinner');
    });
  });

  describe('with requestStatus: PENDING', () => {
    const props = { ...defaultProps, requestStatus: PENDING };

    it('should render the button', () => {
      const rendered = shallow(<SpellFormSubmitButton {...props} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', true);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<SpellFormSubmitButton {...props} />);

      expect(rendered).toHaveText('Creating Spell...');
    });

    it('should show a spinner', () => {
      const rendered = shallow(<SpellFormSubmitButton {...props} />);

      expect(rendered).toContainMatchingElement('Spinner');
    });
  });

  describe('with requestStatus: SUCCESS', () => {
    const props = { ...defaultProps, requestStatus: SUCCESS };

    it('should render the button', () => {
      const rendered = shallow(<SpellFormSubmitButton {...props} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', false);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<SpellFormSubmitButton {...defaultProps} />);

      expect(rendered).toHaveText('Create Spell');
    });

    it('should not show a spinner', () => {
      const rendered = shallow(<SpellFormSubmitButton {...defaultProps} />);

      expect(rendered).not.toContainMatchingElement('Spinner');
    });
  });
});
