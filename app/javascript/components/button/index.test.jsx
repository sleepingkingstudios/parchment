import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

describe('<Button />', () => {
  const onClick = jest.fn();
  const defaultProps = {
    children: 'Button Label',
    onClick,
  };

  it('should create the button', () => {
    const rendered = shallow(<Button {...defaultProps} />);

    const { children } = defaultProps;

    expect(rendered).toHaveDisplayName('button');
    expect(rendered).toHaveClassName('btn');
    expect(rendered).toHaveClassName('btn-outline-primary');
    expect(rendered).not.toHaveClassName('btn-block');
    expect(rendered).toHaveProp('children', children);
    expect(rendered).toHaveProp('onClick', onClick);
  });

  describe('with block: true', () => {
    const props = { ...defaultProps, block: true };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-primary');
      expect(rendered).toHaveClassName('btn-block');
    });
  });

  describe('with buttonStyle: danger', () => {
    const props = { ...defaultProps, buttonStyle: 'danger' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-danger');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonStyle: dark', () => {
    const props = { ...defaultProps, buttonStyle: 'dark' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-dark');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonStyle: info', () => {
    const props = { ...defaultProps, buttonStyle: 'info' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-info');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonStyle: light', () => {
    const props = { ...defaultProps, buttonStyle: 'light' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-light');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonStyle: link', () => {
    const props = { ...defaultProps, buttonStyle: 'link' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-link');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonStyle: primary', () => {
    const props = { ...defaultProps, buttonStyle: 'primary' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-primary');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonStyle: secondary', () => {
    const props = { ...defaultProps, buttonStyle: 'secondary' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-secondary');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonStyle: success', () => {
    const props = { ...defaultProps, buttonStyle: 'success' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-success');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with buttonStyle: warning', () => {
    const props = { ...defaultProps, buttonStyle: 'warning' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-warning');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });

  describe('with an unknown buttonStyle', () => {
    const props = { ...defaultProps, buttonStyle: 'enigmatic' };

    it('should create the button', () => {
      const rendered = shallow(<Button {...props} />);

      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-primary');
      expect(rendered).not.toHaveClassName('btn-block');
    });
  });
});
