import React from 'react';
import { shallow } from 'enzyme';

import SpellsTable from './index';
import columns from './columns';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../store/requestStatus';
import { spellsData } from '../fixtures';

describe('<SpellsTable />', () => {
  const props = { spells: [], status: INITIALIZED };
  const rendered = shallow(<SpellsTable {...props} />);
  const loadingMessage = 'Loading spells data from the server...';

  it('should render the Table', () => {
    const table = rendered.find('Table');

    expect(table).toExist();
    expect(table).toHaveProp('columns', columns);
  });

  it('should set the empty message', () => {
    const table = rendered.find('Table');

    expect(table).toHaveProp('data', []);
    expect(table).toHaveProp('message', loadingMessage);
  });

  describe('when the request status is PENDING', () => {
    const pendingProps = Object.assign({}, props, { status: PENDING });
    const renderedPending = shallow(<SpellsTable {...pendingProps} />);

    it('should set the empty message', () => {
      const table = renderedPending.find('Table');

      expect(table).toHaveProp('data', []);
      expect(table).toHaveProp('message', loadingMessage);
    });
  });

  describe('when the request status is FAILURE', () => {
    const failureProps = Object.assign({}, props, { status: FAILURE });
    const renderedFailure = shallow(<SpellsTable {...failureProps} />);
    const failureMessage = 'Unable to load spells data from the server.';

    it('should set the empty message', () => {
      const table = renderedFailure.find('Table');

      expect(table).toHaveProp('data', []);
      expect(table).toHaveProp('message', failureMessage);
    });
  });

  describe('when the request status is SUCCESS', () => {
    const successProps = Object.assign(
      {},
      props,
      {
        spells: spellsData,
        status: SUCCESS,
      },
    );
    const renderedSuccess = shallow(<SpellsTable {...successProps} />);
    const emptyMessage = 'There are no spells matching the criteria.';

    it('should set the empty message', () => {
      const table = renderedSuccess.find('Table');

      expect(table).toHaveProp('data', spellsData);
      expect(table).toHaveProp('message', emptyMessage);
    });
  });
});
