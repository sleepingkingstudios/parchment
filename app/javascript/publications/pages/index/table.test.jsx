import React from 'react';
import { shallow } from 'enzyme';

import IndexPublicationsTable from './table';
import { publicationsData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../api/status';
import { hooks } from '../../store/indexFindPublications';

jest.mock('../../store/indexFindPublications');

describe('IndexPublicationsTable', () => {
  const defaultProps = {};

  describe('with status: INITIALIZED', () => {
    const state = { data: {}, status: INITIALIZED };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexPublicationsTable {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading publications data from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const state = { data: {}, status: FAILURE };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the failure message', () => {
      const wrapper = shallow(<IndexPublicationsTable {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderFailure')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load publications data from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const state = { data: {}, status: PENDING };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexPublicationsTable {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderPending')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading publications data from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const state = { data: { publications: publicationsData }, status: SUCCESS };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should render the Publications table', () => {
      const { data, status } = state;
      const { publications } = data;
      const wrapper = shallow(<IndexPublicationsTable {...defaultProps} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ publications });

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('PublicationsTable');
      expect(rendered).toHaveProp({ publications });
    });
  });
});
