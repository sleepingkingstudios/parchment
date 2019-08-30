import React from 'react';
import { shallow } from 'enzyme';

import UpdateSpellForm from './form';
import { spellsData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../store/requestStatus';
import { hooks } from '../../store/updateSpellForm';

jest.mock('../../store/updateSpellForm');

describe('UpdateSpellForm', () => {
  const defaultProps = {};

  describe('with status: INITIALIZED', () => {
    const state = { data: {}, status: INITIALIZED };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<UpdateSpellForm {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spell from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const state = { data: {}, status: FAILURE };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the failure message', () => {
      const wrapper = shallow(<UpdateSpellForm {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderFailure')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load spell from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const state = { data: {}, status: PENDING };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<UpdateSpellForm {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spell from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const spell = spellsData[0];
    const state = { data: { spell }, errors: {}, status: SUCCESS };
    const onChangeAction = jest.fn();
    const onSubmitAction = jest.fn();

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
      hooks.useUpdateForm.mockImplementationOnce(() => onChangeAction);
      hooks.useSubmitForm.mockImplementationOnce(() => onSubmitAction);
    });

    it('should render a Spell form', () => {
      const { data, errors, status } = state;
      const wrapper = shallow(<UpdateSpellForm {...defaultProps} />);
      const rendered = wrapper
        .find('LoaderSwitch')
        .renderProp('renderSuccess')({ data, errors, spell });

      expect(rendered).toHaveDisplayName('SpellForm');
      expect(rendered).toHaveProp({ data });
      expect(rendered).toHaveProp({ errors });
      expect(rendered).toHaveProp({ status });
      expect(rendered).toHaveProp({ onChangeAction });
      expect(rendered).toHaveProp({ onSubmitAction });
      expect(rendered).toHaveProp({ isUpdate: true });
    });

    it('should pass the spell id to useSubmitForm', () => {
      const { id } = spell;

      shallow(<UpdateSpellForm {...defaultProps} />);

      expect(hooks.useSubmitForm).toHaveBeenCalledWith({ wildcards: { id } });
    });
  });
});
