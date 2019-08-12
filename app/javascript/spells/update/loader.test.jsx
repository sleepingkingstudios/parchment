import React from 'react';
import { shallow } from 'enzyme';

import UpdateSpellPageLoader from './loader';
import { spellsData } from '../fixtures';
import { SUCCESS } from '../../store/requestStatus';

describe('UpdateSpellPageLoader', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const defaultProps = {
    match: {
      params: { id },
    },
  };

  it('should render a connected SpellLoader', () => {
    const rendered = shallow(<UpdateSpellPageLoader {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Connect(SpellLoader)');
  });

  it('should render an UpdateSpellPage with the spell and status', () => {
    const spell = spellsData[0];
    const status = SUCCESS;
    const rendered = shallow(<UpdateSpellPageLoader {...defaultProps} />);
    const page = rendered.renderProp('render')({ spell, status });

    expect(page).toHaveDisplayName('UpdateSpellPage');
    expect(page).toHaveProp({ spell });
    expect(page).toHaveProp({ status });
  });
});
