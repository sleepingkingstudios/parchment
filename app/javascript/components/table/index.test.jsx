import React from 'react';
import { shallow } from 'enzyme';

import Table from './index';
import TableRow from './row';
import { columns, rocketsData } from './fixtures';

describe('<Table />', () => {
  const message = 'The waves that flow and dye the land gold.';
  const defaultProps = { columns, data: [], message };

  describe('with default options', () => {
    it('should wrap the contents in a <table> element', () => {
      const rendered = shallow(<Table {...defaultProps} />);

      expect(rendered).toHaveDisplayName('table');
    });

    it('should render the header', () => {
      const rendered = shallow(<Table {...defaultProps} />);

      expect(rendered.find('TableHeader')).toExist();
    });

    it('should render the empty message', () => {
      const rendered = shallow(<Table {...defaultProps} />);

      const emptyMessage = rendered.find('TableMessage');

      expect(emptyMessage).toExist();
      expect(emptyMessage).toHaveProp('columns', columns);
      expect(emptyMessage).toHaveProp('message', message);
    });
  });

  describe('with cellProps: object', () => {
    const cellProps = { message: 'Abort' };
    const props = { ...defaultProps, cellProps, data: rocketsData };

    it('should render the item rows', () => {
      const rendered = shallow(<Table {...props} />);

      let expected;

      rocketsData.forEach((item) => {
        expected = (
          <TableRow columns={columns} item={item} cellProps={cellProps} />
        );

        expect(rendered).toContainReact(expected);
      });
    });
  });

  describe('with data: non-empty array', () => {
    const props = { ...defaultProps, data: rocketsData };

    it('should not render the empty message', () => {
      const rendered = shallow(<Table {...props} />);

      expect(rendered.find('TableMessage')).not.toExist();
    });

    it('should include one <TableRow> element for each item', () => {
      const rendered = shallow(<Table {...props} />);

      expect(rendered)
        .toContainMatchingElements(rocketsData.length, 'TableRow');
    });

    it('should render the item rows', () => {
      const rendered = shallow(<Table {...props} />);

      let expected;

      rocketsData.forEach((item) => {
        expected = (
          <TableRow columns={columns} item={item} />
        );

        expect(rendered).toContainReact(expected);
      });
    });
  });
});
