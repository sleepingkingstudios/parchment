import React from 'react';
import { shallow } from 'enzyme';

import IndexBooksTable from './table';
import { booksData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../api/status';
import { hooks, request } from '../../store/indexFindBooks';

jest.mock('../../store/indexFindBooks');

describe('IndexBooksTable', () => {
  const defaultProps = {};

  describe('with status: INITIALIZED', () => {
    const state = { data: {}, status: INITIALIZED };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexBooksTable {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading books data from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const state = { data: {}, status: FAILURE };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the failure message', () => {
      const wrapper = shallow(<IndexBooksTable {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderFailure')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load books data from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const state = { data: {}, status: PENDING };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<IndexBooksTable {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();
      const { status } = state;

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading books data from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const state = { data: { books: booksData }, status: SUCCESS };

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should render the Spells table', () => {
      const { data, status } = state;
      const { books } = data;
      const wrapper = shallow(<IndexBooksTable {...defaultProps} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ books });

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('BooksTable');
      expect(rendered).toHaveProp({ books });
    });

    it('should pass the onDelete handler to the Spells table', () => {
      const inner = jest.fn();
      const { data } = state;
      const { books } = data;
      const wrapper = shallow(<IndexBooksTable {...defaultProps} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ books });
      const handler = rendered.prop('onDelete');
      const dispatch = jest.fn();
      const getState = jest.fn();

      expect(typeof handler).toEqual('function');

      request.performRequest.mockImplementationOnce(() => inner);

      handler({ dispatch, getState });

      expect(inner).toHaveBeenCalledWith(dispatch, getState);
    });
  });
});
