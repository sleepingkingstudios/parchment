import React from 'react';
import { MemoryRouter as Router, Link } from 'react-router-dom';
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

  it('should render the publications link', () => {
    const rendered = shallow(<HomePage {...defaultProps} />, { wrappingComponent: Router });

    expect(rendered).toContainReact(<Link to="/publications">Publications</Link>);
  });

  it('should render the spells link', () => {
    const rendered = shallow(<HomePage {...defaultProps} />, { wrappingComponent: Router });

    expect(rendered).toContainReact(<Link to="/spells">Spells</Link>);
  });
});
