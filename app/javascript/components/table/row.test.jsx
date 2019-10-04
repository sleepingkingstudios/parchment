import React from 'react';
import { shallow } from 'enzyme';

import TableRow from './row';
import {
  columns,
  rocketsData,
} from './fixtures';

const numColumns = columns.length;
const rocket = rocketsData[0];
const expectedValues = {
  name: 'Apprentice',
  crewCapacity: '1 Kerbal',
  experiments: 'Crew Report, Mystery Goo, Temperature Scan, and Pressure Scan',
  retired: 'true',
};

describe('<TableRow />', () => {
  const defaultProps = { columns, item: rocket };

  it('should wrap the contents in a <tr> element', () => {
    const rendered = shallow(<TableRow {...defaultProps} />);

    expect(rendered).toHaveDisplayName('tr');
  });

  it('should include one <td> element for each column', () => {
    const rendered = shallow(<TableRow {...defaultProps} />);

    expect(rendered).toContainMatchingElements(numColumns, 'td');
  });

  it('should render the item properties', () => {
    const rendered = shallow(<TableRow {...defaultProps} />);

    columns.slice(0, -1).forEach((column) => {
      const { prop } = column;
      const key = `${rocket.id}-${prop}`;
      const value = expectedValues[prop];
      const expected = (
        <td key={key}>
          { value }
        </td>
      );

      expect(rendered).toContainReact(expected);
    });
  });

  it('should render the item component', () => {
    const rendered = shallow(<TableRow {...defaultProps} />);
    const cell = rendered.find('td').at(columns.length - 1);
    const button = cell.find('button');

    expect(button).toExist();
    expect(button).toHaveText('Launch');
  });

  describe('with cellProps: object', () => {
    const cellProps = { message: 'Abort' };
    const props = { ...defaultProps, cellProps };

    it('should render the item component', () => {
      const rendered = shallow(<TableRow {...props} />);
      const cell = rendered.find('td').at(columns.length - 1);
      const button = cell.find('button');

      expect(button).toExist();
      expect(button).toHaveText('Abort');
    });
  });
});
