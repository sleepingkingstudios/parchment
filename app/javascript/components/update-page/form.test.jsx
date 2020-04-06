import React from 'react';
import { shallow } from 'enzyme';

import UpdatePageForm from './form';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../api/status';
import { dig } from '../../utils/object';

const buildEndpoint = ({ state, submitForm, updateForm }) => ({
  hooks: {
    useEndpoint: () => state,
    useSubmitForm: jest.fn(() => submitForm),
    useUpdateForm: jest.fn(() => updateForm),
  },
});

const buildFindEndpoint = status => ({
  hooks: {
    useEndpoint: () => ({ status }),
  },
});

describe('<UpdatePageForm />', () => {
  const CustomForm = () => (<form />);
  const id = '00000000-0000-0000-0000-000000000000';
  const defaultProps = {
    Form: CustomForm,
    formEndpoint: buildEndpoint({ state: {} }),
    id,
    resourceName: 'Widget',
  };

  describe('with status: INITIALIZED', () => {
    it('should display the pending message', () => {
      const findEndpoint = buildFindEndpoint(INITIALIZED);
      const wrapper = shallow(<UpdatePageForm {...defaultProps} findEndpoint={findEndpoint} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderInitialized')();

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status: INITIALIZED });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading widget from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    it('should display the pending message', () => {
      const findEndpoint = buildFindEndpoint(FAILURE);
      const wrapper = shallow(<UpdatePageForm {...defaultProps} findEndpoint={findEndpoint} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderFailure')();

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status: FAILURE });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load widget from the server.');
    });
  });

  describe('with status: PENDING', () => {
    it('should display the pending message', () => {
      const findEndpoint = buildFindEndpoint(PENDING);
      const wrapper = shallow(<UpdatePageForm {...defaultProps} findEndpoint={findEndpoint} />);
      const rendered = wrapper.find('StatusSwitch').renderProp('renderPending')();

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status: PENDING });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading widget from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const widget = { id };
    const formState = {
      data: { widget },
      errors: {},
      status: SUCCESS,
    };
    const onChangeAction = jest.fn();
    const onSubmitAction = jest.fn();

    it('should render the form', () => {
      const findEndpoint = buildFindEndpoint(SUCCESS);
      const formEndpoint = buildEndpoint({
        state: formState,
        submitForm: onSubmitAction,
        updateForm: onChangeAction,
      });
      const { errors, status } = formState;
      const wrapper = shallow(
        <UpdatePageForm
          {...defaultProps}
          findEndpoint={findEndpoint}
          formEndpoint={formEndpoint}
        />,
      );
      const rendered = wrapper
        .find('StatusSwitch')
        .renderProp('renderSuccess')();

      expect(wrapper).toHaveDisplayName('StatusSwitch');
      expect(wrapper).toHaveProp({ status: SUCCESS });

      expect(rendered).toHaveDisplayName('CustomForm');
      expect(rendered).toHaveProp({ data: widget });
      expect(rendered).toHaveProp({ errors });
      expect(rendered).toHaveProp({ status });
      expect(rendered).toHaveProp({ onChangeAction });
      expect(rendered).toHaveProp({ onSubmitAction });
      expect(rendered).toHaveProp({ isUpdate: true });
    });

    it('should pass the resource id to useSubmitForm', () => {
      const findEndpoint = buildFindEndpoint(SUCCESS);
      const formEndpoint = buildEndpoint({
        state: formState,
        submitForm: onSubmitAction,
        updateForm: onChangeAction,
      });
      const { hooks } = formEndpoint;
      const { useSubmitForm } = hooks;

      shallow(
        <UpdatePageForm
          {...defaultProps}
          findEndpoint={findEndpoint}
          formEndpoint={formEndpoint}
        />,
      );

      expect(useSubmitForm).toHaveBeenCalledWith({ wildcards: { id } });
    });

    describe('with mapData: function', () => {
      const mapData = data => dig(data, 'archived', 'widget');
      const nestedFormState = Object.assign({}, formState, {
        data: { archived: { widget } },
      });

      it('should render the form', () => {
        const findEndpoint = buildFindEndpoint(SUCCESS);
        const formEndpoint = buildEndpoint({
          state: nestedFormState,
          submitForm: onSubmitAction,
          updateForm: onChangeAction,
        });
        const { errors, status } = nestedFormState;
        const wrapper = shallow(
          <UpdatePageForm
            {...defaultProps}
            findEndpoint={findEndpoint}
            formEndpoint={formEndpoint}
            mapData={mapData}
          />,
        );
        const rendered = wrapper
          .find('StatusSwitch')
          .renderProp('renderSuccess')();

        expect(wrapper).toHaveDisplayName('StatusSwitch');
        expect(wrapper).toHaveProp({ status: SUCCESS });

        expect(rendered).toHaveDisplayName('CustomForm');
        expect(rendered).toHaveProp({ data: widget });
        expect(rendered).toHaveProp({ errors });
        expect(rendered).toHaveProp({ status });
        expect(rendered).toHaveProp({ onChangeAction });
        expect(rendered).toHaveProp({ onSubmitAction });
        expect(rendered).toHaveProp({ isUpdate: true });
      });
    });
  });
});
