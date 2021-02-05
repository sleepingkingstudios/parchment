import indexPage from './index';
import { Table } from '../../components/table';

describe('spells indexPage', () => {
  const namespace = 'spells/index';
  const resourceName = 'spells';
  const url = '/api/spells';

  describe('options', () => {
    const expected = {
      Table,
      namespace,
      resourceName,
      url,
    };

    it('should return the configured options', () => {
      expect(indexPage.options).toEqual(expected);
    });
  });

  describe('type', () => {
    it('should be resource/pages/showPage', () => {
      expect(indexPage.type).toEqual('resource/pages/indexPage');
    });
  });
});
