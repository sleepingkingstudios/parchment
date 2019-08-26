import { useSelector } from 'react-redux';

import useSpells from './useSpells';
import { spellsData } from '../../fixtures';

jest.mock('react-redux');

useSelector.mockImplementation(fn => fn);

describe('Spells indexFindSpells#useSpells()', () => {
  const state = {
    spells: {
      indexFindSpells: {
        data: { spells: spellsData },
        errors: [],
        status: 'ok',
      },
    },
  };

  it('should be a function', () => {
    expect(typeof useSpells === 'function').toBe(true);
  });

  describe('with no arguments', () => {
    it('should return the selected state', () => {
      const selector = useSpells();
      const { data, errors, status } = state.spells.indexFindSpells;
      const { spells } = data;
      const expected = {
        data,
        errors,
        spells,
        status,
      };

      expect(selector(state)).toEqual(expected);
    });
  });

  describe('with a function', () => {
    it('should call the function with the selected state', () => {
      const fn = jest.fn(({ spells }) => spells);
      const selector = useSpells(fn);
      const { data, errors, status } = state.spells.indexFindSpells;
      const { spells } = data;
      const expected = {
        data,
        errors,
        spells,
        status,
      };

      expect(selector(state)).toEqual(spells);

      expect(fn).toHaveBeenCalledWith(expected);
    });
  });
});
