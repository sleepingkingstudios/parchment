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
  const defaultProps = {
    spells: spellsData,
    spellsRequestStatus: SUCCESS,
    requestSpells: jest.fn(),
  };

  it('should wrap the contents in a Page', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-spells');
    expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
  });

  it('should render the spells table', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    const table = rendered.find('SpellsTable');

    expect(table).toExist();
    expect(table).toHaveProp('spells', spellsData);
    expect(table).toHaveProp('spellsRequestStatus', SUCCESS);
  });

  it('should call requestSpells()', () => {
    const requestSpells = jest.fn();

    shallow(
      <SpellsPage {...defaultProps} requestSpells={requestSpells} />,
    );

    expect(requestSpells).toHaveBeenCalledTimes(1);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
