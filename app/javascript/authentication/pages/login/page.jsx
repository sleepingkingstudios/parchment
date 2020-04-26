import React from 'react';

import Page from '../../../components/page';
import ConnectedAuthenticationLoginForm from './form';
import endpoint from '../../store/loginForm';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Log In',
    url: '/login',
    active: true,
  },
];

const AuthenticationLoginPage = () => (
  <Page breadcrumbs={breadcrumbs} className="page-login">
    <div>
      <h1>Log In</h1>

      <ConnectedAuthenticationLoginForm endpoint={endpoint} />
    </div>
  </Page>
);

AuthenticationLoginPage.defaultProps = {};

AuthenticationLoginPage.propTypes = {};

export default AuthenticationLoginPage;
