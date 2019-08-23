import {
  namespace,
  request,
} from './index';

describe('Find Spells store', () => {
  describe('namespace', () => {
    it('should be spells/showFindSpell', () => {
      expect(namespace).toEqual('spells/indexFindSpells');
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
      it('should be the spell index URL', () => {
        expect(url).toEqual('/api/spells');
      });
    });
  });
});
