import React from 'react';
import { shallow } from 'enzyme';

import TableMessage from './message';
import columns from './columns';
import {
  INITIALIZED,
  FAILURE,
  PENDING,
} from '../../store/request_status';

const numColumns = columns.length;

describe('<TableMessage />', () => {
  describe('when the status is INITIALIZED', () => {
    const props = { spellsRequestStatus: INITIALIZED };
    const rendered = shallow(<TableMessage {...props} />);
    const message = 'Loading spells data from the server...';
    const expected = (
      <tr>
        <td colSpan={numColumns}>
          { message }
        </td>
      </tr>
    );

    it('should display the message', () => {
      expect(rendered).toContainReact(expected);
    });
  });

  describe('when the status is PENDING', () => {
    const props = { spellsRequestStatus: PENDING };
    const rendered = shallow(<TableMessage {...props} />);
    const message = 'Loading spells data from the server...';
    const expected = (
      <tr>
        <td colSpan={numColumns}>
          { message }
        </td>
      </tr>
    );

    it('should display the message', () => {
      expect(rendered).toContainReact(expected);
    });
  });

  describe('when the status is FAILURE', () => {
    const props = { spellsRequestStatus: FAILURE };
    const rendered = shallow(<TableMessage {...props} />);
    const message = 'Unable to load spells data from the server.';
    const expected = (
      <tr>
        <td colSpan={numColumns}>
          { message }
        </td>
      </tr>
    );

    it('should display the message', () => {
      expect(rendered).toContainReact(expected);
    });
  });
});
