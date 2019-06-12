import React from 'react';
import { shallow } from 'enzyme';

import HeadingWithButtons from './index';

describe('<HeadingWithButtons />', () => {
  const buttonData = {
    label: 'Button Label',
    url: 'path/to/url',
  };
  const children = 'Heading Label';
  const defaultProps = { buttons: [buttonData], children };

  it('should wrap the contents in a div', () => {
    const rendered = shallow(<HeadingWithButtons {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('heading-with-buttons');
  });

  it('should render the heading', () => {
    const rendered = shallow(<HeadingWithButtons {...defaultProps} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toHaveProp({ children });
  });

  it('should render the button', () => {
    const rendered = shallow(<HeadingWithButtons {...defaultProps} />);
    const button = rendered.find('LinkButton');
    const { label, url } = buttonData;

    expect(button).toExist();
    expect(button).toHaveProp('children', label);
    expect(button).toHaveProp({ url });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<HeadingWithButtons {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with a fancy button', () => {
    const fancyButtonData = {
      buttonStyle: 'danger',
      label: 'Self Destruct',
      outline: true,
      url: 'path/to/url',
    };
    const props = { ...defaultProps, buttons: [fancyButtonData] };

    it('should render the button', () => {
      const rendered = shallow(<HeadingWithButtons {...props} />);
      const button = rendered.find('LinkButton');
      const {
        buttonStyle,
        label,
        outline,
        url,
      } = fancyButtonData;

      expect(button).toExist();
      expect(button).toHaveProp('children', label);
      expect(button).toHaveProp({ buttonStyle });
      expect(button).toHaveProp({ outline });
      expect(button).toHaveProp({ url });
    });
  });

  describe('with many buttons', () => {
    const multiButtonData = [
      {
        label: 'First Button',
        url: 'button/one',
      },
      {
        label: 'Second Button',
        url: 'button/two',
      },
      {
        label: 'Third Button',
        url: 'button/three',
      },
    ];
    const props = { ...defaultProps, buttons: multiButtonData };

    it('should render the buttons in reverse order', () => {
      const rendered = shallow(<HeadingWithButtons {...props} />);
      const buttons = rendered.find('LinkButton');

      expect(buttons.length).toEqual(3);

      buttons.forEach((button, index) => {
        const { label, url } = multiButtonData[2 - index];

        expect(button).toHaveProp('children', label);
        expect(button).toHaveProp({ url });
      });
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<HeadingWithButtons {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
