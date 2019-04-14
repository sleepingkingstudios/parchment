import React from 'react';
import { shallow } from 'enzyme';

import TableBody from './body';
import TableRow from './row';
import {
  INITIALIZED,
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/request_status';
import { spellsData } from '../fixtures';

describe('<TableBody />', () => {
  const props = { spells: [], spellsRequestStatus: INITIALIZED };
  const rendered = shallow(<TableBody {...props} />);

  it('should wrap the contents in a <tbody> element', () => {
    expect(rendered).toHaveDisplayName('tbody');
  });

  describe('when the request status is INITIALIZED', () => {
    const initalizedProps = { spells: [], spellsRequestStatus: INITIALIZED };
    const renderedWithStatus = shallow(<TableBody {...initalizedProps} />);

    it('should render the message', () => {
      const message = renderedWithStatus.find('TableMessage');

      expect(message).toExist();
      expect(message).toHaveProp('spellsRequestStatus', INITIALIZED);
    });
  });

  describe('when the request status is PENDING', () => {
    const pendingProps = { spells: [], spellsRequestStatus: PENDING };
    const renderedWithStatus = shallow(<TableBody {...pendingProps} />);

    it('should render the message', () => {
      const message = renderedWithStatus.find('TableMessage');

      expect(message).toExist();
      expect(message).toHaveProp('spellsRequestStatus', PENDING);
    });
  });

  describe('when the request status is FAILURE', () => {
    const failureProps = { spells: [], spellsRequestStatus: FAILURE };
    const renderedWithStatus = shallow(<TableBody {...failureProps} />);

    it('should render the message', () => {
      const message = renderedWithStatus.find('TableMessage');

      expect(message).toExist();
      expect(message).toHaveProp('spellsRequestStatus', FAILURE);
    });
  });

  describe('when the request status is SUCCESS', () => {
    const successProps = { spells: spellsData, spellsRequestStatus: SUCCESS };
    const renderedWithStatus = shallow(<TableBody {...successProps} />);

    it('should include one <TableRow> element for each spell', () => {
      expect(renderedWithStatus)
        .toContainMatchingElements(spellsData.length, 'TableRow');
    });

    it('should render the spell rows', () => {
      let expected;

      spellsData.forEach((spell) => {
        expected = (
          <TableRow spell={spell} />
        );

        expect(renderedWithStatus).toContainReact(expected);
      });
    });
  });
});
