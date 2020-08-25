import engine from './engine';
import render from './render';

describe('RichText liquid rendering', () => {
  const template = '{{ "greetings" | capitalize }}, programs!';
  const expected = 'Greetings, programs!';

  it('should be a function', () => {
    expect(typeof render).toEqual('function');
  });

  it('should render the liquid templates', async () => {
    const rendered = await render({ template });

    expect(rendered).toEqual(expected);
  });

  it('should call parseAndRender', async () => {
    const spy = jest.spyOn(engine, 'parseAndRender');

    await render({ template });

    expect(spy).toHaveBeenCalledWith(template);
  });

  describe('with callback: function', () => {
    it('should render the liquid templates', async () => {
      const status = { active: true };
      const callback = jest.fn();
      const rendered = await render({ callback, status, template });

      expect(rendered).toEqual(expected);
    });

    describe('when status: active is false', () => {
      it('should not call the callback with the rendered templates', async () => {
        const status = { active: false };
        const callback = jest.fn();

        await render({ callback, status, template });

        expect(callback).not.toHaveBeenCalled();
      });
    });

    describe('when status: active is true', () => {
      it('should call the callback with the rendered templates', async () => {
        const status = { active: true };
        const callback = jest.fn();

        await render({ callback, status, template });

        expect(callback).toHaveBeenCalledWith(expected);
      });
    });
  });
});
