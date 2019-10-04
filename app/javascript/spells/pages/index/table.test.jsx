import React from 'react';
import { shallow } from 'enzyme';

import IndexSpellsTable from './table';
import { spellsData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../api/status';
import { hooks, request } from '../../store/indexFindSpells';

jest.mock('../../store/indexFindSpells');

describe('IndexSpellsTable', () => {
  const defaultProps = {};

  describe('with status: INITIALIZED', () => {
    const state = { data: {}, status: INITIALIZED };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexSpellsTable {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spells data from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const state = { data: {}, status: FAILURE };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the failure message', () => {
      const wrapper = shallow(<IndexSpellsTable {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderFailure')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load spells data from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const state = { data: {}, status: PENDING };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexSpellsTable {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderPending')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spells data from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const state = { data: { spells: spellsData }, status: SUCCESS };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should render the Spells table', () => {
      const { data, status } = state;
      const { spells } = data;
      const wrapper = shallow(<IndexSpellsTable {...defaultProps} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ spells });

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('SpellsTable');
      expect(rendered).toHaveProp({ spells });
    });

    it('should pass the onDelete handler to the Spells table', () => {
      const inner = jest.fn();
      const { data } = state;
      const { spells } = data;
      const wrapper = shallow(<IndexSpellsTable {...defaultProps} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ spells });
      const handler = rendered.prop('onDelete');
      const dispatch = jest.fn();
      const getState = jest.fn();

      expect(typeof handler).toEqual('function');

      request.performRequest.mockImplementationOnce(() => inner);

      handler({ dispatch, getState });

      expect(inner).toHaveBeenCalledWith(dispatch, getState);
    });
  });
});
