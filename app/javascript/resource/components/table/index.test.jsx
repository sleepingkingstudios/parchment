import React from 'react';
import { shallow } from 'enzyme';

import IndexPageTable from './index';

describe('<IndexPageTable />', () => {
  const columns = jest.fn(() => ([{ label: 'Name', prop: 'name' }]));
  const data = { widgets: [] };
  const pluralDisplayName = 'gadgets';
  const resourceName = 'widgets';
  const defaultProps = {
    actions: ['update', 'destroy'],
    columns,
    data,
    pluralDisplayName,
    resourceName,
  };

  describe('with default props', () => {
    const rendered = shallow(<IndexPageTable {...defaultProps} />);

    it('should render a DynamicTable', () => {
      expect(rendered).toHaveDisplayName('DynamicTable');
    });

    it('should map the data', () => {
      const expected = data[resourceName];

      expect(rendered).toHaveProp({ data: expected });
    });

    it('should set the empty message', () => {
      const expected = `There are no ${pluralDisplayName} matching the criteria.`;

      expect(rendered).toHaveProp({ message: expected });
    });

    it('should set the resource name', () => {
      expect(rendered).toHaveProp({ resourceName });
    });

    it('should set the table columns', () => {
      const expected = columns();

      expect(rendered).toHaveProp({ columns: expected });
    });

    it('should pass the actions and baseUrl to columns', () => {
      const actions = ['update', 'destroy'];

      shallow(<IndexPageTable {...defaultProps} />);

      expect(columns).toHaveBeenCalledWith({
        actions,
        baseUrl: null,
        useDestroyRequest: null,
      });
    });

    it('should match the snapshot', () => {
      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with actions: value', () => {
    const actions = ['index', 'show'];

    it('should pass the actions and baseUrl to columns', () => {
      shallow(<IndexPageTable {...defaultProps} actions={actions} />);

      expect(columns).toHaveBeenCalledWith({
        actions,
        baseUrl: null,
        useDestroyRequest: null,
      });
    });
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/path/to/widgets';

    beforeEach(() => { columns.mockClear(); });

    it('should pass the actions and baseUrl to columns', () => {
      const actions = ['update', 'destroy'];

      shallow(<IndexPageTable {...defaultProps} baseUrl={baseUrl} />);

      expect(columns).toHaveBeenCalledWith({
        actions,
        baseUrl,
        useDestroyRequest: null,
      });
    });
  });

  describe('with emptyMessage: string', () => {
    const emptyMessage = "These aren't the widgets you're looking for.";
    const rendered = shallow(<IndexPageTable {...defaultProps} emptyMessage={emptyMessage} />);

    it('should set the empty message', () => {
      expect(rendered).toHaveProp({ message: emptyMessage });
    });
  });

  describe('with mapData: function', () => {
    const wrappedData = { scoped: data };
    const mapData = raw => raw.scoped[resourceName];
    const rendered = shallow(
      <IndexPageTable {...defaultProps} data={wrappedData} mapData={mapData} />,
    );

    it('should map the data', () => {
      const expected = data[resourceName];

      expect(rendered).toHaveProp({ data: expected });
    });
  });

  describe('with useDestroyRequest: function', () => {
    const useDestroyRequest = jest.fn();

    beforeEach(() => { columns.mockClear(); });

    it('should pass the request to columns', () => {
      const actions = ['update', 'destroy'];

      shallow(<IndexPageTable {...defaultProps} useDestroyRequest={useDestroyRequest} />);

      expect(columns).toHaveBeenCalledWith({
        actions,
        baseUrl: null,
        useDestroyRequest,
      });
    });
  });
});
