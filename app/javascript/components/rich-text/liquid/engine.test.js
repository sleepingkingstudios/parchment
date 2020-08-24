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

      it('should return the string', async () => {
        const rendered = await engine.parseAndRender(template);

        expect(rendered).toEqual(template);
      });
    });

    describe('with a string with a liquid tag', () => {
      const template = '{{ "greetings" | capitalize }}, programs!';
      const expected = 'Greetings, programs!';

      it('should render the template', async () => {
        const rendered = await engine.parseAndRender(template);

        expect(rendered).toEqual(expected);
      });
    });

    describe('with a string with an action link', () => {
      it('should render the template', async () => {
        const template = '{{ "splash" | action_link }}';
        const expected = '[splash](/mechanics/actions/splash)';
        const rendered = await engine.parseAndRender(template);

        expect(rendered).toEqual(expected);
      });

      describe('when the link has custom text', () => {
        it('should render the template', async () => {
          const template = '{{ "splish splash" | action_link: "splash" }}';
          const expected = '[splish splash](/mechanics/actions/splash)';
          const rendered = await engine.parseAndRender(template);

          expect(rendered).toEqual(expected);
        });
      });
    });

    describe('with a string with a condition link', () => {
      it('should render the template', async () => {
        const template = '{{ "taunt" | condition_link }}';
        const expected = '[taunt](/mechanics/conditions/taunt)';
        const rendered = await engine.parseAndRender(template);

        expect(rendered).toEqual(expected);
      });

      describe('when the link has custom text', () => {
        it('should render the template', async () => {
          const template = '{{ "taunt an opponent" | condition_link: "taunt" }}';
          const expected = '[taunt an opponent](/mechanics/conditions/taunt)';
          const rendered = await engine.parseAndRender(template);

          expect(rendered).toEqual(expected);
        });
      });
    });

    describe('with a string with a spell link', () => {
      it('should render the template', async () => {
        const template = '{{ "Flumph Lantern" | spell_link }}';
        const expected = '[Flumph Lantern](/spells/flumph-lantern)';
        const rendered = await engine.parseAndRender(template);

        expect(rendered).toEqual(expected);
      });

      describe('when the link has custom text', () => {
        it('should render the template', async () => {
          const template = '{{ "cast Flumph Lantern" | spell_link: "flumph-lantern" }}';
          const expected = '[cast Flumph Lantern](/spells/flumph-lantern)';
          const rendered = await engine.parseAndRender(template);

          expect(rendered).toEqual(expected);
        });
      });
    });
  });
});
