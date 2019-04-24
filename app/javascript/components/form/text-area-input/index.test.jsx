import React from 'react';
import { shallow } from 'enzyme';

import FormTextAreaInput from './index';

describe('<FormTextAreaInput />', () => {
  const onChange = () => {};
  const props = {
    id: 'property-name',
    prop: 'propertyName',
    value: 'Property Value',
    onChange,
  };
  const rendered = shallow(<FormTextAreaInput {...props} />);

  it('should create the textarea', () => {
    const { id, prop, value } = props;

    expect(rendered).toHaveDisplayName('textarea');
    expect(rendered).toHaveClassName('form-control');
    expect(rendered).toHaveProp('id', id);
    expect(rendered).toHaveProp('rows', 3);
    expect(rendered).toHaveProp('value', value);
    expect(rendered).toHaveProp('onChange', onChange);
    expect(rendered).toHaveProp('data-prop-name', prop);
  });

  describe('with rows: count', () => {
    const propsWithRows = { ...props, rows: 5 };
    const renderedWithRows = shallow(<FormTextAreaInput {...propsWithRows} />);

    it('should create the textarea', () => {
      const {
        id,
        prop,
        rows,
        value,
      } = propsWithRows;

      expect(renderedWithRows).toHaveDisplayName('textarea');
      expect(renderedWithRows).toHaveClassName('form-control');
      expect(renderedWithRows).toHaveProp('id', id);
      expect(renderedWithRows).toHaveProp('rows', rows);
      expect(renderedWithRows).toHaveProp('value', value);
      expect(renderedWithRows).toHaveProp('onChange', onChange);
      expect(renderedWithRows).toHaveProp('data-prop-name', prop);
    });
  });
});
