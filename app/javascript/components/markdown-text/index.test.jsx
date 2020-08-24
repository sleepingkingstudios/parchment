import React from 'react';
import { shallow } from 'enzyme';

import MarkdownText from './index';

describe('<MarkdownText />', () => {
  describe('with text: an empty string', () => {
    it('should be empty', () => {
      const rendered = shallow(<MarkdownText text="" />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('markdown-text');

      const paragraph = rendered.find('p');

      expect(paragraph).not.toExist();
    });
  });

  describe('with text: a plaintext string', () => {
    const text = 'Greetings, programs!';

    it('should wrap the text', () => {
      const rendered = shallow(<MarkdownText text={text} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('markdown-text');

      const paragraph = rendered.find('p');

      expect(paragraph).toExist();
      expect(paragraph).toHaveText(text);
    });
  });

  describe('with text: a markdown document', () => {
    const text = '# Greetings, Starfighter\n\nYou have been recruited by the Star League...';

    it('should render the markdown', () => {
      const rendered = shallow(<MarkdownText text={text} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('markdown-text');

      const heading = rendered.find('h1');

      expect(heading).toExist();
      expect(heading).toHaveText('Greetings, Starfighter');

      const paragraph = rendered.find('p');

      expect(paragraph).toExist();
      expect(paragraph).toHaveText('You have been recruited by the Star League...');
    });
  });

  describe('with text: a markdown document with HTML tags', () => {
    const text = '# Greetings, Starfighter\n\nYou have been recruited by the <em>Star League</em>...';

    it('should strip the HTML tags and render the markdown', () => {
      const rendered = shallow(<MarkdownText text={text} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('markdown-text');

      const heading = rendered.find('h1');

      expect(heading).toExist();
      expect(heading).toHaveText('Greetings, Starfighter');

      const paragraph = rendered.find('p');

      expect(paragraph).toExist();
      expect(paragraph).toHaveText('You have been recruited by the Star League...');

      const emphasized = rendered.find('em');
      expect(emphasized).not.toExist();
    });
  });

  describe('with text: a string with HTML tags', () => {
    const text = '<p>Greetings, programs!<p>';

    it('should strip the HTML tags', () => {
      const rendered = shallow(<MarkdownText text={text} />);
      const expected = 'Greetings, programs!';

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('markdown-text');

      const paragraph = rendered.find('p');

      expect(paragraph).toExist();
      expect(paragraph).toHaveText(expected);
    });
  });
});
