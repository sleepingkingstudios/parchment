import React from 'react';
import { shallow } from 'enzyme';

import TableRow from './row';
import {
  columns,
  rocketsData,
} from './fixtures';

const numColumns = columns.length;
const rocket = rocketsData[0];

const expectedValue = (column, item) => {
  if (typeof column.value === 'function') { return column.value(item); }

  return item[column.prop];
};

describe('<TableRow />', () => {
  const props = { columns, item: rocket };
  const rendered = shallow(<TableRow {...props} />);

  it('should wrap the contents in a <tr> element', () => {
    expect(rendered).toHaveDisplayName('tr');
  });

  it('should include one <td> element for each column', () => {
    expect(rendered).toContainMatchingElements(numColumns, 'td');
  });

  it('should render the item properties', () => {
    let key;
    let value;
    let expected;

    columns.forEach((column) => {
      key = `${rocket.id}-${column.prop}`;
      value = expectedValue(column, rocket);
      expected = (
        <td key={key}>
          { value }
        </td>
      );

      expect(rendered).toContainReact(expected);
    });
  });
});
