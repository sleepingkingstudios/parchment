import React from 'react';
import { shallow } from 'enzyme';

import generateColumns from './columns';

describe('SkillsTable columns', () => {
  const baseUrl = '/reference/skills';
  const useDestroyRequest = jest.fn();
  const actions = ['show'];
  const columns = generateColumns({ actions, baseUrl, useDestroyRequest });

  it('should be a function', () => {
    expect(typeof generateColumns).toEqual('function');
  });

  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'name',
      'abilityScore',
      'actions',
      'shortDescription',
    ];

    expect(props).toEqual(expected);
  });

  describe('abilityScore', () => {
    it('should have the expected properties', () => {
      const abilityScore = 'charisma';
      const matching = columns.find(column => (column.prop === 'abilityScore'));

      expect(matching.label).toEqual('Ability Score');
      expect(typeof matching.value).toEqual('function');
      expect(matching.value({ abilityScore })).toEqual('Charisma');
    });
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
      expect(rendered).toHaveProp({ resourceName: 'skill' });
      expect(rendered).toHaveProp({ useDestroyRequest });
    });
  });

  describe('name', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'name'));

      expect(matching.label).toEqual('Name');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('shortDescription', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'shortDescription'));

      expect(matching.label).toEqual('Description');
      expect(matching.value).toBeUndefined();
    });
  });
});
