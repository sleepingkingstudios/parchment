import {
  hooks,
  namespace,
  request,
} from './index';

describe('Update find Spell store', () => {
  describe('hooks', () => {
    const {
      useEndpoint,
      useRequestData,
    } = hooks;

    describe('useEndpoint()', () => {
      it('should be a function', () => {
        expect(typeof useEndpoint).toEqual('function');
      });
    });

    describe('useRequestData()', () => {
      it('should be a function', () => {
        expect(typeof useRequestData).toEqual('function');
      });
    });
  });

  describe('namespace', () => {
    it('should equal spells/updateFindSpell', () => {
      expect(namespace).toEqual('spells/updateFindSpell');
    });
  });

  describe('request', () => {
    const { url } = request;

    describe('url', () => {
      it('should be the spell show URL', () => {
        expect(url).toEqual('/api/spells/:id');
      });
    });
  });
});
