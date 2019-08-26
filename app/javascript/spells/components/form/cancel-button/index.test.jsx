import React from 'react';
import { shallow } from 'enzyme';

import SpellFormCancelButton from './index';

import { spellsData } from '../../../fixtures';

describe('<SpellFormCancelButton />', () => {
  const spell = spellsData[0];
  const form = { data: { spell } };
  const defaultProps = {
    form,
    isUpdate: false,
  };

  it('should render the button', () => {
    const rendered = shallow(<SpellFormCancelButton {...defaultProps} />);
    const url = '/spells';

    expect(rendered).toHaveDisplayName('LinkButton');
    expect(rendered).toHaveProp('block', true);
    expect(rendered).toHaveProp('outline', true);
    expect(rendered).toHaveProp({ url });
    expect(rendered).toHaveProp('children', 'Cancel');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SpellFormCancelButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with isUpdate: true', () => {
    const props = { ...defaultProps, isUpdate: true };

    it('should render the button', () => {
      const rendered = shallow(<SpellFormCancelButton {...props} />);
      const url = `/spells/${spell.id}`;

      expect(rendered).toHaveDisplayName('LinkButton');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('outline', true);
      expect(rendered).toHaveProp({ url });
      expect(rendered).toHaveProp('children', 'Cancel');
    });
  });
});
