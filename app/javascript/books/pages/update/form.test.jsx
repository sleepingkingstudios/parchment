import React from 'react';
import { shallow } from 'enzyme';

import UpdateBookForm from './form';
import { booksData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../api/status';
import { hooks as findHooks } from '../../store/updateFindBook';
import { hooks as formHooks } from '../../store/updateBookForm';

jest.mock('../../store/updateFindBook');
jest.mock('../../store/updateBookForm');

describe('UpdateBookForm', () => {
  const defaultProps = {};
  const formState = {
    data: { book: booksData[0] },
    errors: {},
    status: SUCCESS,
  };

  beforeEach(() => {
    formHooks.useEndpoint.mockImplementationOnce(() => formState);
  });

  describe('with status: INITIALIZED', () => {
    beforeEach(() => {
      findHooks.useEndpoint.mockImplementationOnce(() => ({ status: INITIALIZED }));
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<UpdateBookForm {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status: INITIALIZED });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading book from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    beforeEach(() => {
      findHooks.useEndpoint.mockImplementationOnce(() => ({ status: FAILURE }));
    });

    it('should display the failure message', () => {
      const wrapper = shallow(<UpdateBookForm {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderFailure')();

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status: FAILURE });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load book from the server.');
    });
  });

  describe('with status: PENDING', () => {
    beforeEach(() => {
      findHooks.useEndpoint.mockImplementationOnce(() => ({ status: PENDING }));
    });

    it('should display the pending message', () => {
      const wrapper = shallow(<UpdateBookForm {...defaultProps} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status: PENDING });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading book from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const onChangeAction = jest.fn();
    const onSubmitAction = jest.fn();

    beforeEach(() => {
      findHooks.useEndpoint.mockImplementationOnce(() => ({ status: SUCCESS }));

      formHooks.useUpdateForm.mockImplementationOnce(() => onChangeAction);
      formHooks.useSubmitForm.mockImplementationOnce(() => onSubmitAction);
    });

    it('should render a Book form', () => {
      const { data, errors, status } = formState;
      const wrapper = shallow(<UpdateBookForm {...defaultProps} />);
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')({ data, errors, status });

      expect(rendered).toHaveDisplayName('BookForm');
      expect(rendered).toHaveProp({ data });
      expect(rendered).toHaveProp({ errors });
      expect(rendered).toHaveProp({ status });
      expect(rendered).toHaveProp({ onChangeAction });
      expect(rendered).toHaveProp({ onSubmitAction });
      expect(rendered).toHaveProp({ isUpdate: true });
    });

    it('should pass the book id to useSubmitForm', () => {
      const book = booksData[0];
      const { id } = book;

      shallow(<UpdateBookForm {...defaultProps} />);

      expect(formHooks.useSubmitForm).toHaveBeenCalledWith({ wildcards: { id } });
    });
  });
});
