import React from 'react';
import { shallow } from 'enzyme';

import TrashIcon from './index';

describe('<TrashIcon />', () => {
  it('should match the snapshot,', () => {
    const rendered = shallow(<TrashIcon />);

    expect(rendered).toMatchSnapshot();
  });
});
