import showPage from './index';
import { Block } from '../../components/block';

describe('spells indexPage', () => {
  const namespace = 'spells/show';
  const resourceName = 'spell';
  const url = '/api/spells';

  describe('options', () => {
    const expected = {
      Block,
      middleware: expect.anything(),
      namespace,
      resourceName,
      url,
    };

    it('should return the configured options', () => {
      expect(showPage.options).toEqual(expected);
    });

    describe('middleware', () => {
      const { middleware } = showPage.options;

      it('should have 1 item', () => {
        expect(middleware.length).toEqual(1);
      });

      it('should configure the collectSource middleware', () => {
        const collectSource = middleware[0];
        const {
          options,
          type,
        } = collectSource;
        const expectedOptions = {
          associationName: 'source',
          associationType: 'hasOne',
          inverseName: 'reference',
          polymorphic: true,
          resourceName: 'spell',
        };

        expect(options).toEqual(expectedOptions);
        expect(type).toEqual('api/collectAssociations');
      });
    });
  });

  describe('type', () => {
    it('should be resource/pages/showPage', () => {
      expect(showPage.type).toEqual('resource/pages/showPage');
    });
  });
});
