import resource from './index';
import { Content as ItemsIndexPageContent } from './pages/index-page';
import { Block } from './components/block';
import { Form } from './components/form';
import { Table } from './components/table';
import { buildItem } from './entities';
import {
  Routes as MagicItems,
  reducer as magicItemsReducer,
} from './magic-items';

describe('items resource', () => {
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
  ];
  const namespace = 'reference/items';
  const resourceName = 'items';
  const url = '/api/reference/items';
  const resources = {
    create: { options: { data: { item: buildItem() } } },
    index: { options: { Content: ItemsIndexPageContent } },
    magicItems: {
      component: MagicItems,
      exact: false,
      options: {},
      path: '/magic-items',
      reducer: magicItemsReducer,
    },
    show: true,
    update: true,
  };

  describe('options', () => {
    it('should return the configured options', () => {
      const expected = {
        Block,
        Form,
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
