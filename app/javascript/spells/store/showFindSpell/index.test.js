import {
  findSpell,
  namespace,
  request,
  useSpell,
} from './index';

describe('Show find Spell store', () => {
  describe('findSpell()', () => {
    it('should be a function', () => {
      expect(typeof findSpell).toEqual('function');
    });
  });

  describe('namespace', () => {
    it('should be spells/showFindSpell', () => {
      expect(namespace).toEqual('spells/showFindSpell');
    });
  });

  describe('request', () => {
    const {
      method,
      url,
    } = request;

    describe('method', () => {
      it('should be GET', () => {
        expect(method).toEqual('GET');
      });
    });

    describe('url', () => {
      it('should be the spell show URL', () => {
        expect(url).toEqual('/api/spells/:id');
      });
    });
  });

  describe('useSpell()', () => {
    it('should be a function', () => {
      expect(typeof useSpell).toEqual('function');
    });
  });
});
