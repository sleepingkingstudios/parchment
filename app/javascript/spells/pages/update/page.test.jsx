import React from 'react';
import { shallow } from 'enzyme';

import UpdateSpellBreadcrumbs from './breadcrumbs';
import UpdateSpellPage from './page';
import { hooks } from '../../store/updateFindSpell';

jest.mock('../../store/updateFindSpell');

hooks.useRequestData.mockImplementation(() => () => {});

describe('UpdateSpellPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the Page', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-update-spell');
    expect(rendered).toHaveProp('breadcrumbs', (<UpdateSpellBreadcrumbs />));
  });

  it('should render the heading', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toIncludeText('Update Spell');
  });

  it('should render the spell form', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);

    expect(rendered).toContainMatchingElement('UpdateSpellForm');
  });

  it('should find the spell by id', () => {
    const performRequest = jest.fn();

    hooks.useRequestData.mockImplementationOnce(() => performRequest);

    shallow(<UpdateSpellPage {...defaultProps} />);

    expect(hooks.useRequestData).toHaveBeenCalledWith({ wildcards: { id } });
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
