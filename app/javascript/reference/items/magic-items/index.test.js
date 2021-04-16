import resource from './index';
import { Content as ItemsIndexPageContent } from '../pages/index-page';
import { Block } from './components/block';
import { Table } from './components/table';

describe('magic items resource', () => {
  const breadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Reference',
      url: '/reference',
      active: true,
    },
    {
      label: 'Items',
      url: '/reference/items',
    },
  ];
  const namespace = 'reference/items/magicItems';
  const resourceName = 'magicItems';
  const url = '/api/reference/items/magic_items';
  const resources = {
    index: { options: { Content: ItemsIndexPageContent } },
    create: false,
    show: true,
    update: false,
  };

  describe('options', () => {
    it('should return the configured options', () => {
      const expected = {
        Block,
        Table,
        breadcrumbs,
        namespace,
        resourceName,
        resources,
        url,
      };

      expect(resource.options).toEqual(expected);
    });
  });

  describe('type', () => {
    it('should be resource', () => {
      expect(resource.type).toEqual('resource');
    });
  });
});
