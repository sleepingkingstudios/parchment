import React from 'react';
import { shallow } from 'enzyme';

import ShowSpellHeading from './heading';
import { hooks } from '../../store/showFindSpell';
import { hooks as deleteHooks } from '../../store/deleteSpell';
import { spellsData } from '../../fixtures';

jest.mock('../../store/deleteSpell');
jest.mock('../../store/showFindSpell');

const deleteData = jest.fn();

describe('ShowSpellHeading', () => {
  const defaultProps = {};

  describe('when the selector does not return a spell', () => {
    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => ({ data: {} }));
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
    const { id } = spell;
    const expected = [
      {
        label: 'Update Spell',
        outline: true,
        url: `/spells/${spell.id}/update`,
      },
      {
        buttonStyle: 'danger',
        label: 'Delete Spell',
        outline: true,
        onClick: deleteData,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => ({ data: { spell } }));

      deleteHooks.useDeleteData.mockImplementationOnce(() => deleteData);
    });

    it('should render the heading', () => {
      const rendered = shallow(<ShowSpellHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(heading).toExist();
      expect(heading).toHaveProp('children', 'Show Spell');
    });

    it('should render the update and delete buttons', () => {
      const rendered = shallow(<ShowSpellHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', expected);

      expect(deleteHooks.useDeleteData).toHaveBeenCalledWith({ wildcards: { id } });
    });
  });
});
