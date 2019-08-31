import React from 'react';
import { shallow } from 'enzyme';

import UpdateSpellBreadcrumbs from './breadcrumbs';
import { hooks } from '../../store/updateFindSpell';
import { spellsData } from '../../fixtures';

jest.mock('../../store/updateFindSpell');

describe('UpdateSpellBreadcrumbs', () => {
  const defaultProps = {};

  describe('when the selector does not return a spell', () => {
    const expected = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Spells',
        url: '/spells',
      },
      {
        label: 'Loading...',
        url: null,
      },
      {
        label: 'Update',
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { spell: {} } }));
    });

    it('should render the loading breadcrumbs', () => {
      const rendered = shallow(<UpdateSpellBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });

  describe('when the selector returns a spell', () => {
    const spell = spellsData[0];
    const { id } = spell;
    const expected = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Spells',
        url: '/spells',
      },
      {
        label: spell.name,
        url: `/spells/${id}`,
      },
      {
        label: 'Update',
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { spell } }));
    });

    it('should render the breadcrumbs for the spell', () => {
      const rendered = shallow(<UpdateSpellBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });
});
