import { request } from './index';

describe('Find Spell store', () => {
  describe('request', () => {
    const { url } = request;

    describe('url', () => {
      it('should be the spell create URL', () => {
        expect(url).toEqual('/api/spells/:id');
      });
    });
  });
});
