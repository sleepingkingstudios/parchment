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
import { hooks as findHooks } from '../../store/updateFindSpell';
import { hooks as formHooks } from '../../store/updateSpellForm';

jest.mock('../../store/updateFindSpell');
jest.mock('../../store/updateSpellForm');

describe('UpdateSpellForm', () => {
  const defaultProps = {};
  const formState = {
    data: { spell: spellsData[0] },
    errors: {},
    status: SUCCESS,
  };

  beforeEach(() => {
    formHooks.useEndpoint.mockImplementationOnce(() => formState);
  });

  describe('with status: INITIALIZED', () => {
    beforeEach(() => {
      findHooks.useEndpoint.mockImplementationOnce(() => ({ status: INITIALIZED }));
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<UpdateSpellForm {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderInitialized')();

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status: INITIALIZED });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spell from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    beforeEach(() => {
      findHooks.useEndpoint.mockImplementationOnce(() => ({ status: FAILURE }));
    });

    it('should display the failure message', () => {
      const wrapper = shallow(<UpdateSpellForm {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderFailure')();

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status: FAILURE });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load spell from the server.');
    });
  });

  describe('with status: PENDING', () => {
    beforeEach(() => {
      findHooks.useEndpoint.mockImplementationOnce(() => ({ status: PENDING }));
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<UpdateSpellForm {...defaultProps} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderInitialized')();

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status: PENDING });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spell from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const onChangeAction = jest.fn();
    const onSubmitAction = jest.fn();

    beforeEach(() => {
      findHooks.useEndpoint.mockImplementationOnce(() => ({ status: SUCCESS }));

      formHooks.useUpdateForm.mockImplementationOnce(() => onChangeAction);
      formHooks.useSubmitForm.mockImplementationOnce(() => onSubmitAction);
    });

    it('should render a Spell form', () => {
      const { data, errors, status } = formState;
      const wrapper = shallow(<UpdateSpellForm {...defaultProps} />);
      const rendered = wrapper
        .find('LoaderSwitch')
        .renderProp('renderSuccess')({ data, errors, status });

      expect(rendered).toHaveDisplayName('SpellForm');
      expect(rendered).toHaveProp({ data });
      expect(rendered).toHaveProp({ errors });
      expect(rendered).toHaveProp({ status });
      expect(rendered).toHaveProp({ onChangeAction });
      expect(rendered).toHaveProp({ onSubmitAction });
      expect(rendered).toHaveProp({ isUpdate: true });
    });

    it('should pass the spell id to useSubmitForm', () => {
      const spell = spellsData[0];
      const { id } = spell;

      shallow(<UpdateSpellForm {...defaultProps} />);

      expect(formHooks.useSubmitForm).toHaveBeenCalledWith({ wildcards: { id } });
    });
  });
});
