import React from 'react';
import { shallow } from 'enzyme';

import ConnectedCurrentUser from './index';
import { useClearSession, useSession } from '../../../authentication/store/session/hooks';

jest.mock('../../../authentication/store/session/hooks');

describe('<ConnectedCurrentUser />', () => {
  const clearSession = jest.fn();

  beforeEach(() => {
    useClearSession.mockImplementation(() => clearSession);
    useSession.mockImplementation(() => {});
  });

  describe('when the username is empty', () => {
    const user = {
      id: '',
      emailAddress: '',
      role: '',
      username: '',
    };

    beforeEach(() => {
      useSession.mockImplementationOnce(() => ({ user }));
    });

    it('should return null', () => {
      expect(shallow(<ConnectedCurrentUser />)).toBeEmptyRender();
    });
  });

  describe('when the username is set', () => {
    const user = {
      id: '00000000-0000-0000-0000-000000000000',
      emailAddress: 'alan.bradley@example.com',
      role: 'user',
      username: 'Alan Bradley',
    };

    beforeEach(() => {
      useSession.mockImplementationOnce(() => ({ user }));
    });

    it('should render the current user widget', () => {
      const rendered = shallow(<ConnectedCurrentUser />);

      expect(rendered).toExist();
      expect(rendered).toHaveDisplayName('CurrentUser');
      expect(rendered).toHaveProp({ user });
      expect(rendered).toHaveProp({ onLogout: clearSession });
    });
  });
});
