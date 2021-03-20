import React from 'react';
import { shallow } from 'enzyme';

import PageNavigationItem from './item';

describe('<PageNavigationItem />', () => {
  const label = 'Resource';
  const url = '/path/to/resource';
  const defaultProps = { label, url };

  it('should render the navigation item', () => {
    const rendered = shallow(<PageNavigationItem {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('nav-item');
    expect(rendered).toHaveClassName('nav-item nav-item-resource');
  });

  it('should render the navigation link', () => {
    const rendered = shallow(<PageNavigationItem {...defaultProps} />);
    const link = rendered.find('Link');

    expect(link).toExist();
    expect(link).toHaveClassName('nav-link');
    expect(link).toHaveProp({ to: url });
    expect(link).toHaveProp({ children: label });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<PageNavigationItem {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
