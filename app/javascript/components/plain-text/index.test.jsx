import React from 'react';
import { shallow } from 'enzyme';

import PlainText from './index';

describe('<PlainText />', () => {
  describe('with an empty text string', () => {
    const props = { text: '' };
    const rendered = shallow(<PlainText {...props} />);

    it('should wrap the text in a div', () => {
      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('plain-text');
    });

    it('should create an empty paragraph', () => {
      const paragraph = rendered.find('p');

      expect(paragraph).toExist();
      expect(paragraph).toHaveText('');
    });
  });

  describe('with a simple text string', () => {
    const text = 'What lies beyond the furthest reaches of the sky?';
    const props = { text };
    const rendered = shallow(<PlainText {...props} />);

    it('should create a paragraph with the text', () => {
      const paragraph = rendered.find('p');

      expect(paragraph).toExist();
      expect(paragraph).toHaveText(text);
    });
  });

  describe('with a text string with a line break', () => {
    const text = 'What lies beyond the furthest reaches of the sky?\n'
      + "That which will lead the lost child back to her Mother's arms. Exile.";
    const lines = text.split('\n');
    const props = { text };
    const rendered = shallow(<PlainText {...props} />);
    const expected = (
      <p>
        { lines[0] }
        <br />
        { lines[1] }
      </p>
    );

    it('should create a paragraph with the text', () => {
      const paragraph = rendered.find('p');

      expect(paragraph).toContainReact(expected);
    });
  });

  describe('with a text string with multiple paragraphs', () => {
    const text = 'What lies beyond the furthest reaches of the sky?\n'
      + "That which will lead the lost child back to her Mother's arms. Exile."
      + '\n\n'
      + 'The waves that flow and dye the land gold.\n'
      + 'The blessed breath that nurtures life. A land of wheat.'
      + '\n\n'
      + 'The path the angels descend upon.\n'
      + 'The path of great winds. The Grand Stream.'
      + '\n\n'
      + "What lies within the furthest depths of one's memory?\n"
      + 'The place where all were born and where all will return. A blue star.';
    const lines = text.split(/\n+/);
    const props = { text };
    const rendered = shallow(<PlainText {...props} />);

    it('should create each paragraph', () => {
      expect(rendered).toContainMatchingElements(4, 'p');

      const paragraphs = rendered.find('p');
      let expected;

      paragraphs.forEach((paragraph, index) => {
        expected = (
          <p>
            { lines[2 * index] }
            <br />
            { lines[2 * index + 1] }
          </p>
        );

        expect(paragraph).toContainReact(expected);
      });
    });
  });

  describe('with an html string', () => {
    const text = '<em>Last Exile</em>';
    const props = { text };
    const rendered = shallow(<PlainText {...props} />);

    it('should sanitize the text', () => {
      const paragraph = rendered.find('p');

      expect(paragraph).toExist();
      expect(paragraph).toHaveText(text);
      expect(paragraph.find('em')).not.toExist();
    });
  });

  describe('with a className', () => {
    const props = { text: '', className: 'custom-class' };
    const rendered = shallow(<PlainText {...props} />);

    it('should set the class name', () => {
      expect(rendered).toHaveClassName('plain-text custom-class');
    });
  });
});
