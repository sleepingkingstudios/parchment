import {
  buttonClass,
  buttonStyleClass,
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

  describe('with buttonStyle: value', () => {
    it('should generate the button class', () => {
      const buttonStyle = 'dark';
      const props = { buttonStyle };
      const expected = 'btn btn-dark';

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

  describe('with outline: true', () => {
    it('should generate the button class', () => {
      const props = { outline: true };
      const expected = 'btn btn-outline-primary';

      expect(buttonClass(props)).toEqual(expected);
    });

    describe('with buttonStyle: value', () => {
      it('should generate the button class', () => {
        const buttonStyle = 'dark';
        const props = { buttonStyle, outline: true };
        const expected = 'btn btn-outline-dark';

        expect(buttonClass(props)).toEqual(expected);
      });
    });
  });
});

describe('buttonStyleClass()', () => {
  it('should be a function', () => {
    expect(typeof buttonStyleClass).toEqual('function');
  });

  buttonStyles.forEach((buttonStyle) => {
    describe(`with buttonStyle: ${buttonStyle}`, () => {
      it('should return the style class', () => {
        const props = { buttonStyle };
        const expected = `btn-${buttonStyle}`;

        expect(buttonStyleClass(props)).toEqual(expected);
      });
    });
  });

  describe('with buttonStyle: link', () => {
    it('should return the style class', () => {
      const buttonStyle = 'link';
      const props = { buttonStyle };
      const expected = 'btn-link';

      expect(buttonStyleClass(props)).toEqual(expected);
    });
  });

  describe('with buttonStyle: unknown value', () => {
    it('should return the style class', () => {
      const buttonStyle = 'enigmatic';
      const props = { buttonStyle };
      const expected = 'btn-primary';

      expect(buttonStyleClass(props)).toEqual(expected);
    });
  });

  describe('with outline: true', () => {
    buttonStyles.forEach((buttonStyle) => {
      describe(`with buttonStyle: ${buttonStyle}`, () => {
        it('should return the style class', () => {
          const props = { buttonStyle, outline: true };
          const expected = `btn-outline-${buttonStyle}`;

          expect(buttonStyleClass(props)).toEqual(expected);
        });
      });
    });

    describe('with buttonStyle: link', () => {
      it('should return the style class', () => {
        const buttonStyle = 'link';
        const props = { buttonStyle, outline: true };
        const expected = 'btn-link';

        expect(buttonStyleClass(props)).toEqual(expected);
      });
    });

    describe('with buttonStyle: unknown value', () => {
      it('should return the style class', () => {
        const buttonStyle = 'enigmatic';
        const props = { buttonStyle, outline: true };
        const expected = 'btn-outline-primary';

        expect(buttonStyleClass(props)).toEqual(expected);
      });
    });
  });
});
