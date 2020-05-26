import React from 'react';
import { shallow } from 'enzyme';

import DynamicTableRowCell from './cell';

describe('<DynamicTableRowCell />', () => {
  const data = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Self-sealing Stem Bolt',
    price: '10.00',
    quantity: 50,
  };
  const defaultProps = { data, label: true, prop: 'name' };

  describe('with default properties', () => {
    it('should render the row cell', () => {
      const rendered = shallow(<DynamicTableRowCell {...defaultProps} />);
      const { name } = data;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-row-cell');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveText(name);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<DynamicTableRowCell {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with resourceName: value', () => {
    const resourceName = 'widgets';

    it('should render the row cell', () => {
      const rendered = shallow(
        <DynamicTableRowCell {...defaultProps} resourceName={resourceName} />,
      );
      const { name } = data;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-row-cell');
      expect(rendered).toHaveClassName('widgets-table-row-cell');
      expect(rendered).toHaveClassName('widgets-table-row-name-cell');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveText(name);
    });
  });

  describe('with value: a component', () => {
    const CellValue = (props) => {
      const { price, quantity } = props;

      return (
        <span>{ quantity } available at ${ price } each</span>
      );
    };

    it('should render the row cell', () => {
      const rendered = shallow(<DynamicTableRowCell {...defaultProps} prop="price" value={CellValue} />);
      const expected = '50 available at $10.00 each';

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-row-cell');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveText(expected);
    });
  });

  describe('with value: a component and cellProps: an object', () => {
    const cellProps = { promo: 'Special!' };
    const CellValue = (props) => {
      const { promo, price, quantity } = props;

      return (
        <span>{ promo } { quantity } available at ${ price } each</span>
      );
    };

    it('should render the row cell', () => {
      const rendered = shallow(
        <DynamicTableRowCell
          {...defaultProps}
          prop="price"
          value={CellValue}
          cellProps={cellProps}
        />,
      );
      const expected = 'Special! 50 available at $10.00 each';

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-row-cell');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveText(expected);
    });
  });

  describe('with value: a function', () => {
    const value = obj => `$${obj.price}`;

    it('should render the row cell', () => {
      const rendered = shallow(<DynamicTableRowCell {...defaultProps} prop="price" value={value} />);
      const expected = '$10.00';

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-row-cell');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveText(expected);
    });
  });

  describe('with value: a function and cellProps: an object', () => {
    const cellProps = { promo: 'Sale!' };
    const value = obj => `${obj.promo} $${obj.price}`;

    it('should render the row cell', () => {
      const rendered = shallow(
        <DynamicTableRowCell
          {...defaultProps}
          prop="price"
          value={value}
          cellProps={cellProps}
        />,
      );
      const expected = 'Sale! $10.00';

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-row-cell');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveText(expected);
    });
  });

  describe('with width: value', () => {
    it('should render the row cell', () => {
      const rendered = shallow(<DynamicTableRowCell {...defaultProps} width={3} />);
      const { name } = data;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-row-cell');
      expect(rendered).toHaveClassName('col-3');
      expect(rendered).toHaveText(name);
    });
  });
});
