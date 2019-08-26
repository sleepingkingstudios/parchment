import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs from '../../breadcrumbs';
import PageFooter from './index';

describe('<PageFooter />', () => {
  const breadcrumbs = [
    { label: 'Top Page', url: '/' },
    { label: 'Mid Page', url: '/mid' },
    { label: 'Bot Page', active: true },
  ];
  const defaultProps = { breadcrumbs };

  it('should wrap the contents in a footer element', () => {
    const rendered = shallow(<PageFooter {...defaultProps} />);

    expect(rendered).toHaveDisplayName('footer');
  });

  it('should display the footer text', () => {
    const rendered = shallow(<PageFooter {...defaultProps} />);
    const expected = 'What lies beyond the furthest reaches of the sky?';

    expect(rendered).toIncludeText(expected);
  });

  it('should display the breadcrumbs', () => {
    const rendered = shallow(<PageFooter {...defaultProps} />);
    const breadcrumbElement = rendered.find('Breadcrumbs');

    expect(breadcrumbElement).toExist();
    expect(breadcrumbElement).toHaveProp('breadcrumbs', breadcrumbs);
  });

  describe('with breadcrumbs: component', () => {
    const CustomBreadcrumbs = (<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const props = { ...defaultProps, breadcrumbs: CustomBreadcrumbs };

    it('should display the breadcrumbs', () => {
      const rendered = shallow(<PageFooter {...props} />);
      const breadcrumbElement = rendered.find('Breadcrumbs');

      expect(breadcrumbElement).toExist();
      expect(breadcrumbElement).toHaveProp('breadcrumbs', breadcrumbs);
    });
  });
});
