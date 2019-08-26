import {
  namespace,
  request,
  requestSpell,
  useSpell,
} from './index';

describe('ShowFindSpell store', () => {
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

  describe('requestSpell()', () => {
    it('should be a function', () => {
      expect(typeof requestSpell).toEqual('function');
    });
  });

  describe('useSpell()', () => {
    it('should be a function', () => {
      expect(typeof useSpell).toEqual('function');
    });
  });
});