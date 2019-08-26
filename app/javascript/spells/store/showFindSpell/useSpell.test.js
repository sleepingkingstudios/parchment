import { useSelector } from 'react-redux';

import useSpell from './useSpell';
import { spellsData } from '../../fixtures';

jest.mock('react-redux');

useSelector.mockImplementation(fn => fn);

describe('ShowFindSpell store useSpell()', () => {
  const state = {
    spells: {
      showFindSpell: {
        data: { spell: spellsData[0] },
        errors: [],
        status: 'ok',
      },
    },
  };

  it('should be a function', () => {
    expect(typeof useSpell === 'function').toBe(true);
  });

  describe('with no arguments', () => {
    it('should return the selected state', () => {
      const selector = useSpell();
      const { data, errors, status } = state.spells.showFindSpell;
      const { spell } = data;
      const expected = {
        data,
        errors,
        spell,
        status,
      };

      expect(selector(state)).toEqual(expected);
    });
  });

  describe('with a function', () => {
    it('should call the function with the selected state', () => {
      const fn = jest.fn(({ spell }) => spell);
      const selector = useSpell(fn);
      const { data, errors, status } = state.spells.showFindSpell;
      const { spell } = data;
      const expected = {
        data,
        errors,
        spell,
        status,
      };

      expect(selector(state)).toEqual(spell);

      expect(fn).toHaveBeenCalledWith(expected);
    });
  });
});
