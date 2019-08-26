import generateSelector from './selector';

describe('API endpoint selector', () => {
  describe('with a simple namespace', () => {
    const namespace = 'endpoint';
    const selector = generateSelector({ namespace });
    const inner = { key: 'value' };
    const state = { endpoint: inner };

    it('should retrieve the data', () => {
      expect(selector(state)).toEqual(inner);
    });
  });

  describe('with a compound namespace', () => {
    const namespace = 'api/admin/endpoint';
    const selector = generateSelector({ namespace });
    const inner = { key: 'value' };
    const state = { api: { admin: { endpoint: inner } } };

    it('should retrieve the data', () => {
      expect(selector(state)).toEqual(inner);
    });
  });
});
