import React from 'react';
import { shallow } from 'enzyme';

import CurrentUser from './currentUser';

describe('<CurrentUser />', () => {
  const user = {
    id: '00000000-0000-0000-0000-000000000000',
    emailAddress: 'alan.bradley@example.com',
    role: 'user',
    username: 'Alan Bradley',
  };
  const onLogout = jest.fn();
  const defaultProps = { user, onLogout };

  it('should render the username', () => {
    const rendered = shallow(<CurrentUser {...defaultProps} />);

    expect(rendered).toIncludeText('You are currently logged in as Alan Bradley');
  });

  it('should render the logout button', () => {
    const rendered = shallow(<CurrentUser {...defaultProps} />);
    const button = rendered.find('Button');

    expect(button).toExist();
    expect(button).toHaveProp({ children: 'Log Out' });
    expect(button).toHaveProp({ onClick: onLogout });
  });
});
