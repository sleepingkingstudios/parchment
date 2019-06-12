import React from 'react';
import { shallow } from 'enzyme';

import PageFooter from './index';

describe('<PageFooter />', () => {
  const breadcrumbs = [
    { label: 'Top Page', url: '/' },
    { label: 'Mid Page', url: '/mid' },
    { label: 'Bot Page', active: true },
  ];
  const props = { breadcrumbs };
  const rendered = shallow(<PageFooter {...props} />);

  it('should wrap the contents in a footer element', () => {
    expect(rendered).toHaveDisplayName('footer');
  });

  it('should display the footer text', () => {
    const expected = 'What lies beyond the furthest reaches of the sky?';

    expect(rendered).toIncludeText(expected);
  });

  it('should display the breadcrumbs', () => {
    const breadcrumbElement = rendered.find('Breadcrumbs');

    expect(breadcrumbElement).toExist();
    expect(breadcrumbElement).toHaveProp('breadcrumbs', breadcrumbs);
  });
});
