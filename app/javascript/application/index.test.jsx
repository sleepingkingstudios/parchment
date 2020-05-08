import React from 'react';
import { shallow } from 'enzyme';

import Application from './index';
import { history } from '../store';
import { useSession } from '../authentication/store/session/hooks';

jest.mock('../authentication/store/session/hooks');

describe('<Application />', () => {
  describe('when there is no authenticated user', () => {
    beforeEach(() => {
      useSession.mockImplementation(() => ({}));
    });

    it('should render the login page', () => {
      const rendered = shallow(<Application />);

      expect(rendered).toHaveDisplayName('AuthenticationLoginPage');
    });
  });

  describe('when there is an authenticated user', () => {
    const session = {
      token: 'a.b.c',
      user: {
        id: '00000000-0000-0000-0000-000000000000',
        emailAddress: 'alan.bradley@example.com',
        role: 'user',
        username: 'Alan Bradley',
      },
    };

    beforeEach(() => {
      useSession.mockImplementation(() => session);
    });

    it('should render the application routes', () => {
      const rendered = shallow(<Application />);

      expect(rendered).toHaveDisplayName('Routes');
      expect(rendered).toHaveProp({ history });
    });
  });
});
