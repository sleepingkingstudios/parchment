import React from 'react';
import { shallow } from 'enzyme';

import ConnectedAuthenticationLoginForm from './form';
import {
  FAILURE,
  SUCCESS,
} from '../../../api/status';
import { valueOrDefault } from '../../../utils/object';

const buildEndpoint = ({ state, submitForm, updateForm }) => ({
  hooks: {
    useEndpoint: () => state,
    useSubmitForm: jest.fn(() => valueOrDefault(submitForm, () => {})),
    useUpdateForm: jest.fn(() => valueOrDefault(updateForm, () => {})),
  },
});

describe('<ConnectedAuthenticationLoginForm />', () => {
  const defaultProps = {};

  it('should render the form', () => {
    const data = { username: 'Alan Bradley', password: 'tronlives' };
    const errors = {};
    const state = { data, errors, status: SUCCESS };
    const endpoint = buildEndpoint({ state });
    const wrapper = shallow(
      <ConnectedAuthenticationLoginForm {...defaultProps} endpoint={endpoint} />,
    );
    const form = wrapper.find('AuthenticationLoginForm');

    expect(form).toExist();
    expect(form).toHaveProp({ data });
    expect(form).toHaveProp({ errors });
    expect(form).toHaveProp('status', SUCCESS);
  });

  it('should set the submit form hook', () => {
    const data = { username: 'Alan Bradley', password: 'tronlives' };
    const submitForm = jest.fn();
    const state = { data, errors: {}, status: SUCCESS };
    const endpoint = buildEndpoint({ state, submitForm });
    const wrapper = shallow(
      <ConnectedAuthenticationLoginForm {...defaultProps} endpoint={endpoint} />,
    );
    const form = wrapper.find('AuthenticationLoginForm');

    expect(form).toHaveProp('onSubmitAction', submitForm);
  });

  it('should set the update form hook', () => {
    const data = { username: 'Alan Bradley', password: 'tronlives' };
    const updateForm = jest.fn();
    const state = { data, errors: {}, status: SUCCESS };
    const endpoint = buildEndpoint({ state, updateForm });
    const wrapper = shallow(
      <ConnectedAuthenticationLoginForm {...defaultProps} endpoint={endpoint} />,
    );
    const form = wrapper.find('AuthenticationLoginForm');

    expect(form).toHaveProp('onChangeAction', updateForm);
  });

  describe('when the data contains errors', () => {
    it('should render the form', () => {
      const data = { username: 'Alan Bradley', password: '' };
      const errors = { password: ["can't be blank"] };
      const state = { data, errors, status: FAILURE };
      const endpoint = buildEndpoint({ state });
      const wrapper = shallow(
        <ConnectedAuthenticationLoginForm {...defaultProps} endpoint={endpoint} />,
      );
      const form = wrapper.find('AuthenticationLoginForm');

      expect(form).toExist();
      expect(form).toHaveProp({ data });
      expect(form).toHaveProp({ errors });
      expect(form).toHaveProp('status', FAILURE);
    });
  });
});
