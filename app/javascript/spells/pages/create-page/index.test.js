import createPage from './index';
import { Form } from '../../components/form';
import { buildSpell } from '../../entities';

describe('spells createPage', () => {
  const data = {
    spell: buildSpell(),
  };
  const namespace = 'spells/create';
  const resourceName = 'spells';
  const url = '/api/spells';

  describe('options', () => {
    const expected = {
      Form,
      data,
      namespace,
      resourceName,
      url,
    };

    it('should return the configured options', () => {
      expect(createPage.options).toEqual(expected);
    });
  });

  describe('type', () => {
    it('should be resource/pages/showPage', () => {
      expect(createPage.type).toEqual('resource/pages/createPage');
    });
  });
});
