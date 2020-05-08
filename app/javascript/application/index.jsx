import React from 'react';

import Routes from '../routes';
import { history } from '../store';
import { AuthenticationLoginPage } from '../authentication/pages/login';
import { useSession } from '../authentication/store/session/hooks';
import { dig, exists } from '../utils/object';

const Application = () => {
  const session = useSession();
  const token = dig(session, 'token');

  if (!exists(token) || token.length === 0) {
    return (<AuthenticationLoginPage />);
  }

  return (<Routes history={history} />);
};

export default Application;
