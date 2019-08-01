import React from 'react';
import { shallow } from 'enzyme';

import FormSubmitButton from './index';

describe('<FormSubmitButton />', () => {
  const value = 'Property Value';
  const data = { propertyName: value };
  const onChangeAction = jest.fn(obj => ({ payload: obj }));
  const onSubmitAction = jest.fn(() => ({ payload: { ok: true } }));
  const form = {
    data,
    onChangeAction,
    onSubmitAction,
  };
  const children = 'Submit';
  const defaultProps = { children, form };

  it('should render the button', () => {
    const rendered = shallow(<FormSubmitButton {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Button');
    expect(rendered).toHaveProp({ children });
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
});
