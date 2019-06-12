import React from 'react';
import { shallow } from 'enzyme';

import LinkButton from './index';

describe('<LinkButton />', () => {
  const defaultProps = { children: 'Button Label', url: 'path/to/url' };

  it('should create the link', () => {
    const rendered = shallow(<LinkButton {...defaultProps} />);

    const { children, url } = defaultProps;

    expect(rendered).toHaveDisplayName('Link');
    expect(rendered).toHaveClassName('btn');
    expect(rendered).toHaveClassName('btn-primary');
    expect(rendered).not.toHaveClassName('btn-block');
    expect(rendered).toHaveProp('children', children);
    expect(rendered).toHaveProp('to', url);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<LinkButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with block: true', () => {
    const props = { ...defaultProps, block: true };

    it('should create the link', () => {
      const rendered = shallow(<LinkButton {...props} />);

      const { children, url } = props;

      expect(rendered).toHaveDisplayName('Link');
      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).toHaveClassName('btn-block');
      expect(rendered).toHaveProp('children', children);
      expect(rendered).toHaveProp('to', url);
    });
  });

  describe('with buttonStyle: value', () => {
    const props = { ...defaultProps, buttonStyle: 'success' };

    it('should create the link', () => {
      const rendered = shallow(<LinkButton {...props} />);

      const { children, url } = props;

      expect(rendered).toHaveDisplayName('Link');
      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-success');
      expect(rendered).not.toHaveClassName('btn-block');
      expect(rendered).toHaveProp('children', children);
      expect(rendered).toHaveProp('to', url);
    });
  });

  describe('with className: value', () => {
    const props = { ...defaultProps, className: 'custom-btn' };

    it('should create the link', () => {
      const rendered = shallow(<LinkButton {...props} />);

      const { children, className, url } = props;

      expect(rendered).toHaveDisplayName('Link');
      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-primary');
      expect(rendered).toHaveClassName(className);
      expect(rendered).not.toHaveClassName('btn-block');
      expect(rendered).toHaveProp('children', children);
      expect(rendered).toHaveProp('to', url);
    });
  });

  describe('with outline: true', () => {
    const props = { ...defaultProps, outline: true };

    it('should create the link', () => {
      const rendered = shallow(<LinkButton {...props} />);

      const { children, url } = props;

      expect(rendered).toHaveDisplayName('Link');
      expect(rendered).toHaveClassName('btn');
      expect(rendered).toHaveClassName('btn-outline-primary');
      expect(rendered).not.toHaveClassName('btn-block');
      expect(rendered).toHaveProp('children', children);
      expect(rendered).toHaveProp('to', url);
    });
  });
});
