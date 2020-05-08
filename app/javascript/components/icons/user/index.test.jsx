import React from 'react';
import { shallow } from 'enzyme';

import UserIcon from './index';

describe('<UserIcon />', () => {
  it('should match the snapshot', () => {
    expect(shallow(<UserIcon />)).toMatchSnapshot();
  });
});
