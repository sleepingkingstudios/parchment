import React from 'react';
import { shallow } from 'enzyme';

import CreateSpellForm from './form';
import { spellsData } from '../../fixtures';
import { INITIALIZED } from '../../../store/requestStatus';
import { hooks } from '../../store/createSpellForm';

jest.mock('../../store/createSpellForm');

describe('CreateSpellForm', () => {
  const defaultProps = {};
  const spell = spellsData[0];
  const state = { data: { spell }, errors: {}, status: INITIALIZED };
  const onChangeAction = jest.fn();
  const onSubmitAction = jest.fn();

  beforeEach(() => {
    hooks.useEndpoint.mockImplementationOnce(() => state);

    hooks.useUpdateForm.mockImplementationOnce(() => onChangeAction);
    hooks.useSubmitForm.mockImplementationOnce(() => onSubmitAction);
  });

  it('should render a Spell form', () => {
    const { data, errors, status } = state;
    const rendered = shallow(<CreateSpellForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('SpellForm');
    expect(rendered).toHaveProp({ data });
    expect(rendered).toHaveProp({ errors });
    expect(rendered).toHaveProp({ status });
    expect(rendered).toHaveProp({ onChangeAction });
    expect(rendered).toHaveProp({ onSubmitAction });
  });
});
