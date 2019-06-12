import React from 'react';
import { shallow } from 'enzyme';

import SpellsPage from './page';
import { spellsData } from './fixtures';
import { SUCCESS } from '../store/requestStatus';

describe('<SpellsPage />', () => {
  const requestSpells = jest.fn();
  const props = {
    spells: spellsData,
    spellsRequestStatus: SUCCESS,
    requestSpells,
  };
  const rendered = shallow(<SpellsPage {...props} />);

  it('should set the className', () => {
    expect(rendered.find('Page')).toHaveClassName('page-spells');
  });

  it('should render the spells table', () => {
    const table = rendered.find('SpellsTable');

    expect(table).toExist();
    expect(table).toHaveProp('spells', spellsData);
    expect(table).toHaveProp('spellsRequestStatus', SUCCESS);
  });

  it('should call requestSpells()', () => {
    expect(requestSpells).toHaveBeenCalledTimes(1);
  });
});
