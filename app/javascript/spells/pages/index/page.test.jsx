import React from 'react';
import { shallow } from 'enzyme';

import SpellsPage from './page';

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

  it('should render the spells table loader', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    const table = rendered.find('IndexSpellsTableLoader');

    expect(table).toExist();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
