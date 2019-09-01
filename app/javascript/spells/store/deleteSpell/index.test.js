import {
  hooks,
  namespace,
  request,
} from './index';

describe('UpdateSpellForm store', () => {
  describe('hooks', () => {
    const { useDeleteData } = hooks;

    describe('useDeleteData()', () => {
      it('should be a function', () => {
        expect(typeof useDeleteData).toEqual('function');
      });
    });
  });

  describe('namespace', () => {
    it('should be spells/deleteSpell', () => {
      expect(namespace).toEqual('spells/deleteSpell');
    });
  });

  describe('request', () => {
    const {
      method,
      url,
    } = request;

    describe('method', () => {
      it('should be DELETE', () => {
        expect(method).toEqual('DELETE');
      });
    });

    describe('url', () => {
      it('should be the spell delete URL', () => {
        expect(url).toEqual('/api/spells/:id');
      });
    });
  });
});
