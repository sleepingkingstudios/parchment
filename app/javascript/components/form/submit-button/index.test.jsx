import React from 'react';
import { shallow } from 'enzyme';

import {
  FAILURE,
  INITIALIZED,
  PENDING,
  SUCCESS,
} from 'api/status';
import FormSubmitButton from './index';

describe('<FormSubmitButton />', () => {
  const value = 'Property Value';
  const data = { propertyName: value };
  const onSubmitAction = jest.fn(() => ({ payload: { ok: true } }));
  const form = {
    data,
    onSubmitAction,
  };
  const defaultProps = { form };

  it('should render the button', () => {
    const rendered = shallow(<FormSubmitButton {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Button');
    expect(rendered).toHaveProp({ children: 'Submit Form' });
  });

  it('should set the onClick event handler', () => {
    const rendered = shallow(<FormSubmitButton {...defaultProps} />);
    const { onClick } = rendered.props();
    const preventDefault = jest.fn();
    const event = { preventDefault };

    expect(typeof onClick).toEqual('function');

    const action = onClick(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(onSubmitAction).toHaveBeenCalledWith();
    expect(action).toEqual({ payload: { ok: true } });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<FormSubmitButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with actionName: value', () => {
    const actionName = 'Execute';

    it('should render the button', () => {
      const rendered = shallow(<FormSubmitButton {...defaultProps} actionName={actionName} />);

      expect(rendered).toHaveDisplayName('Button');
      expect(rendered).toHaveProp({ children: 'Execute Form' });
    });
  });

  describe('with children: value', () => {
    const children = 'Execute Operation';

    it('should render the button', () => {
      const rendered = shallow(<FormSubmitButton {...defaultProps}>{children}</FormSubmitButton>);

      expect(rendered).toHaveDisplayName('Button');
      expect(rendered).toHaveProp({ children });
    });
  });

  describe('with resourceName: value', () => {
    const resourceName = 'Operation';

    it('should render the button', () => {
      const rendered = shallow(<FormSubmitButton {...defaultProps} resourceName={resourceName} />);

      expect(rendered).toHaveDisplayName('Button');
      expect(rendered).toHaveProp({ children: 'Submit Operation' });
    });
  });

  describe('with status: FAILURE', () => {
    const status = FAILURE;

    it('should render the button', () => {
      const rendered = shallow(<FormSubmitButton {...defaultProps} status={status} />);

      expect(rendered).toHaveDisplayName('Button');
      expect(rendered).toHaveProp({ children: 'Submit Form' });
    });

    describe('with resourceName: value', () => {
      const resourceName = 'Operation';

      it('should render the button', () => {
        const rendered = shallow(
          <FormSubmitButton {...defaultProps} status={status} resourceName={resourceName} />,
        );

        expect(rendered).toHaveDisplayName('Button');
        expect(rendered).toHaveProp({ children: 'Submit Operation' });
      });
    });
  });

  describe('with status: INITIALIZED', () => {
    const status = INITIALIZED;

    it('should render the button', () => {
      const rendered = shallow(<FormSubmitButton {...defaultProps} status={status} />);

      expect(rendered).toHaveDisplayName('Button');
      expect(rendered).toHaveProp({ children: 'Submit Form' });
    });

    describe('with resourceName: value', () => {
      const resourceName = 'Operation';

      it('should render the button', () => {
        const rendered = shallow(
          <FormSubmitButton {...defaultProps} status={status} resourceName={resourceName} />,
        );

        expect(rendered).toHaveDisplayName('Button');
        expect(rendered).toHaveProp({ children: 'Submit Operation' });
      });
    });
  });

  describe('with status: PENDING', () => {
    const status = PENDING;

    it('should render the button', () => {
      const rendered = shallow(<FormSubmitButton {...defaultProps} status={status} />);
      const children = shallow(rendered.prop('children'));
      const spinner = children.find('Spinner');

      expect(rendered).toHaveDisplayName('Button');

      expect(children).toExist();
      expect(children).toHaveDisplayName('span');
      expect(children).toHaveClassName('loading-message loading-message-pending');
      expect(children).toIncludeText('Submitting Form');

      expect(spinner).toExist();
    });
  });

  describe('with status: SUCCESS', () => {
    const status = SUCCESS;

    it('should render the button', () => {
      const rendered = shallow(<FormSubmitButton {...defaultProps} status={status} />);

      expect(rendered).toHaveDisplayName('Button');
      expect(rendered).toHaveProp({ children: 'Submit Form' });
    });

    describe('with resourceName: value', () => {
      const resourceName = 'Operation';

      it('should render the button', () => {
        const rendered = shallow(
          <FormSubmitButton {...defaultProps} status={status} resourceName={resourceName} />,
        );

        expect(rendered).toHaveDisplayName('Button');
        expect(rendered).toHaveProp({ children: 'Submit Operation' });
      });
    });
  });
});
