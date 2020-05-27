import React from 'react';
import { shallow } from 'enzyme';

import EyeIcon from './index';

describe('<EyeIcon />', () => {
  it('should match the snapshot,', () => {
    const rendered = shallow(<EyeIcon />);

    expect(rendered).toMatchSnapshot();
  });
});
