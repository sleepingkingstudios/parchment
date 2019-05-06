import React from 'react';
import { shallow } from 'enzyme';

import SpellFormComponentsField from './index';

import { spellsData } from '../../fixtures';

describe('<SpellFormComponentsField />', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const spell = spellsData[0];
  const form = {
    data: spell,
    namespace: 'spell',
    onChangeAction,
  };
  const defaultProps = { form };

  it('should render a form group', () => {
    const rendered = shallow(<SpellFormComponentsField {...defaultProps} />);

    expect(rendered).toHaveDisplayName('FormGroup');
    expect(rendered).toHaveProp('colWidth', '12');
  });

  it('should render the material component input', () => {
    const rendered = shallow(<SpellFormComponentsField {...defaultProps} />);
    const input = rendered.find('MaterialInput');
    const placeholder = 'Material';

    expect(input).toExist();
    expect(input).toHaveProp({ form });
    expect(input).toHaveProp({ placeholder });
  });

  it('should render the somatic component input', () => {
    const rendered = shallow(<SpellFormComponentsField {...defaultProps} />);
    const input = rendered.find('SomaticInput');
    const label = 'Somatic';

    expect(input).toExist();
    expect(input).toHaveProp({ form });
    expect(input).toHaveProp({ label });
  });

  it('should render the verbal component input', () => {
    const rendered = shallow(<SpellFormComponentsField {...defaultProps} />);
    const input = rendered.find('VerbalInput');
    const label = 'Verbal';

    expect(input).toExist();
    expect(input).toHaveProp({ form });
    expect(input).toHaveProp({ label });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SpellFormComponentsField {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
