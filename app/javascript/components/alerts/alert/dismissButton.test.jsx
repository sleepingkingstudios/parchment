import React from 'react';
import { shallow } from 'enzyme';

import AlertDismissButton from './dismissButton';

describe('<AlertDismissButton />', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const dismissAlert = jest.fn(param => ({ payload: { id: param } }));
  const defaultProps = { id, dismissAlert };

  it('should render a button', () => {
    const rendered = shallow(<AlertDismissButton {...defaultProps} />);

    expect(rendered).toHaveDisplayName('button');
    expect(rendered).toHaveClassName('close');
    expect(rendered).toHaveProp('type', 'button');
    expect(rendered).toHaveProp('aria-label', 'Close');

    expect(rendered).toHaveText('×');
  });

  it('should set the onClick handler', () => {
    const rendered = shallow(<AlertDismissButton {...defaultProps} />);
    const { onClick } = rendered.props();
    const preventDefault = jest.fn();
    const event = { preventDefault };

    expect(typeof onClick).toEqual('function');

    expect(onClick(event)).toEqual({ payload: { id } });
    expect(dismissAlert).toHaveBeenCalledWith(id);
    expect(preventDefault).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<AlertDismissButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
