import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';

describe('<Header />', () => {
  const props = { title: 'Example Title' };
  const rendered = shallow(<Header {...props} />);

  it('should wrap the contents in a <header> element', () => {
    expect(rendered).toHaveDisplayName('header');
  });

  it('should render the title in an <h1> element', () => {
    expect(rendered.find('h1')).toHaveText(props.title);
  });

  describe('when the subtitle is set', () => {
    const subtitle = 'Example Subtitle';
    const renderedWithSubtitle = shallow(
      <Header {...props} subtitle={subtitle} />,
    );

    it('should render the title in an <h1> element', () => {
      expect(renderedWithSubtitle.find('h1')).toIncludeText(props.title);
    });

    it('should render the subtitle in an <h1><small> element', () => {
      expect(renderedWithSubtitle.find('h1').find('small'))
        .toHaveText(subtitle);
    });
  });
});
