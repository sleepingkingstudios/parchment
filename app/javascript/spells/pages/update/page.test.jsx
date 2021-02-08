import React from 'react';
import { shallow } from 'enzyme';

import { Form as SpellForm } from '../../components/form';
import UpdateSpellPage from './page';
import findEndpoint from '../../store/updateFindSpell';
import formEndpoint from '../../store/updateSpellForm';
import { spellsData } from '../../fixtures';

describe('UpdateSpellPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the update page', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('UpdatePage');
    expect(rendered).toHaveProp({ Form: SpellForm });
    expect(rendered).toHaveProp({ findEndpoint });
    expect(rendered).toHaveProp({ formEndpoint });
    expect(rendered).toHaveProp({ match });
    expect(rendered).toHaveProp({ resourceName: 'Spell' });
  });

  it('should map the data', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);
    const mapData = rendered.prop('mapData');
    const spell = spellsData[0];
    const data = { spell };

    expect(typeof mapData).toEqual('function');
    expect(mapData(data)).toEqual(data);
  });

  it('should map the resource', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);
    const mapResource = rendered.prop('mapResource');
    const spell = spellsData[0];
    const data = { spell };

    expect(typeof mapResource).toEqual('function');
    expect(mapResource(data)).toEqual(spell);
  });
});
