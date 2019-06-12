import React from 'react';
import { shallow } from 'enzyme';

import SpellsPage from './page';
import { spellsData } from './fixtures';
import { SUCCESS } from '../store/requestStatus';

describe('<SpellsPage />', () => {
  const breadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Spells',
      url: '/spells',
      active: true,
    },
  ];
  const requestSpells = jest.fn();
  const props = {
    spells: spellsData,
    spellsRequestStatus: SUCCESS,
    requestSpells,
  };
  const rendered = shallow(<SpellsPage {...props} />);

  it('should wrap the contents in a Page', () => {
    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-spells');
    expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
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
