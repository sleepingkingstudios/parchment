import engine from './engine';

describe('RichText liquid engine', () => {
  describe('parseAndRender()', () => {
    it('should be a function', () => {
      expect(typeof engine.parseAndRender).toEqual('function');
    });

    describe('with an empty string', () => {
      const template = '';

      it('should return an empty string', async () => {
        const rendered = await engine.parseAndRender(template);

        expect(rendered).toEqual(template);
      });
    });

    describe('with a plaintext string', () => {
      const template = 'Greetings, programs!';

      it('should return an empty string', async () => {
        const rendered = await engine.parseAndRender(template);

        expect(rendered).toEqual(template);
      });
    });

    describe('with a string with a liquid tag', () => {
      const template = '{{ "greetings" | capitalize }}, programs!';
      const expected = 'Greetings, programs!';

      it('should return an empty string', async () => {
        const rendered = await engine.parseAndRender(template);

        expect(rendered).toEqual(expected);
      });
    });
  });
});
