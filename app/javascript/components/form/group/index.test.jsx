import React from 'react';
import { shallow } from 'enzyme';

import FormGroup from './index';

describe('<FormGroup />', () => {
  const children = (<input type="text" />);
  const defaultProps = { children };

  it('should render the form group', () => {
    const rendered = shallow(<FormGroup {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('form-group');
    expect(rendered).toHaveClassName('col');
    expect(rendered).toHaveProp('children', children);
  });

  describe('with className: value', () => {
    const className = 'other-class-name';
    const props = { ...defaultProps, className };

    it('should render the form group', () => {
      const rendered = shallow(<FormGroup {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-group');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveClassName(className);
      expect(rendered).toHaveProp('children', children);
    });
  });

  describe('with colWidth: number', () => {
    const colWidth = 3;
    const props = { ...defaultProps, colWidth };

    it('should render the form group', () => {
      const rendered = shallow(<FormGroup {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-group');
      expect(rendered).toHaveClassName(`col-sm-${colWidth}`);
      expect(rendered).toHaveProp('children', children);
    });
  });

  describe('with colWidth: string', () => {
    const colWidth = '3';
    const props = { ...defaultProps, colWidth };

    it('should render the form group', () => {
      const rendered = shallow(<FormGroup {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('form-group');
      expect(rendered).toHaveClassName(`col-sm-${colWidth}`);
      expect(rendered).toHaveProp('children', children);
    });
  });
});
