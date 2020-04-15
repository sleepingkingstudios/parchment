import React from 'react';
import { shallow } from 'enzyme';

import ShowSpellPage from './page';
import { SpellBlock } from '../../components/block';
import endpoint from '../../store/showFindSpell';
import deleteEndpoint from '../../store/deleteSpell';

describe('ShowSpellPage', () => {
  const match = { params: { id: '00000000-0000-0000-0000-000000000000' } };
  const defaultProps = { match };

  it('should render the show page', () => {
    const rendered = shallow(<ShowSpellPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ShowPage');
    expect(rendered).toHaveProp({ Block: SpellBlock });
    expect(rendered).toHaveProp({ deleteEndpoint });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Spell' });
  });
});
