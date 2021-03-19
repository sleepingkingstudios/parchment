import React from 'react';
import { shallow } from 'enzyme';

import {
  PENDING,
  SUCCESS,
} from 'api/status';
import UpdatePageContent from './content';

describe('<UpdatePageContent />', () => {
  const Form = () => (<div />);
  const baseUrl = '/widgets';
  const data = { widget: {} };
  const errors = {};
  const onChangeAction = jest.fn();
  const onSubmitAction = jest.fn();
  const singularDisplayName = 'gadget';
  const status = SUCCESS;
  const submitStatus = PENDING;
  const defaultProps = {
    Form,
    baseUrl,
    data,
    errors,
    onChangeAction,
    onSubmitAction,
    singularDisplayName,
    status,
    submitStatus,
  };

  describe('with default props', () => {
    const rendered = shallow(<UpdatePageContent {...defaultProps} />);

    it('should render a status switch', () => {
      expect(rendered).toHaveDisplayName('StatusSwitch');

      expect(rendered).toHaveProp({ status });
    });

    describe('when the status is INITIALIZED', () => {
      const content = rendered.renderProp('renderInitialized')({});

      it('should display the loading message', () => {
        expect(content).toHaveDisplayName('p');
        expect(content).toHaveClassName('loading-message loading-message-pending');
        expect(content).toHaveText('Loading gadget data from the server...');
      });
    });

    describe('when the status is FAILURE', () => {
      const content = rendered.renderProp('renderFailure')({});

      it('should display the loading message', () => {
        expect(content).toHaveDisplayName('p');
        expect(content).toHaveClassName('loading-message loading-message-failure');
        expect(content).toHaveText('Unable to load gadget data from the server.');
      });
    });

    describe('when the status is PENDING', () => {
      const content = rendered.renderProp('renderPending')({});

      it('should display the loading message', () => {
        expect(content).toHaveDisplayName('p');
        expect(content).toHaveClassName('loading-message loading-message-pending');
        expect(content).toHaveText('Loading gadget data from the server...');
      });
    });

    describe('when the status is SUCCESS', () => {
      const content = rendered.renderProp('renderSuccess')({});

      it('should display the form with the data and actions', () => {
        expect(content).toHaveDisplayName('Form');

        expect(content).toHaveProp({ baseUrl });
        expect(content).toHaveProp({ data });
        expect(content).toHaveProp({ errors });
        expect(content).toHaveProp({ isUpdate: true });
        expect(content).toHaveProp({ onChangeAction });
        expect(content).toHaveProp({ onSubmitAction });
        expect(content).toHaveProp({ status: submitStatus });
      });
    });
  });
});
