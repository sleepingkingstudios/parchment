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

  describe('with showNavigation: false', () => {
    it('should render the title without a link', () => {
      const rendered = shallow(<PageHeader {...defaultProps} showNavigation={false} />);
      const heading = rendered.find('h1');
      const titleLink = heading.find('Link');
      const { title } = defaultProps;

      expect(titleLink).not.toExist();
      expect(heading).toHaveText(title);
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
