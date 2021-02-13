import resource from './index';
import { Block } from './components/block';
import { Form } from './components/form';
import { Table } from './components/table';
import { buildSpell } from './entities';

describe('spells resource', () => {
  const resourceName = 'spells';
  const url = '/api/spells';

  describe('options', () => {
    it('should return the configured options', () => {
      const expected = {
        Block,
        Form,
        Table,
        resourceName,
        resources: expect.any(Object),
        url,
      };

      expect(resource.options).toEqual(expected);
    });

    describe('resources', () => {
      const { resources } = resource.options;

      it('should be configured with the standard resources', () => {
        expect(Object.keys(resources)).toEqual(['create', 'index', 'show', 'update']);
      });

      describe('create', () => {
        const { create } = resources;

        it('should set the initial data', () => {
          expect(create.options.data).toEqual({ spell: buildSpell() });
        });
      });

      describe('show', () => {
        const { show } = resources;
        const { middleware } = show.options;

        it('should define the middleware', () => {
          expect(middleware.length).toEqual(1);

          const collectSource = middleware[0];

          expect(collectSource.options).toEqual({
            associationName: 'source',
            associationType: 'hasOne',
            inverseName: 'reference',
            polymorphic: true,
            resourceName: 'spell',
          });
          expect(collectSource.type).toEqual('api/collectAssociations');
        });
      });
    });
  });

  describe('type', () => {
    it('should be resource', () => {
      expect(resource.type).toEqual('resource');
    });
  });
});
