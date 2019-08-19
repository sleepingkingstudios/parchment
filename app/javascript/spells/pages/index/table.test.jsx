import React from 'react';
import { shallow } from 'enzyme';

import IndexSpellsTable from './table';
import { spellsData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../store/requestStatus';

describe('IndexSpellsTable', () => {
  const defaultProps = { spells: [], status: INITIALIZED };

  describe('with status: INITIALIZED', () => {
    const props = { ...defaultProps, status: INITIALIZED };

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexSpellsTable {...props} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderInitialized')();
      const { status } = props;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spells data from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const props = { ...defaultProps, status: FAILURE };

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexSpellsTable {...props} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderFailure')();
      const { status } = props;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load spells data from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const props = { ...defaultProps, status: PENDING };

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexSpellsTable {...props} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderPending')();
      const { status } = props;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spells data from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const props = { ...defaultProps, spells: spellsData, status: SUCCESS };

    it('should render the Spells table', () => {
      const { spells, status } = props;
      const wrapper = shallow(<IndexSpellsTable {...props} />);
      const rendered = wrapper
        .find('LoaderSwitch')
        .renderProp('renderSuccess')({ spells });

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ spells, status });

      expect(rendered).toHaveDisplayName('Table');
      expect(rendered).toHaveProp({ data: spells });
    });
  });
});
