import React from 'react';
import { shallow } from 'enzyme';

import columns from './columns';
import TableHeader from './header';

const numColumns = columns.length;

describe('<TableRow />', () => {
  const rendered = shallow(<TableHeader />);

  it('should wrap the contents in a <thead> element', () => {
    expect(rendered).toHaveDisplayName('thead');
  });

  it('should contain a table row', () => {
    expect(rendered.find('tr')).toExist();
  });

  it('should include one <th> element for each column', () => {
    expect(rendered.find('tr')).toContainMatchingElements(numColumns, 'th');
  });

  it('should render the column labels', () => {
    let key;
    let value;
    let expected;

    columns.forEach((column) => {
      key = column.prop;
      value = column.label;
      expected = (
        <th key={key}>
          { value }
        </th>
      );

      expect(rendered.find('tr')).toContainReact(expected);
    });
  });
});
