import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../button';
import UserIcon from '../../icons/user';
import { userType } from '../../../authentication/entities';

const CurrentUser = (props) => {
  const {
    user,
    onLogout,
  } = props;
  const { username } = user;

  return (
    <p className="page-current-user">
      <Button
        className="page-current-user-log-out"
        link
        buttonSize="sm"
        buttonStyle="danger"
        onClick={onLogout}
      >
        Log Out
      </Button>

      <UserIcon />

      You are currently logged in as {username}.
    </p>
  );
};

CurrentUser.defaultProps = {};

CurrentUser.propTypes = {
  user: userType.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default CurrentUser;
