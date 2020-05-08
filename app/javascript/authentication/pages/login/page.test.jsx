import React from 'react';
import { shallow } from 'enzyme';

import AuthenticationLoginPage from './page';
import endpoint from '../../store/loginForm';

describe('<AuthenticationLoginPage />', () => {
  const defaultProps = {};

  it('should render the page', () => {
    const breadcrumbs = [];
    const rendered = shallow(<AuthenticationLoginPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-login');
    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the heading', () => {
    const rendered = shallow(<AuthenticationLoginPage {...defaultProps} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toHaveText('Log In');
  });

  it('should render the form', () => {
    const rendered = shallow(<AuthenticationLoginPage {...defaultProps} />);
    const form = rendered.find('ConnectedAuthenticationLoginForm');

    expect(form).toExist();
    expect(form).toHaveProp({ endpoint });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<AuthenticationLoginPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
