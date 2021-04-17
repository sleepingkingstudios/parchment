import React from 'react';
import { shallow } from 'enzyme';

import PageNavigationDropdown from './dropdown';

describe('<PageNavigationDropdown />', () => {
  const label = 'Weapons';
  const items = {
    Swords: '/weapons/swords',
    Bows: '/weapons/bows',
    Firearms: '/weapons/firearms',
  };
  const defaultProps = { items, label };

  it('should render the navigation dropdown', () => {
    const rendered = shallow(<PageNavigationDropdown {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('nav-item dropdown');
  });

  it('should render the dropdown toggle', () => {
    const rendered = shallow(<PageNavigationDropdown {...defaultProps} />);
    const toggle = rendered.find('.dropdown-toggle');

    expect(toggle).toExist();
    expect(toggle).toHaveClassName('nav-link');
    expect(toggle).toHaveProp({ children: label });
    expect(toggle).toHaveProp('data-toggle', 'dropdown');
  });

  it('should render the dropdown menu', () => {
    const rendered = shallow(<PageNavigationDropdown {...defaultProps} />);
    const menu = rendered.find('.dropdown-menu');

    expect(menu).toExist();
  });

  it('should render the dropdown menu items', () => {
    const rendered = shallow(<PageNavigationDropdown {...defaultProps} />);
    const menuItems = rendered.find('.dropdown-menu .dropdown-item');

    expect(menuItems.length).toEqual(Object.keys(items).length);

    Object.entries(items).forEach(([itemLabel, url], index) => {
      const menuItem = menuItems.at(index);

      expect(menuItem).toExist();
      expect(menuItem).toHaveDisplayName('Link');
      expect(menuItem).toHaveProp({ children: itemLabel });
      expect(menuItem).toHaveProp({ to: url });
    });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<PageNavigationDropdown {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
