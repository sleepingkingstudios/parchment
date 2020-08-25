import React from 'react';
import { shallow } from 'enzyme';

import RichText from './index';
import renderLiquid from './liquid/render';
import { useLiquid } from './liquid/hooks';

jest.mock('./liquid/hooks');

useLiquid.mockImplementation(() => {});

const nextEventLoop = () => (
  new Promise((resolve) => { setTimeout(resolve, 0); })
);

describe('<RichText />', () => {
  beforeEach(() => {
    useLiquid.mockClear();

    useLiquid.mockImplementationOnce(async ({ callback, template }) => {
      await renderLiquid({ callback, status: { active: true }, template });
    });
  });

  describe('with text: an empty string', () => {
    const text = '';

    it('should return an empty component', () => {
      const rendered = shallow(<RichText text={text} />);

      expect(rendered).toBeEmptyRender();
    });

    it('should not call useLiquid', () => {
      shallow(<RichText text={text} />);

      expect(useLiquid).not.toHaveBeenCalled();
    });
  });

  describe('with text: a plaintext string', () => {
    const text = 'Greetings, programs!';

    it('should process the text as markdown', async () => {
      const rendered = await shallow(<RichText text={text} />);

      await nextEventLoop(); // Allows Liquid rendering to resolve.

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('rich-text');

      const markdown = rendered.find('MarkdownText');

      expect(markdown).toExist();
      expect(markdown).toHaveProp({ text });
    });

    it('should call useLiquid', () => {
      shallow(<RichText text={text} />);

      expect(useLiquid).toHaveBeenCalledWith({
        callback: expect.any(Function),
        template: text,
      });
    });
  });

  describe('with text: a plaintext string with HTML tags', () => {
    const text = '<p>Greetings, programs!<p>';
    const expected = 'Greetings, programs!';

    it('should strip the HTML tags', async () => {
      const rendered = await shallow(<RichText text={text} />);

      await nextEventLoop(); // Allows Liquid rendering to resolve.

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('rich-text');

      const markdown = rendered.find('MarkdownText');

      expect(markdown).toExist();
      expect(markdown).toHaveProp({ text: expected });
    });

    it('should call useLiquid', () => {
      shallow(<RichText text={text} />);

      expect(useLiquid).toHaveBeenCalledWith({
        callback: expect.any(Function),
        template: expected,
      });
    });
  });

  describe('with text: a markdown document', () => {
    const text = '# Greetings, Starfighter\n\nYou have been recruited by the Star League...';

    it('should process the text as markdown', async () => {
      const rendered = await shallow(<RichText text={text} />);

      await nextEventLoop(); // Allows Liquid rendering to resolve.

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('rich-text');

      const markdown = rendered.find('MarkdownText');

      expect(markdown).toExist();
      expect(markdown).toHaveProp({ text });
    });

    it('should call useLiquid', () => {
      shallow(<RichText text={text} />);

      expect(useLiquid).toHaveBeenCalledWith({
        callback: expect.any(Function),
        template: text,
      });
    });
  });

  describe('with text: a markdown document with HTML tags', () => {
    const text = '# Greetings, Starfighter\n\nYou have been recruited by the <em>Star League</em>...';
    const expected = '# Greetings, Starfighter\n\nYou have been recruited by the Star League...';

    it('should strip the HTML tags', async () => {
      const rendered = await shallow(<RichText text={text} />);

      await nextEventLoop(); // Allows Liquid rendering to resolve.

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('rich-text');

      const markdown = rendered.find('MarkdownText');

      expect(markdown).toExist();
      expect(markdown).toHaveProp({ text: expected });
    });

    it('should call useLiquid', () => {
      shallow(<RichText text={text} />);

      expect(useLiquid).toHaveBeenCalledWith({
        callback: expect.any(Function),
        template: expected,
      });
    });
  });

  describe('with liquid: false', () => {
    const defaultProps = { liquid: false };

    describe('with text: an empty string', () => {
      const text = '';

      it('should return an empty component', () => {
        const rendered = shallow(<RichText {...defaultProps} text={text} />);

        expect(rendered).toBeEmptyRender();
      });

      it('should not call useLiquid', () => {
        shallow(<RichText {...defaultProps} text={text} />);

        expect(useLiquid).not.toHaveBeenCalled();
      });
    });

    describe('with text: a plaintext string', () => {
      const text = 'Greetings, programs!';

      it('should process the text as markdown', () => {
        const rendered = shallow(<RichText {...defaultProps} text={text} />);

        expect(rendered).toHaveDisplayName('div');
        expect(rendered).toHaveClassName('rich-text');

        const markdown = rendered.find('MarkdownText');

        expect(markdown).toExist();
        expect(markdown).toHaveProp({ text });
      });

      it('should not call useLiquid', () => {
        shallow(<RichText {...defaultProps} text={text} />);

        expect(useLiquid).not.toHaveBeenCalled();
      });
    });

    describe('with text: a markdown document', () => {
      const text = '# Greetings, Starfighter\n\nYou have been recruited by the Star League...';

      it('should process the text as markdown', () => {
        const rendered = shallow(<RichText {...defaultProps} text={text} />);

        expect(rendered).toHaveDisplayName('div');
        expect(rendered).toHaveClassName('rich-text');

        const markdown = rendered.find('MarkdownText');

        expect(markdown).toExist();
        expect(markdown).toHaveProp({ text });
      });
    });
  });

  describe('with markdown: false', () => {
    const defaultProps = { markdown: false };

    describe('with text: an empty string', () => {
      const text = '';

      it('should return an empty component', () => {
        const rendered = shallow(<RichText {...defaultProps} text={text} />);

        expect(rendered).toBeEmptyRender();
      });

      it('should not call useLiquid', () => {
        shallow(<RichText {...defaultProps} text={text} />);

        expect(useLiquid).not.toHaveBeenCalled();
      });
    });

    describe('with text: a plaintext string', () => {
      const text = 'Greetings, programs!';

      it('should process the text as plain text', async () => {
        const rendered = await shallow(<RichText {...defaultProps} text={text} />);

        await nextEventLoop(); // Allows Liquid rendering to resolve.

        expect(rendered).toHaveDisplayName('div');
        expect(rendered).toHaveClassName('rich-text');

        const plaintext = rendered.find('PlainText');

        expect(plaintext).toExist();
        expect(plaintext).toHaveProp({ text });
      });

      it('should call useLiquid', () => {
        shallow(<RichText {...defaultProps} text={text} />);

        expect(useLiquid).toHaveBeenCalledWith({
          callback: expect.any(Function),
          template: text,
        });
      });
    });

    describe('with text: a markdown document', () => {
      const text = '# Greetings, Starfighter\n\nYou have been recruited by the Star League...';

      it('should process the text as plain text', async () => {
        const rendered = await shallow(<RichText {...defaultProps} text={text} />);

        await nextEventLoop(); // Allows Liquid rendering to resolve.

        expect(rendered).toHaveDisplayName('div');
        expect(rendered).toHaveClassName('rich-text');

        const plaintext = rendered.find('PlainText');

        expect(plaintext).toExist();
        expect(plaintext).toHaveProp({ text });
      });

      it('should call useLiquid', () => {
        shallow(<RichText {...defaultProps} text={text} />);

        expect(useLiquid).toHaveBeenCalledWith({
          callback: expect.any(Function),
          template: text,
        });
      });
    });
  });
});
