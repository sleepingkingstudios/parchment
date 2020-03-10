import React from 'react';
import { shallow } from 'enzyme';

import CreatePageForm from './form';
import {
  FAILURE,
  SUCCESS,
} from '../../api/status';

const buildEndpoint = ({ state, submitForm, updateForm }) => ({
  hooks: {
    useEndpoint: () => state,
    useSubmitForm: jest.fn(() => submitForm),
    useUpdateForm: jest.fn(() => updateForm),
  },
});

describe('<CreatePageForm />', () => {
  const CustomForm = () => (<div />);
  const resourceName = 'Widget';
  const defaultProps = { Form: CustomForm, resourceName };

  it('should render the form', () => {
    const widget = { name: 'Gadget' };
    const state = { data: { widget }, status: SUCCESS };
    const endpoint = buildEndpoint({ state });
    const wrapper = shallow(<CreatePageForm {...defaultProps} endpoint={endpoint} />);
    const form = wrapper.find('CustomForm');

    expect(form).toExist();
    expect(form).toHaveProp('data', widget);
    expect(form).toHaveProp('errors', undefined);
    expect(form).toHaveProp('status', SUCCESS);
  });

  it('should set the submit form hook', () => {
    const submitForm = jest.fn();
    const state = { data: {}, status: SUCCESS };
    const endpoint = buildEndpoint({ state, submitForm });
    const wrapper = shallow(<CreatePageForm {...defaultProps} endpoint={endpoint} />);
    const form = wrapper.find('CustomForm');

    expect(form).toHaveProp('onSubmitAction', submitForm);
  });

  it('should set the update form hook', () => {
    const updateForm = jest.fn();
    const state = { data: {}, status: SUCCESS };
    const endpoint = buildEndpoint({ state, updateForm });
    const wrapper = shallow(<CreatePageForm {...defaultProps} endpoint={endpoint} />);
    const form = wrapper.find('CustomForm');

    expect(form).toHaveProp('onChangeAction', updateForm);
  });

  describe('when the data contains errors', () => {
    it('should render the form', () => {
      const errors = { manufacturer: ["can't be blank"] };
      const widget = { name: 'Gadget' };
      const state = { data: { widget }, errors, status: FAILURE };
      const endpoint = buildEndpoint({ state });
      const wrapper = shallow(<CreatePageForm {...defaultProps} endpoint={endpoint} />);
      const form = wrapper.find('CustomForm');

      expect(form).toExist();
      expect(form).toHaveProp('data', widget);
      expect(form).toHaveProp('errors', errors);
      expect(form).toHaveProp('status', FAILURE);
    });
  });

  describe('with mapData: function', () => {
    it('should render the form', () => {
      const widget = { name: 'Gadget' };
      const state = { data: { archived: { widget } }, status: SUCCESS };
      const endpoint = buildEndpoint({ state });
      const mapData = data => data.archived.widget;
      const wrapper = shallow(
        <CreatePageForm {...defaultProps} endpoint={endpoint} mapData={mapData} />,
      );
      const form = wrapper.find('CustomForm');

      expect(form).toExist();
      expect(form).toHaveProp('data', widget);
      expect(form).toHaveProp('errors', undefined);
      expect(form).toHaveProp('status', SUCCESS);
    });
  });
});
