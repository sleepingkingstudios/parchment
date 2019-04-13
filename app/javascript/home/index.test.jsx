import React from 'react';
import { mount } from 'enzyme';

import HomePage from './index';

describe('<HomePage />', () => {
  const props = {};
  const rendered = mount(<HomePage {...props} />);

  it('should wrap the contents in a <Page>', () => {
    expect(rendered.find('Page')).toExist();
  });

  it('should set the <Page> title', () => {
    const title = 'Parchment';

    expect(rendered.find('Page')).toHaveProp('title', title);
  });

  it('should set the <Page> subtitle', () => {
    const subtitle = '5e Campaign Companion';

    expect(rendered.find('Page')).toHaveProp('subtitle', subtitle);
  });

  it('should render the spells link', () => {
    expect(rendered).toIncludeText('Spells');
  });
});
