import React from 'react';
import { shallow } from 'enzyme';

import TableMessage from './message';
import { columns } from './fixtures';

const numColumns = columns.length;

describe('<TableMessage />', () => {
  const message = 'What lies beyond the furthest reaches of the sky?';
  const props = { columns, message };
  const rendered = shallow(<TableMessage {...props} />);
  const expected = (
    <tr>
      <td colSpan={numColumns}>
        { message }
      </td>
    </tr>
  );

  it('should display the message', () => {
    expect(rendered).toContainReact(expected);
  });
});
