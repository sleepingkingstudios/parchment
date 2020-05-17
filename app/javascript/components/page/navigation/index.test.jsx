import React from 'react';
import { shallow } from 'enzyme';

import PageNavigation from './index';

describe('<PageNavigation />', () => {
  const items = {
    Home: '/',
    Magic: '/magic',
    Spells: '/spells',
    Weapons: {
      Swords: '/weapons/swords',
      Bows: '/weapons/bows',
      Firearms: '/weapons/firearms',
    },
  };
  const defaultProps = { items };

  it('should render the navigation bar', () => {
    const rendered = shallow(<PageNavigation {...defaultProps} />);

    expect(rendered).toHaveDisplayName('nav');
    expect(rendered).toHaveClassName('navbar');
    expect(rendered).toHaveClassName('navbar-expand-md');
    expect(rendered).toHaveClassName('navbar-light');
    expect(rendered).toHaveClassName('page-header-navigation');
  });

  it('should render the navigation items', () => {
    const rendered = shallow(<PageNavigation {...defaultProps} />);
    const menuItems = rendered.find('.navbar-nav').children();

    expect(menuItems.length).toEqual(4);

    Object.entries(items).forEach(([label, value], index) => {
      if (!(typeof value === 'string')) { return; }

      const menuItem = menuItems.at(index);

      expect(menuItem).toExist();
      expect(menuItem).toHaveDisplayName('PageNavigationItem');
      expect(menuItem).toHaveProp({ label });
      expect(menuItem).toHaveProp({ url: value });
    });
  });

  it('should render the navigation dropdowns', () => {
    const rendered = shallow(<PageNavigation {...defaultProps} />);
    const menuItems = rendered.find('.navbar-nav').children();
    const dropdown = menuItems.at(3);
    const label = 'Weapons';
    const value = items[label];

    expect(dropdown).toExist();
    expect(dropdown).toHaveDisplayName('PageNavigationDropdown');
    expect(dropdown).toHaveProp({ label });
    expect(dropdown).toHaveProp({ items: value });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<PageNavigation {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
