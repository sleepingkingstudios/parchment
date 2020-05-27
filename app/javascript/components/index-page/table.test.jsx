import React from 'react';
import { shallow } from 'enzyme';

import IndexPageTable from './table';
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

describe('<IndexPageTable />', () => {
  const columns = [
    {
      label: 'Name',
      prop: 'name',
    },
  ];
  const resourceName = 'Widget';
  const defaultProps = { columns, resourceName };

  describe('with status: INITIALIZED', () => {
    const state = { data: {}, status: INITIALIZED };

    it('should display the pending message', () => {
      const endpoint = buildEndpoint({ state });
      const wrapper = shallow(<IndexPageTable {...defaultProps} endpoint={endpoint} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading widgets data from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const state = { data: {}, status: FAILURE };

    it('should display the failure message', () => {
      const endpoint = buildEndpoint({ state });
      const wrapper = shallow(<IndexPageTable {...defaultProps} endpoint={endpoint} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderFailure')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load widgets data from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const state = { data: {}, status: PENDING };

    it('should display the pending message', () => {
      const endpoint = buildEndpoint({ state });
      const wrapper = shallow(<IndexPageTable {...defaultProps} endpoint={endpoint} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading widgets data from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const widgets = [
      { name: 'Widget' },
      { name: 'Gadget' },
      { name: 'Thingamabob' },
    ];
    const state = { data: { widgets }, status: SUCCESS };

    it('should render the table', () => {
      const endpoint = buildEndpoint({ state });
      const { status } = state;
      const wrapper = shallow(<IndexPageTable {...defaultProps} endpoint={endpoint} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ widgets });
      const message = 'There are no widgets matching the criteria.';

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('Table');
      expect(rendered).toHaveProp({ columns });
      expect(rendered).toHaveProp({ data: widgets });
      expect(rendered).toHaveProp({ message });
    });

    it('should pass the onDelete handler to the table', () => {
      const inner = jest.fn();
      const performRequest = () => inner;
      const endpoint = buildEndpoint({ performRequest, state });
      const wrapper = shallow(<IndexPageTable {...defaultProps} endpoint={endpoint} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ widgets });
      const handler = rendered.prop('cellProps').onDelete;
      const dispatch = jest.fn();
      const getState = jest.fn();

      expect(typeof handler).toEqual('function');

      handler({ dispatch, getState });

      expect(inner).toHaveBeenCalledWith(dispatch, getState);
    });

    it('should match the snapshot', () => {
      const endpoint = buildEndpoint({ state });
      const rendered = shallow(<IndexPageTable {...defaultProps} endpoint={endpoint} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with mapData: function', () => {
    const widgets = [
      { name: 'Widget' },
      { name: 'Gadget' },
      { name: 'Thingamabob' },
    ];
    const state = { data: { archived: { widgets } }, status: SUCCESS };
    const mapData = data => data.archived.widgets;

    it('should render the Spells table', () => {
      const endpoint = buildEndpoint({ state });
      const { status } = state;
      const wrapper = shallow(
        <IndexPageTable {...defaultProps} endpoint={endpoint} mapData={mapData} />,
      );
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ widgets });
      const message = 'There are no widgets matching the criteria.';

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('Table');
      expect(rendered).toHaveProp({ columns });
      expect(rendered).toHaveProp({ data: widgets });
      expect(rendered).toHaveProp({ message });
    });
  });

  describe('with Table: component', () => {
    const widgets = [
      { name: 'Widget' },
      { name: 'Gadget' },
      { name: 'Thingamabob' },
    ];
    const state = { data: { widgets }, status: SUCCESS };
    const CustomTable = () => (<div />);

    it('should render the table', () => {
      const endpoint = buildEndpoint({ state });
      const { status } = state;
      const wrapper = shallow(
        <IndexPageTable {...defaultProps} endpoint={endpoint} Table={CustomTable} />,
      );
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ widgets });
      const message = 'There are no widgets matching the criteria.';

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('CustomTable');
      expect(rendered).toHaveProp({ columns });
      expect(rendered).toHaveProp({ data: widgets });
      expect(rendered).toHaveProp({ message });
    });
  });
});
