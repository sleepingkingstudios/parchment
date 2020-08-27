import React from 'react';
import { shallow } from 'enzyme';

import SkillsTableActions from './actions';

describe('<SkillsTableActions />', () => {
  const defaultProps = { id: '00000000-0000-0000-0000-000000000000' };
  const { id } = defaultProps;

  it('should render the responsive actions', () => {
    const rendered = shallow(<SkillsTableActions {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ResponsiveActions');
    expect(rendered).toHaveProp({ actions: ['show'] });
    expect(rendered).toHaveProp({ baseUrl: '/reference/skills' });
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp({ resourceName: 'skill' });
  });
});
