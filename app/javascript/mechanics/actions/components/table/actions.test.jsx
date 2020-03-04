import React from 'react';
import { shallow } from 'enzyme';

import ActionsTableActions from './actions';

describe('<ActionsTableActions />', () => {
  const defaultProps = { id: '00000000-0000-0000-0000-000000000000' };
  const { id } = defaultProps;

  it('should set the class name', () => {
    const rendered = shallow(<ActionsTableActions {...defaultProps} />);

    expect(rendered).toHaveClassName('mechanics-actions');
  });

  it('should render the show link', () => {
    const rendered = shallow(<ActionsTableActions {...defaultProps} />);
    const link = rendered.find('LinkButton').at(0);

    expect(link).toExist();
    expect(link).toHaveProp('url', `/mechanics/actions/${id}`);
    expect(link).toHaveProp('children', 'Show');
  });
});
