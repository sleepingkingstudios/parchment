import React from 'react';
import { shallow } from 'enzyme';

import columns from './columns';
import TableRow from './row';
import { spellsData } from '../fixtures';

const numColumns = columns.length;
const spell = spellsData[0];

describe('<TableRow />', () => {
  const props = { spell };
  const rendered = shallow(<TableRow {...props} />);

  it('should wrap the contents in a <tr> element', () => {
    expect(rendered).toHaveDisplayName('tr');
  });

  it('should include one <td> element for each column', () => {
    expect(rendered).toContainMatchingElements(numColumns, 'td');
  });

  it('should render the spell properties', () => {
    let key;
    let value;
    let expected;

    columns.forEach((column) => {
      key = `${spell.id}-${column.prop}`;
      value = spell[column.prop];
      expected = (
        <td key={key}>
          { value }
        </td>
      );

      expect(rendered).toContainReact(expected);
    });
  });
});
