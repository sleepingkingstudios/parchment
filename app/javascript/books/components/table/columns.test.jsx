import React from 'react';
import { shallow } from 'enzyme';

import generateColumns from './columns';

describe('Books table generateColumns()', () => {
  const useDestroyRequest = jest.fn();
  const columns = generateColumns({ useDestroyRequest });

  it('should be a function', () => {
    expect(typeof generateColumns).toEqual('function');
  });

  it('should have the expected props', () => {
    const props = columns.map(column => column.prop);
    const expected = [
      'title',
      'publisherName',
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
      const actions = shallow(<Actions id={id} />);

      expect(actions).toHaveDisplayName('ResponsiveActions');
      expect(actions).toHaveProp({ resourceName: 'book' });
      expect(actions).toHaveProp({ useDestroyRequest });
    });
  });

  describe('publisherName', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'publisherName'));

      expect(matching.label).toEqual('Publisher');
      expect(matching.value).toBeUndefined();
    });
  });

  describe('title', () => {
    it('should have the expected properties', () => {
      const matching = columns.find(column => (column.prop === 'title'));

      expect(matching.label).toEqual('Title');
      expect(matching.value).toBeUndefined();
    });
  });
});
