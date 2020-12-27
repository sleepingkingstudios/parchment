import React from 'react';
import { shallow } from 'enzyme';

import PageHeader from './index';

describe('<PageHeader />', () => {
  const defaultProps = { title: 'Example Title' };

  it('should wrap the contents in a <header> element', () => {
    const rendered = shallow(<PageHeader {...defaultProps} />);

    expect(rendered).toHaveDisplayName('header');
  });

  it('should render the title link in an <h1> element', () => {
    const rendered = shallow(<PageHeader {...defaultProps} />);
    const heading = rendered.find('h1');
    const titleLink = heading.find('Link');
    const { title } = defaultProps;

    expect(titleLink).toExist();
    expect(titleLink).toHaveProp({ children: title });
    expect(titleLink).toHaveProp({ to: '/' });
  });

  it('should render the navigation', () => {
    const rendered = shallow(<PageHeader {...defaultProps} />);
    const navigation = rendered.find('PageNavigation');
    const expected = {
      Home: '/',
      Spells: '/spells',
      Mechanics: {
        Actions: '/mechanics/actions',
        Conditions: '/mechanics/conditions',
      },
      Books: '/books',
      Reference: {
        Items: '/reference/items',
        Languages: '/reference/languages',
        Skills: '/reference/skills',
      },
    };

    expect(navigation).toExist();
    expect(navigation).toHaveProp({ items: expected });
  });

  describe('with showNavigation: false', () => {
    it('should render the title without a link', () => {
      const rendered = shallow(<PageHeader {...defaultProps} showNavigation={false} />);
      const heading = rendered.find('h1');
      const titleLink = heading.find('Link');
      const { title } = defaultProps;

      expect(titleLink).not.toExist();
      expect(heading).toHaveText(title);
    });

    it('should not render the navigation', () => {
      const rendered = shallow(<PageHeader {...defaultProps} showNavigation={false} />);
      const navigation = rendered.find('PageNavigation');

      expect(navigation).not.toExist();
    });
  });

  describe('with subtitle: value', () => {
    const subtitle = 'Example Subtitle';

    it('should render the title link in an <h1> element', () => {
      const rendered = shallow(<PageHeader {...defaultProps} />);
      const heading = rendered.find('h1');
      const titleLink = heading.find('Link');
      const { title } = defaultProps;

      expect(titleLink).toExist();
      expect(titleLink).toHaveProp({ children: title });
      expect(titleLink).toHaveProp({ to: '/' });
    });

    it('should render the subtitle in an <h1><small> element', () => {
      const rendered = shallow(
        <PageHeader {...defaultProps} subtitle={subtitle} />,
      );
      const heading = rendered.find('h1');

      expect(heading.find('small'))
        .toHaveText(subtitle);
    });

    describe('with showNavigation: false', () => {
      it('should render the title without a link', () => {
        const rendered = shallow(
          <PageHeader {...defaultProps} showNavigation={false} subtitle={subtitle} />,
        );
        const heading = rendered.find('h1');
        const titleLink = heading.find('Link');
        const { title } = defaultProps;

        expect(titleLink).not.toExist();
        expect(heading).toIncludeText(title);
      });
    });
  });
});
