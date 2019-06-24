import React from 'react';
import { shallow } from 'enzyme';

import FormTextAreaInput from './index';

describe('<FormTextAreaInput />', () => {
  const onChange = () => {};
  const defaultProps = {
    id: 'property-name',
    value: 'Property Value',
    onChange,
  };

  it('should create the textarea', () => {
    const rendered = shallow(<FormTextAreaInput {...defaultProps} />);
    const { id, value } = defaultProps;

    expect(rendered).toHaveDisplayName('textarea');
    expect(rendered).toHaveClassName('form-control');
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp('rows', 3);
    expect(rendered).toHaveProp({ value });
    expect(rendered).toHaveProp({ onChange });
  });

  describe('with className: value', () => {
    const props = { ...defaultProps, className: 'example-class' };

    it('should create the textarea', () => {
      const rendered = shallow(<FormTextAreaInput {...props} />);
      const { className, id, value } = props;

      expect(rendered).toHaveDisplayName('textarea');
      expect(rendered).toHaveClassName('form-control');
      expect(rendered).toHaveClassName(className);
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp('rows', 3);
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });

    describe('with validStatus: value', () => {
      it('should create the textarea', () => {
        const rendered = shallow(<FormTextAreaInput {...props} validStatus="invalid" />);
        const { className, id, value } = props;

        expect(rendered).toHaveDisplayName('textarea');
        expect(rendered).toHaveClassName('form-control');
        expect(rendered).toHaveClassName(className);
        expect(rendered).toHaveClassName('is-invalid');
        expect(rendered).toHaveProp({ id });
        expect(rendered).toHaveProp('rows', 3);
        expect(rendered).toHaveProp({ value });
        expect(rendered).toHaveProp({ onChange });
      });
    });
  });

  describe('with rows: count', () => {
    const props = { ...defaultProps, rows: 5 };

    it('should create the textarea', () => {
      const rendered = shallow(<FormTextAreaInput {...props} />);
      const {
        id,
        rows,
        value,
      } = props;

      expect(rendered).toHaveDisplayName('textarea');
      expect(rendered).toHaveClassName('form-control');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ rows });
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });
  });

  describe('with validStatus: invalid', () => {
    const props = { ...defaultProps, validStatus: 'invalid' };

    it('should create the textarea', () => {
      const rendered = shallow(<FormTextAreaInput {...props} />);
      const { id, value } = props;

      expect(rendered).toHaveDisplayName('textarea');
      expect(rendered).toHaveClassName('form-control');
      expect(rendered).toHaveClassName('is-invalid');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp('rows', 3);
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });
  });

  describe('with validStatus: invalid', () => {
    const props = { ...defaultProps, validStatus: 'valid' };

    it('should create the textarea', () => {
      const rendered = shallow(<FormTextAreaInput {...props} />);
      const { id, value } = props;

      expect(rendered).toHaveDisplayName('textarea');
      expect(rendered).toHaveClassName('form-control');
      expect(rendered).toHaveClassName('is-valid');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp('rows', 3);
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp({ onChange });
    });
  });
});
