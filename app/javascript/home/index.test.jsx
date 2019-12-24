import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { shallow } from 'enzyme';

import HomePage from './index';

describe('<HomePage />', () => {
  const defaultProps = {};

  it('should wrap the contents in a <Page>', () => {
    const rendered = shallow(<HomePage {...defaultProps} />, { wrappingComponent: Router });

    expect(rendered.find('Page')).toExist();
  });

  it('should set the <Page> title', () => {
    const rendered = shallow(<HomePage {...defaultProps} />, { wrappingComponent: Router });
    const title = 'Parchment';

    expect(rendered.find('Page')).toHaveProp('title', title);
  });

  it('should set the <Page> subtitle', () => {
    const rendered = shallow(<HomePage {...defaultProps} />, { wrappingComponent: Router });
    const subtitle = '5e Campaign Companion';

    expect(rendered.find('Page')).toHaveProp('subtitle', subtitle);
  });

  it('should render the books link', () => {
    const rendered = shallow(<HomePage {...defaultProps} />, { wrappingComponent: Router });
    const link = rendered.find('.books-link');

    expect(link).toExist();
    expect(link).toHaveDisplayName('Link');
    expect(link).toHaveProp('to', '/books');
    expect(link).toHaveProp('children', 'Books');
  });

  it('should render the spells link', () => {
    const rendered = shallow(<HomePage {...defaultProps} />, { wrappingComponent: Router });
    const link = rendered.find('.spells-link');

    expect(link).toExist();
    expect(link).toHaveDisplayName('Link');
    expect(link).toHaveProp('to', '/spells');
    expect(link).toHaveProp('children', 'Spells');
  });
});
