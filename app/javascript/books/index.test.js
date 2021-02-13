import resource from './index';
import { Block } from './components/block';
import { Form } from './components/form';
import { Table } from './components/table';
import { buildBook } from './entities';

describe('books resource', () => {
  const resourceName = 'books';
  const url = '/api/books';

  describe('options', () => {
    it('should return the configured options', () => {
      const expected = {
        Block,
        Form,
        Table,
        resourceName,
        resourceNameProp: 'title',
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
          expect(create.options.data).toEqual({ book: buildBook() });
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
