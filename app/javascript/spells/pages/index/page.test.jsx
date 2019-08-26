import React from 'react';
import { shallow } from 'enzyme';

import SpellsPage from './page';
import { requestSpells } from '../../store/indexFindSpells';

jest.mock('../../store/indexFindSpells');

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
  const defaultProps = {};

  it('should wrap the contents in a Page', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-spells');
    expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
  });

  it('should render the spells table', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    const table = rendered.find('IndexSpellsTable');

    expect(table).toExist();
  });

  it('should find the spells by id', () => {
    shallow(<SpellsPage {...defaultProps} />);

    expect(requestSpells).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
