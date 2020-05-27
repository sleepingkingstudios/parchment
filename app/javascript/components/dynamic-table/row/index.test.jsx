import React from 'react';
import { shallow } from 'enzyme';

import DynamicTableRow from './index';

describe('<DynamicTableRow />', () => {
  const columns = [
    { label: true, prop: 'id' },
    { label: true, prop: 'name' },
    { label: true, prop: 'price' },
    { label: true, prop: 'quantity' },
  ];
  const data = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Self-sealing Stem Bolt',
    price: '10.00',
    quantity: 50,
  };
  const defaultProps = { columns, data };

  describe('with default props', () => {
    it('should render the table row', () => {
      const rendered = shallow(<DynamicTableRow {...defaultProps} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-row');
      expect(rendered).toHaveClassName('row');
    });

    it('should render the row cells', () => {
      const rendered = shallow(<DynamicTableRow {...defaultProps} />);
      const cells = rendered.find('DynamicTableRowCell');

      expect(cells.length).toEqual(columns.length);

      columns.forEach((column, index) => {
        const cell = cells.at(index);
        const { label, prop } = column;

        expect(cell).toHaveProp({ data });
        expect(cell).toHaveProp({ label });
        expect(cell).toHaveProp({ prop });
      });
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<DynamicTableRow {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with cellProps: object', () => {
    const cellProps = { key: 'value' };

    it('should render the row cells', () => {
      const rendered = shallow(<DynamicTableRow {...defaultProps} cellProps={cellProps} />);
      const cells = rendered.find('DynamicTableRowCell');

      expect(cells.length).toEqual(columns.length);

      columns.forEach((column, index) => {
        const cell = cells.at(index);
        const { label, prop } = column;

        expect(cell).toHaveProp({ cellProps });
        expect(cell).toHaveProp({ data });
        expect(cell).toHaveProp({ label });
        expect(cell).toHaveProp({ prop });
      });
    });
  });

  describe('with resourceName: value', () => {
    const resourceName = 'widgets';

    it('should render the table row', () => {
      const rendered = shallow(<DynamicTableRow {...defaultProps} resourceName={resourceName} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-row');
      expect(rendered).toHaveClassName('widgets-table-row');
      expect(rendered).toHaveClassName('row');
    });

    it('should render the row cells', () => {
      const rendered = shallow(<DynamicTableRow {...defaultProps} resourceName={resourceName} />);
      const cells = rendered.find('DynamicTableRowCell');

      expect(cells.length).toEqual(columns.length);

      columns.forEach((column, index) => {
        const cell = cells.at(index);
        const { label, prop } = column;

        expect(cell).toHaveProp({ data });
        expect(cell).toHaveProp({ label });
        expect(cell).toHaveProp({ prop });
        expect(cell).toHaveProp({ resourceName });
      });
    });
  });
});
