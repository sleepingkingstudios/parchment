import React from 'react';
import { shallow } from 'enzyme';

import generateColumns from './columns';

describe('MagicItemsTable columns', () => {
  const baseUrl = '/reference/items/magic-items';
  const useDestroyRequest = jest.fn();
  const actions = ['show', 'update', 'destroy'];
  const columns = generateColumns({ actions, baseUrl, useDestroyRequest });

  it('should be a function', () => {
    expect(typeof generateColumns).toEqual('function');
  });

  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'name',
      'category',
      'rarity',
      'actions',
    ];

    expect(props).toEqual(expected);
  });

  describe('actions', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'actions'));

      expect(matching.label).toEqual(false);
    });

    it('should render the actions component', () => {
      const matching = columns.find(column => (column.prop === 'actions'));
      const Actions = matching.value;
      const id = '00000000-0000-0000-0000-000000000000';
      const rendered = shallow(<Actions id={id} />);

      expect(rendered).toHaveDisplayName('ResponsiveActions');
      expect(rendered).toHaveProp({ actions });
      expect(rendered).toHaveProp({ baseUrl });
      expect(rendered).toHaveProp({ resourceName: 'magicItem' });
      expect(rendered).toHaveProp({ useDestroyRequest });
    });
  });

  describe('category', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'category'));

      expect(matching.label).toEqual('Category');
      expect(typeof matching.value).toEqual('function');
      expect(matching.value({ category: 'wondrous item' })).toEqual('Wondrous Item');
    });
  });

  describe('name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'name'));

      expect(matching.label).toEqual('Name');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('rarity', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'rarity'));

      expect(matching.label).toEqual('Rarity');
      expect(typeof matching.value).toEqual('function');
      expect(matching.value({ rarity: 'very rare' })).toEqual('Very Rare');
    });
  });
});
