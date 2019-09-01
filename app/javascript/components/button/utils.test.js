import {
  buttonClass,
  disabledOnClick,
} from './utils';

const buttonStyles = [
  'danger',
  'dark',
  'info',
  'light',
  'primary',
  'secondary',
  'success',
  'warning',
];

describe('buttonClass', () => {
  it('should be a function', () => {
    expect(typeof buttonClass).toEqual('function');
  });

  it('should generate the button class', () => {
    const props = {};
    const expected = 'btn btn-primary';

    expect(buttonClass(props)).toEqual(expected);
  });

  describe('with block: true', () => {
    it('should generate the button class', () => {
      const props = { block: true };
      const expected = 'btn btn-primary btn-block';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  describe('with buttonSize: large', () => {
    it('should generate the button class', () => {
      const buttonSize = 'large';
      const props = { buttonSize };
      const expected = 'btn btn-primary btn-lg';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  describe('with buttonSize: lg', () => {
    it('should generate the button class', () => {
      const buttonSize = 'lg';
      const props = { buttonSize };
      const expected = 'btn btn-primary btn-lg';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  describe('with buttonSize: md', () => {
    it('should generate the button class', () => {
      const buttonSize = 'md';
      const props = { buttonSize };
      const expected = 'btn btn-primary';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  describe('with buttonSize: medium', () => {
    it('should generate the button class', () => {
      const buttonSize = 'md';
      const props = { buttonSize };
      const expected = 'btn btn-primary';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  describe('with buttonSize: sm', () => {
    it('should generate the button class', () => {
      const buttonSize = 'sm';
      const props = { buttonSize };
      const expected = 'btn btn-primary btn-sm';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  describe('with buttonSize: small', () => {
    it('should generate the button class', () => {
      const buttonSize = 'small';
      const props = { buttonSize };
      const expected = 'btn btn-primary btn-sm';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  describe('with buttonSize: unknown value', () => {
    it('should generate the button class', () => {
      const buttonSize = 'lilliputian';
      const props = { buttonSize };
      const expected = 'btn btn-primary';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  buttonStyles.forEach((buttonStyle) => {
    describe(`with buttonStyle: ${buttonStyle}`, () => {
      it('should generate the button class', () => {
        const props = { buttonStyle };
        const expected = `btn btn-${buttonStyle}`;

        expect(buttonClass(props)).toEqual(expected);
      });
    });
  });

  describe('with buttonStyle: unknown value', () => {
    it('should generate the button class', () => {
      const buttonStyle = 'mysterious';
      const props = { buttonStyle };
      const expected = 'btn btn-primary';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  describe('with className: value', () => {
    it('should generate the button class', () => {
      const className = 'custom-btn';
      const props = { className };
      const expected = 'btn btn-primary custom-btn';

      expect(buttonClass(props)).toEqual(expected);
    });
  });

  describe('with link: true', () => {
    it('should generate the button class', () => {
      const props = { link: true };
      const expected = 'btn btn-link';

      expect(buttonClass(props)).toEqual(expected);
    });

    buttonStyles.forEach((buttonStyle) => {
      describe(`with buttonStyle: ${buttonStyle}`, () => {
        it('should generate the button class', () => {
          const props = { buttonStyle, link: true };
          const expected = `btn btn-link text-${buttonStyle}`;

          expect(buttonClass(props)).toEqual(expected);
        });
      });
    });

    describe('with buttonStyle: unknown value', () => {
      it('should generate the button class', () => {
        const buttonStyle = 'mysterious';
        const props = { buttonStyle, link: true };
        const expected = 'btn btn-link';

        expect(buttonClass(props)).toEqual(expected);
      });
    });
  });

  describe('with outline: true', () => {
    it('should generate the button class', () => {
      const props = { outline: true };
      const expected = 'btn btn-outline-primary';

      expect(buttonClass(props)).toEqual(expected);
    });

    buttonStyles.forEach((buttonStyle) => {
      describe(`with buttonStyle: ${buttonStyle}`, () => {
        it('should generate the button class', () => {
          const props = { buttonStyle, outline: true };
          const expected = `btn btn-outline-${buttonStyle}`;

          expect(buttonClass(props)).toEqual(expected);
        });
      });
    });

    describe('with buttonStyle: unknown value', () => {
      it('should generate the button class', () => {
        const buttonStyle = 'mysterious';
        const props = { buttonStyle, outline: true };
        const expected = 'btn btn-outline-primary';

        expect(buttonClass(props)).toEqual(expected);
      });
    });
  });
});

describe('disabledOnClick()', () => {
  const preventDefault = jest.fn();
  const event = { preventDefault };

  it('should be a function', () => {
    expect(typeof disabledOnClick).toEqual('function');
  });

  it('should call preventDefault()', () => {
    disabledOnClick(event);

    expect(preventDefault).toHaveBeenCalled();
  });
});
