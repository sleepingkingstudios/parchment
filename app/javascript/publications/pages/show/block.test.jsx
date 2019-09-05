import React from 'react';
import { shallow } from 'enzyme';

import ShowPublicationBlock from './block';
import { publicationsData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../api/status';
import { hooks } from '../../store/showFindPublication';

jest.mock('../../store/showFindPublication');

describe('ShowPublicationBlock', () => {
  const defaultProps = {};

  describe('with status: INITIALIZED', () => {
    const state = { data: {}, status: INITIALIZED };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<ShowPublicationBlock {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading publication from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const state = { data: {}, status: FAILURE };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the failure message', () => {
      const wrapper = shallow(<ShowPublicationBlock {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderFailure')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load publication from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const state = { data: {}, status: PENDING };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<ShowPublicationBlock {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderPending')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading publication from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const state = { data: { publication: publicationsData[0] }, status: SUCCESS };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should render the Publication block', () => {
      const { data, status } = state;
      const { publication } = data;
      const wrapper = shallow(<ShowPublicationBlock {...defaultProps} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ publication });

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('PublicationBlock');
      expect(rendered).toHaveProp({ publication });
    });
  });
});
