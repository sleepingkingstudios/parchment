import React from 'react';
import { shallow } from 'enzyme';

import PencilSquareIcon from './index';

describe('<PencilSquareIcon />', () => {
  it('should match the snapshot,', () => {
    const rendered = shallow(<PencilSquareIcon />);

    expect(rendered).toMatchSnapshot();
  });
});
