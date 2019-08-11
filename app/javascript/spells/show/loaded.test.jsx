import React from 'react';
import { shallow } from 'enzyme';

import LoadedSpellPage from './loaded';
import { spellsData } from '../fixtures';
import { SUCCESS } from '../../store/requestStatus';

describe('LoadedSpellPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const defaultProps = {
    match: {
      params: { id },
    },
  };

  it('should render a connected SpellLoader', () => {
    const rendered = shallow(<LoadedSpellPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Connect(SpellLoader)');
  });

  it('should render a ShowSpellPage with the spell and status', () => {
    const spell = spellsData[0];
    const status = SUCCESS;
    const rendered = shallow(<LoadedSpellPage {...defaultProps} />);
    const page = rendered.renderProp('render')({ spell, status });

    expect(page).toHaveDisplayName('ShowSpellPage');
    expect(page).toHaveProp({ spell });
    expect(page).toHaveProp({ status });
  });
});
