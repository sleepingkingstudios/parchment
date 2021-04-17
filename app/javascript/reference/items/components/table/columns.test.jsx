import React from 'react';
import { shallow } from 'enzyme';

import generateColumns from './columns';

describe('ItemsTable columns', () => {
  const baseUrl = '/reference/items';
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
      'type',
      'cost',
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
      expect(rendered).toHaveProp({ resourceName: 'item' });
      expect(rendered).toHaveProp({ useDestroyRequest });
    });
  });

  describe('cost', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'cost'));

      expect(matching.label).toEqual('Cost');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'name'));

      expect(matching.label).toEqual('Name');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('type', () => {
    describe('with an item with no type', () => {
      it('should have the expected properties', () => {
        const matching = columns.find(column => (column.prop === 'type'));
        const rendered = shallow(matching.value({}));

        expect(matching.label).toEqual('Type');
        expect(typeof matching.value).toEqual('function');

        expect(rendered).toExist();
        expect(rendered).toHaveDisplayName('span');
        expect(rendered).toHaveClassName('text-muted');
        expect(rendered).toHaveText('(None)');
      });
    });

    describe('with an item with type: a value', () => {
      it('should have the expected properties', () => {
        const matching = columns.find(column => (column.prop === 'type'));

        expect(matching.label).toEqual('Type');
        expect(typeof matching.value).toEqual('function');
        expect(matching.value({ type: 'Types::RocketFuel' })).toEqual('Rocket Fuel');
      });
    });
  });
});
