import React from 'react';
import { shallow } from 'enzyme';

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
});
