import React from 'react';
import { shallow } from 'enzyme';

import ShowSpellBlock from './block';
import { spellsData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../store/requestStatus';
import { useSpell } from '../../store/showFindSpell';

jest.mock('../../store/showFindSpell');

describe('ShowSpellBlock', () => {
  const defaultProps = {};

  describe('with status: INITIALIZED', () => {
    const state = { status: INITIALIZED };

    beforeEach(() => {
      useSpell.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<ShowSpellBlock {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spell from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const state = { status: FAILURE };

    beforeEach(() => {
      useSpell.mockImplementationOnce(() => state);
    });

    it('should display the failure message', () => {
      const wrapper = shallow(<ShowSpellBlock {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderFailure')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load spell from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const state = { status: PENDING };

    beforeEach(() => {
      useSpell.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<ShowSpellBlock {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderPending')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spell from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const state = { spell: spellsData[0], status: SUCCESS };

    beforeEach(() => {
      useSpell.mockImplementationOnce(() => state);
    });

    it('should render the Spell block', () => {
      const { spell, status } = state;
      const wrapper = shallow(<ShowSpellBlock {...defaultProps} />);
      const rendered = wrapper
        .find('LoaderSwitch')
        .renderProp('renderSuccess')({ spell });

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('SpellBlock');
      expect(rendered).toHaveProp({ spell });
    });
  });
});
