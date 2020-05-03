import {
  decode,
  encode,
} from './encoder';

describe('Authentication session encoder', () => {
  describe('decode()', () => {
    it('should be a function', () => {
      expect(typeof decode).toEqual('function');
    });

    describe('with null', () => {
      it('should return an empty session', () => {
        expect(decode(null)).toEqual({});
      });
    });

    describe('with an empty string', () => {
      it('should return an empty session', () => {
        expect(decode('')).toEqual({});
      });
    });

    describe('with an invalid base64 string', () => {
      it('should return an empty session', () => {
        expect(decode('Ω')).toEqual({});
      });
    });

    describe('with an invalid encoded JSON object', () => {
      const encoded = btoa('invalid JSON');

      it('should return an empty session', () => {
        expect(decode(encoded)).toEqual({});
      });
    });

    describe('with an encoded empty object', () => {
      const encoded = btoa(JSON.stringify({}));

      it('should return an empty session', () => {
        expect(decode(encoded)).toEqual({});
      });
    });

    describe('with an encoded session', () => {
      const session = {
        token: 'a.b.c',
        user: {
          id: '00000000-0000-0000-0000-000000000000',
          emailAddress: 'alan.bradley@example.com',
          role: 'user',
          username: 'Alan Bradley',
        },
      };
      const encoded = btoa(JSON.stringify(session));

      it('should decode the session', () => {
        expect(decode(encoded)).toEqual(session);
      });
    });
  });

  describe('encode()', () => {
    it('should be a function', () => {
      expect(typeof encode).toEqual('function');
    });

    describe('with null', () => {
      const expected = btoa(JSON.stringify({}));

      it('should encode an empty session', () => {
        expect(encode(null)).toEqual(expected);
      });
    });

    describe('with an empty object', () => {
      const expected = btoa(JSON.stringify({}));

      it('should encode an empty session', () => {
        expect(encode({})).toEqual(expected);
      });
    });

    describe('with a session object', () => {
      const session = {
        token: 'a.b.c',
        user: {
          id: '00000000-0000-0000-0000-000000000000',
          emailAddress: 'alan.bradley@example.com',
          role: 'user',
          username: 'Alan Bradley',
        },
      };
      const expected = btoa(JSON.stringify(session));

      it('should encode the session', () => {
        expect(encode(session)).toEqual(expected);
      });
    });
  });
});
