import React from 'react';
import { shallow } from 'enzyme';

import ShowPageBlock from './block';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../api/status';
import { valueOrDefault } from '../../utils/object';

const buildEndpoint = ({ performRequest, state }) => ({
  hooks: {
    useEndpoint: () => state,
  },
  request: {
    performRequest: valueOrDefault(performRequest, () => {}),
  },
});

describe('<ShowPageBlock />', () => {
  const Block = () => (<div />);
  const resourceName = 'Widget';
  const defaultProps = { Block, resourceName };

  describe('with status: INITIALIZED', () => {
    const state = { data: {}, status: INITIALIZED };

    it('should display the pending message', () => {
      const endpoint = buildEndpoint({ state });
      const wrapper = shallow(<ShowPageBlock {...defaultProps} endpoint={endpoint} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading widget from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const state = { data: {}, status: FAILURE };

    it('should display the failure message', () => {
      const endpoint = buildEndpoint({ state });
      const wrapper = shallow(<ShowPageBlock {...defaultProps} endpoint={endpoint} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderFailure')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load widget from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const state = { data: {}, status: PENDING };

    it('should display the pending message', () => {
      const endpoint = buildEndpoint({ state });
      const wrapper = shallow(<ShowPageBlock {...defaultProps} endpoint={endpoint} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderPending')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading widget from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const widget = { name: 'Widget' };
    const state = { data: { widget }, status: SUCCESS };

    it('should render the block', () => {
      const endpoint = buildEndpoint({ state });
      const { status } = state;
      const wrapper = shallow(<ShowPageBlock {...defaultProps} endpoint={endpoint} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ widget });

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('Block');
      expect(rendered).toHaveProp({ data: widget });
      expect(rendered).toHaveProp({ showAdditionalDetails: true });
    });

    it('should match the snapshot', () => {
      const endpoint = buildEndpoint({ state });
      const rendered = shallow(<ShowPageBlock {...defaultProps} endpoint={endpoint} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with mapData: function', () => {
    const widget = { name: 'Widget' };
    const state = { data: { gadget: widget }, status: SUCCESS };
    const mapData = data => data.gadget;

    it('should render the block', () => {
      const endpoint = buildEndpoint({ state });
      const { status } = state;
      const wrapper = shallow(
        <ShowPageBlock {...defaultProps} endpoint={endpoint} mapData={mapData} />,
      );
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ widget });

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('Block');
      expect(rendered).toHaveProp({ data: widget });
    });
  });
});
