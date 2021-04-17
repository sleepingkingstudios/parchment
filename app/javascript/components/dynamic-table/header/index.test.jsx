import React from 'react';
import { shallow } from 'enzyme';

import DynamicTableHeader from './index';

describe('<DynamicTableHeader />', () => {
  const columns = [
    { label: true, prop: 'id' },
    { label: true, prop: 'name' },
    { label: true, prop: 'price' },
    { label: true, prop: 'quantity' },
  ];
  const defaultProps = { columns };

  describe('with default properties', () => {
    it('should render the header', () => {
      const rendered = shallow(<DynamicTableHeader {...defaultProps} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-header');
      expect(rendered).toHaveClassName('row');
    });

    it('should render the header cells', () => {
      const rendered = shallow(<DynamicTableHeader {...defaultProps} />);
      const cells = rendered.find('DynamicTableHeaderCell');

      expect(cells.length).toEqual(columns.length);

      columns.forEach((column, index) => {
        const cell = cells.at(index);
        const { label, prop } = column;

        expect(cell).toHaveProp({ label });
        expect(cell).toHaveProp({ prop });
      });
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<DynamicTableHeader {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with resourceName: value', () => {
    const resourceName = 'widgets';

    it('should render the header', () => {
      const rendered = shallow(
        <DynamicTableHeader {...defaultProps} resourceName={resourceName} />,
      );

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-header');
      expect(rendered).toHaveClassName('widgets-table-header');
      expect(rendered).toHaveClassName('row');
    });

    it('should render the header cells', () => {
      const rendered = shallow(
        <DynamicTableHeader {...defaultProps} resourceName={resourceName} />,
      );
      const cells = rendered.find('DynamicTableHeaderCell');

      expect(cells.length).toEqual(columns.length);

      columns.forEach((column, index) => {
        const cell = cells.at(index);
        const { label, prop } = column;

        expect(cell).toHaveProp({ label });
        expect(cell).toHaveProp({ prop });
        expect(cell).toHaveProp({ resourceName });
      });
    });
  });

  describe('with resourceName: multiword value', () => {
    const resourceName = 'rocketParts';

    it('should render the header', () => {
      const rendered = shallow(
        <DynamicTableHeader {...defaultProps} resourceName={resourceName} />,
      );

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-header');
      expect(rendered).toHaveClassName('rocket-parts-table-header');
      expect(rendered).toHaveClassName('row');
    });
  });
});
