import updatePage from './index';
import { Form } from '../../components/form';
import { buildSpell } from '../../entities';

describe('spells updatePage', () => {
  const data = { spell: buildSpell() };
  const namespace = 'spells/update';
  const resourceName = 'spell';
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
      expect(updatePage.options).toEqual(expected);
    });
  });

  describe('type', () => {
    it('should be resource/pages/updatePage', () => {
      expect(updatePage.type).toEqual('resource/pages/updatePage');
    });
  });
});
