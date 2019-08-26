import React from 'react';
import { shallow } from 'enzyme';

import IndexSpellsTable from './table';
import { spellsData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../store/requestStatus';
import { useSpells } from '../../store/indexFindSpells';

jest.mock('../../store/indexFindSpells');

describe('IndexSpellsTable', () => {
  const defaultProps = {};

  describe('with status: INITIALIZED', () => {
    const state = { status: INITIALIZED };

    beforeEach(() => {
      useSpells.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexSpellsTable {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spells data from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const state = { status: FAILURE };

    beforeEach(() => {
      useSpells.mockImplementationOnce(() => state);
    });

    it('should display the failure message', () => {
      const wrapper = shallow(<IndexSpellsTable {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderFailure')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load spells data from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const state = { status: PENDING };

    beforeEach(() => {
      useSpells.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexSpellsTable {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderPending')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spells data from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const state = { spells: spellsData, status: SUCCESS };

    beforeEach(() => {
      useSpells.mockImplementationOnce(() => state);
    });

    it('should render the Spells table', () => {
      const { spells, status } = state;
      const wrapper = shallow(<IndexSpellsTable {...defaultProps} />);
      const rendered = wrapper
        .find('LoaderSwitch')
        .renderProp('renderSuccess')({ spells });

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('SpellsTable');
      expect(rendered).toHaveProp({ spells });
    });
  });
});
