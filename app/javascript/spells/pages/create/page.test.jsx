import React from 'react';
import { shallow } from 'enzyme';

import { SpellForm } from '../../components/form';
import CreateSpellPage from './page';
import endpoint from '../../store/createSpellForm';

describe('CreateSpellPage', () => {
  const defaultProps = {};

  it('should render the create page', () => {
    const rendered = shallow(<CreateSpellPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('CreatePage');
    expect(rendered).toHaveProp({ Form: SpellForm });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Spell' });
  });
});
