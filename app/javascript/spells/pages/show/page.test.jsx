import React from 'react';
import { shallow } from 'enzyme';

import ShowSpellBreadcrumbs from './breadcrumbs';
import ShowSpellPage from './page';
import { requestSpell } from '../../store/showFindSpell';

jest.mock('../../store/showFindSpell');

describe('ShowSpellPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the Page', () => {
    const rendered = shallow(<ShowSpellPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-spells');
    expect(rendered).toHaveProp('breadcrumbs', (<ShowSpellBreadcrumbs />));
  });

  it('should render the heading', () => {
    const rendered = shallow(<ShowSpellPage {...defaultProps} />);

    expect(rendered).toContainMatchingElement('ShowSpellHeading');
  });

  it('should render the spell block', () => {
    const rendered = shallow(<ShowSpellPage {...defaultProps} />);

    expect(rendered).toContainMatchingElement('ShowSpellBlock');
  });

  it('should find the spell by id', () => {
    shallow(<ShowSpellPage {...defaultProps} />);

    expect(requestSpell).toHaveBeenCalledWith(id);
  });
});
