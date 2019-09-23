import React from 'react';
import { shallow } from 'enzyme';

import SpellSourceLink from './index';

describe('<SpellSourceLink />', () => {
  const defaultProps = {};

  it('should return a message', () => {
    const rendered = shallow(<SpellSourceLink {...defaultProps} />);

    expect(rendered).toHaveDisplayName('span');
    expect(rendered).toHaveClassName('text-muted');
    expect(rendered).toHaveProp('children', 'Homebrew');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SpellSourceLink {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with source: value and sourceType: value', () => {
    const source = {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'sprocket',
    };
    const sourceType = 'Widget';
    const props = { ...defaultProps, source, sourceType };

    it('should return a link', () => {
      const rendered = shallow(<SpellSourceLink {...props} />);
      const { name } = source;
      const url = `/widgets/${source.id}`;

      expect(rendered).toHaveDisplayName('Link');
      expect(rendered).toHaveProp('to', url);
      expect(rendered).toHaveProp('children', name);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<SpellSourceLink {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
