import store from './store';

describe('Spells index-page store', () => {
  const {
    options,
    type,
  } = store;

  describe('options', () => {
    it('should return the configured options', () => {
      const expected = {
        namespace: 'spells/index',
        resourceName: 'spells',
        url: 'api/spells',
      };

      expect(options).toEqual(expected);
    });
  });

  describe('type', () => {
    it('should be resource/index-page/store', () => {
      expect(type).toEqual('resource/index-page/store');
    });
  });
});
