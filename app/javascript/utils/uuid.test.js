import {
  generateFingerprintUuid,
  generateRandomUuid,
  isUuid,
} from './uuid';

describe('UUID utils', () => {
  const rxp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

  describe('generateFingerprintUuid', () => {
    const seed = 'Greetings, programs!';

    it('should be a function', () => {
      expect(typeof generateFingerprintUuid).toEqual('function');
    });

    it('should return a UUID', () => {
      const uuid = generateFingerprintUuid(seed);

      expect(typeof uuid).toEqual('string');
      expect(uuid.length).toEqual(36);
      expect(uuid).toMatch(rxp);
    });

    it('should match the fingerprint', () => {
      const uuid = generateFingerprintUuid(seed);
      const expected = '3da2a9cd-1217-a4eb-3c45-71c280be5349';

      expect(uuid).toEqual(expected);
    });
  });

  describe('generateRandomUuid()', () => {
    it('should be a function', () => {
      expect(typeof generateRandomUuid).toEqual('function');
    });

    it('should return a UUID', () => {
      const uuid = generateRandomUuid();

      expect(typeof uuid).toEqual('string');
      expect(uuid.length).toEqual(36);
      expect(uuid).toMatch(rxp);
    });

    it('should return a random value', () => {
      const uuid = generateRandomUuid();

      expect(generateRandomUuid()).not.toEqual(uuid);
    });
  });

  describe('isUuid', () => {
    it('should be a function', () => {
      expect(typeof isUuid).toEqual('function');
    });

    describe('with null', () => {
      it('should return false', () => {
        expect(isUuid(null)).toBe(false);
      });
    });

    describe('with an Object', () => {
      it('should return false', () => {
        expect(isUuid({})).toBe(false);
      });
    });

    describe('with an empty String', () => {
      it('should return false', () => {
        expect(isUuid('')).toBe(false);
      });
    });

    describe('with a String', () => {
      it('should return false', () => {
        expect(isUuid('Greetings, programs!')).toBe(false);
      });
    });

    describe('with a lowercase UUID', () => {
      it('should return true', () => {
        expect(isUuid('01234567-89ab-cdef-0123-456789abcdef')).toBe(true);
      });
    });

    describe('with an uppercase UUID', () => {
      it('should return true', () => {
        expect(isUuid('01234567-89AB-CDEF-0123-456789ABCDEF')).toBe(true);
      });
    });
  });
});
