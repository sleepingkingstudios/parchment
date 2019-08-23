import React from 'react';
import { shallow } from 'enzyme';

import ShowSpellBreadcrumbs from './breadcrumbs';
import { useSpell } from '../../show/store';
import { spellsData } from '../../fixtures';

jest.mock('../../show/store');

describe('ShowSpellBreadcrumbs', () => {
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
        active: true,
      },
    ];

    beforeEach(() => {
      useSpell.mockImplementationOnce(fn => fn({ spell: {} }));
    });

    it('should render the loading breadcrumbs', () => {
      const rendered = shallow(<ShowSpellBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });

  describe('when the selector returns a spell', () => {
    const spell = spellsData[0];
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
        active: true,
      },
    ];

    beforeEach(() => {
      useSpell.mockImplementationOnce(fn => fn({ spell }));
    });

    it('should render the breadcrumbs for the spell', () => {
      const rendered = shallow(<ShowSpellBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });
});
