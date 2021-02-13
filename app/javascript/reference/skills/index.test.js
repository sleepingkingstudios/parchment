import resource from './index';
import { Block } from './components/block';
import { Table } from './components/table';

describe('skills resource', () => {
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
  const namespace = 'reference/skills';
  const resourceName = 'skills';
  const url = '/api/reference/skills';
  const resources = {
    index: true,
    show: true,
  };

  describe('options', () => {
    it('should return the configured options', () => {
      const expected = {
        Block,
        Table,
        breadcrumbs,
        destroy: false,
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
