import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs from './index';

describe('<Breadcrumbs />', () => {
  const breadcrumbs = [
    { label: 'Top Page', url: '/' },
    { label: 'Mid Page', url: '/mid' },
    { label: 'Bot Page', active: true },
  ];
  const props = { breadcrumbs };
  const rendered = shallow(<Breadcrumbs {...props} />);

  it('should wrap the contents in a nav element', () => {
    expect(rendered).toHaveDisplayName('nav');
    expect(rendered).toHaveProp('aria-label', 'breadcrumb');
  });

  it('should generate the breadcrumbs', () => {
    const breadcrumbElements = rendered.find('Breadcrumb');

    expect(breadcrumbElements.length).toEqual(breadcrumbs.length);

    breadcrumbElements.forEach((element, index) => {
      expect(element).toHaveProp('breadcrumb', breadcrumbs[index]);
    });
  });

  describe('when the breadcrumbs array is empty', () => {
    const emptyProps = { breadcrumbs: [] };
    const renderedEmpty = shallow(<Breadcrumbs {...emptyProps} />);

    it('should be an empty render', () => {
      expect(renderedEmpty).toBeEmptyRender();
    });
  });
});
