import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumb from './breadcrumb';

describe('<Breadcrumb />', () => {
  const inactiveBreadcrumb = { label: 'Breadcrumb Label' };
  const inactiveProps = { breadcrumb: inactiveBreadcrumb };
  const renderedInactive = shallow(<Breadcrumb {...inactiveProps} />);

  it('should wrap the item in a list item', () => {
    expect(renderedInactive).toHaveDisplayName('li');
    expect(renderedInactive).toHaveClassName('breadcrumb-item');
  });

  it('should not render a link', () => {
    expect(renderedInactive.find('Link')).not.toExist();
  });

  it('should render the label', () => {
    expect(renderedInactive).toHaveText(inactiveBreadcrumb.label);
  });

  describe('when the breadcrumb is active', () => {
    const activeBreadcrumb = { ...inactiveBreadcrumb, active: true };
    const activeProps = { breadcrumb: activeBreadcrumb };
    const renderedActive = shallow(<Breadcrumb {...activeProps} />);

    it('should wrap the item in a list item', () => {
      expect(renderedActive).toHaveDisplayName('li');
      expect(renderedActive).toHaveClassName('breadcrumb-item');
      expect(renderedActive).toHaveProp('aria-current', 'page');
    });

    it('should not render a link', () => {
      expect(renderedActive.find('Link')).not.toExist();
    });

    it('should render the label', () => {
      expect(renderedActive).toHaveText(inactiveBreadcrumb.label);
    });
  });

  describe('when the breadcrumb has a url', () => {
    const breadcrumbWithUrl = { ...inactiveBreadcrumb, url: '/path/to/page' };
    const propsWithUrl = { breadcrumb: breadcrumbWithUrl };
    const renderedWithUrl = shallow(<Breadcrumb {...propsWithUrl} />);

    it('should wrap the item in a list item', () => {
      expect(renderedWithUrl).toHaveDisplayName('li');
      expect(renderedWithUrl).toHaveClassName('breadcrumb-item');
    });

    it('should render a link with the label', () => {
      const link = renderedWithUrl.find('Link');

      expect(link).toExist();
      expect(link).toHaveProp('children', breadcrumbWithUrl.label);
      expect(link).toHaveProp('to', breadcrumbWithUrl.url);
    });

    describe('when the breadcrumb is active', () => {
      const activeBreadcrumb = { ...breadcrumbWithUrl, active: true };
      const activeProps = { breadcrumb: activeBreadcrumb };
      const renderedActive = shallow(<Breadcrumb {...activeProps} />);

      it('should wrap the item in a list item', () => {
        expect(renderedActive).toHaveDisplayName('li');
        expect(renderedActive).toHaveClassName('breadcrumb-item');
        expect(renderedActive).toHaveProp('aria-current', 'page');
      });

      it('should not render a link', () => {
        expect(renderedActive.find('Link')).not.toExist();
      });

      it('should render the label', () => {
        expect(renderedActive).toHaveText(inactiveBreadcrumb.label);
      });
    });
  });
});
