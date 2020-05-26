import React from 'react';
import { shallow } from 'enzyme';

import DynamicTable from './index';

describe('<DynamicTable />', () => {
  const columns = [
    { label: true, prop: 'id' },
    { label: true, prop: 'name' },
    { label: true, prop: 'price' },
    { label: true, prop: 'quantity' },
  ];
  const message = 'There are no widgets matching the criteria.';
  const defaultProps = { columns, data: [], message };

  describe('with cellProps: value', () => {
    const cellProps = { key: 'value' };
    const data = [
      {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Self-sealing Stem Bolt',
        price: '10.00',
        quantity: 50,
      },
    ];

    it('should render the table rows', () => {
      const rendered = shallow(
        <DynamicTable {...defaultProps} data={data} cellProps={cellProps} />,
      );
      const rows = rendered.find('DynamicTableRow');

      expect(rows.length).toEqual(data.length);

      data.forEach((item, index) => {
        const row = rows.at(index);

        expect(row).toHaveProp({ cellProps });
        expect(row).toHaveProp({ columns });
        expect(row).toHaveProp({ data: item });
      });
    });
  });

  describe('with className: value', () => {
    const className = 'custom-table';

    it('should render the dynamic table', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} className={className} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table');
      expect(rendered).toHaveClassName('container');
      expect(rendered).toHaveClassName(className);
    });
  });

  describe('with data: an empty array', () => {
    const data = [];

    it('should render the dynamic table', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table');
      expect(rendered).toHaveClassName('container');
    });

    it('should render the table header', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);
      const header = rendered.find('DynamicTableHeader');

      expect(header).toExist();
      expect(header).toHaveProp({ columns });
    });

    it('should render the empty message', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);
      const emptyMessage = rendered.find('DynamicTableEmptyMessage');

      expect(emptyMessage).toExist();
      expect(emptyMessage).toHaveProp({ message });
    });

    it('should not render any rows', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);
      const rows = rendered.find('DynamicTableRow');

      expect(rows.length).toEqual(0);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with data: an array of objects', () => {
    const data = [
      {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Self-sealing Stem Bolt',
        price: '10.00',
        quantity: 50,
      },
      {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Inverse Spatial Manifold',
        price: '1000.00',
        quantity: 10,
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        name: 'Ambrosia Software License',
        price: '10000.00',
        quantity: 5,
      },
    ];

    it('should render the dynamic table', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table');
      expect(rendered).toHaveClassName('container');
    });

    it('should render the table header', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);
      const header = rendered.find('DynamicTableHeader');

      expect(header).toExist();
      expect(header).toHaveProp({ columns });
    });

    it('should not render an empty message', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);
      const emptyMessage = rendered.find('DynamicTableEmptyMessage');

      expect(emptyMessage).not.toExist();
    });

    it('should render the table rows', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);
      const rows = rendered.find('DynamicTableRow');

      expect(rows.length).toEqual(data.length);

      data.forEach((item, index) => {
        const row = rows.at(index);

        expect(row).toHaveProp({ columns });
        expect(row).toHaveProp({ data: item });
      });
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<DynamicTable {...defaultProps} data={data} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with resourceName: value', () => {
    const data = [
      {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Self-sealing Stem Bolt',
        price: '10.00',
        quantity: 50,
      },
    ];
    const resourceName = 'widgets';

    it('should render the dynamic table', () => {
      const rendered = shallow(
        <DynamicTable {...defaultProps} data={data} resourceName={resourceName} />,
      );

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table');
      expect(rendered).toHaveClassName('widgets-table');
      expect(rendered).toHaveClassName('container');
    });

    it('should render the table header', () => {
      const rendered = shallow(
        <DynamicTable {...defaultProps} data={data} resourceName={resourceName} />,
      );
      const header = rendered.find('DynamicTableHeader');

      expect(header).toExist();
      expect(header).toHaveProp({ columns });
      expect(header).toHaveProp({ resourceName });
    });

    it('should render the table rows', () => {
      const rendered = shallow(
        <DynamicTable {...defaultProps} data={data} resourceName={resourceName} />,
      );
      const rows = rendered.find('DynamicTableRow');

      expect(rows.length).toEqual(data.length);

      data.forEach((item, index) => {
        const row = rows.at(index);

        expect(row).toHaveProp({ columns });
        expect(row).toHaveProp({ data: item });
        expect(row).toHaveProp({ resourceName });
      });
    });
  });
});
