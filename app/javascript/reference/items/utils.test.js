import {
  formatType,
} from './utils';

describe('items utils', () => {
  describe('formatType()', () => {
    it('should be a function', () => {
      expect(typeof formatType).toEqual('function');
    });

    describe('with undefined', () => {
      it('should return an empty string', () => {
        expect(formatType(undefined)).toEqual('');
      });
    });

    describe('with null', () => {
      it('should return an empty string', () => {
        expect(formatType(null)).toEqual('');
      });
    });

    describe('with an empty string', () => {
      it('should return an empty string', () => {
        expect(formatType('')).toEqual('');
      });
    });

    describe('with a single word type', () => {
      it('should format the type', () => {
        expect(formatType('Types::Explosives')).toEqual('Explosives');
      });
    });

    describe('with a multiple word type', () => {
      it('should format the type', () => {
        expect(formatType('rocket fuel')).toEqual('Rocket Fuel');
      });
    });

    describe('with a camelcase word type', () => {
      it('should format the type', () => {
        expect(formatType('Types::RocketFuel')).toEqual('Rocket Fuel');
      });
    });

    describe('with an underscored word type', () => {
      it('should format the type', () => {
        expect(formatType('rocket_fuel')).toEqual('Rocket Fuel');
      });
    });
  });
});
