import React from 'react';
import { shallow } from 'enzyme';

import ShowSpellHeading from './heading';
import { useSpell } from '../../show/store';
import { spellsData } from '../../fixtures';

jest.mock('../../show/store');

describe('ShowSpellHeading', () => {
  const defaultProps = {};

  describe('when the selector does not return a spell', () => {
    beforeEach(() => {
      useSpell.mockImplementationOnce(fn => fn({ spell: {} }));
    });

    it('should render the heading with no buttons', () => {
      const rendered = shallow(<ShowSpellHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', []);
      expect(heading).toHaveProp('children', 'Show Spell');
    });
  });

  describe('when the selector returns a spell', () => {
    const spell = spellsData[0];
    const expected = [
      {
        label: 'Update Spell',
        outline: true,
        url: `/spells/${spell.id}/update`,
      },
    ];

    beforeEach(() => {
      useSpell.mockImplementationOnce(fn => fn({ spell }));
    });

    it('should render the heading with an update button', () => {
      const rendered = shallow(<ShowSpellHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', expected);
      expect(heading).toHaveProp('children', 'Show Spell');
    });
  });
});
