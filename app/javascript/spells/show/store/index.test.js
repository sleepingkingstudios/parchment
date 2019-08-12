import { request } from './index';

describe('Find Spell store', () => {
  describe('request', () => {
    const { url } = request;

    describe('url', () => {
      it('should be the spell show URL', () => {
        expect(url).toEqual('/api/spells/:id');
      });
    });
  });
});
