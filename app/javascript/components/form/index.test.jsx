import React from 'react';
import { shallow } from 'enzyme';

import Form from './index';

const MockInput = () => (<span />);

describe('<Form />', () => {
  const children = (<MockInput />);
  const onSubmitAction = jest.fn(() => ({ payload: { ok: true } }));
  const form = {
    data: {},
    onChangeAction: jest.fn(),
    onSubmitAction,
  };
  const defaultProps = { children, form };

  it('should wrap the contents in a form tag', () => {
    const rendered = shallow(<Form {...defaultProps} />);

    expect(rendered).toHaveDisplayName('form');
  });

  it('should render the children', () => {
    const rendered = shallow(<Form {...defaultProps} />);
    const input = rendered.find('MockInput');

    expect(input).toExist();
  });

  it('should render the hidden submit input', () => {
    const rendered = shallow(<Form {...defaultProps} />);
    const input = rendered.find('input');
    const type = 'submit';

    expect(input).toExist();
    expect(input).toHaveClassName('d-none');
    expect(input).toHaveProp({ type });
  });

  it('should set the onSubmit event handler', () => {
    const rendered = shallow(<Form {...defaultProps} />);
    const { onSubmit } = rendered.props();
    const preventDefault = jest.fn();
    const event = { preventDefault };

    expect(typeof onSubmit).toEqual('function');

    const action = onSubmit(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(onSubmitAction).toHaveBeenCalledWith();
    expect(action).toEqual({ payload: { ok: true } });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<Form {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with className: value', () => {
    const props = { ...defaultProps, className: 'example-form' };

    it('should wrap the contents in a form tag', () => {
      const rendered = shallow(<Form {...props} />);
      const { className } = props;

      expect(rendered).toHaveDisplayName('form');
      expect(rendered).toHaveClassName(className);
    });
  });
});
