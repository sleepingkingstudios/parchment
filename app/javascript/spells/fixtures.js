import { load } from '../fixtures';
import { trimMultilineLiteral } from '../utils/fixtures';

const rawData = load('spells');

/* eslint-disable-next-line import/prefer-default-export */
export const spellsData = rawData
  .map(spell => Object.assign(
    {},
    spell,
    {
      castingTime: trimMultilineLiteral(spell.castingTime),
      description: trimMultilineLiteral(spell.description),
    },
  ));
