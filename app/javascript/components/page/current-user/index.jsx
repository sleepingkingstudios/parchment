import React from 'react';

import CurrentUser from './currentUser';
import { useClearSession, useSession } from '../../../authentication/store/session/hooks';
import { exists } from '../../../utils/object';

const ConnectedCurrentUser = () => {
  const session = useSession();
  const { user } = session;
  const { username } = user;
  const clearSession = useClearSession();

  if (!(exists(username)) || username.length === 0) { return null; }

  return (<CurrentUser user={user} onLogout={clearSession} />);
};

ConnectedCurrentUser.defaultProps = {};

ConnectedCurrentUser.propTypes = {};

export default ConnectedCurrentUser;
