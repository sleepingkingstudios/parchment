import { trimMultilineLiteral } from '../utils/fixtures';

/* eslint-disable-next-line import/prefer-default-export */
export const spellsData = [
  {
    id: 'e17bca01-24d3-48d3-a308-099dd6dca373',
    level: 0,
    name: 'Thunderclap',
    school: 'illusion',
    castingTime:
      `1 reaction, which you take when you speak your own name or hear it
      spoken`,
    range: 'Self',
    verbalComponent: false,
    somaticComponent: false,
    materialComponent: '',
    duration: 'Instantaneous',
    shortDescription: 'Create an ominous thunderclap when your name is spoken',
    description:
      `Immediately after speaking or hearing your name, you create the illusory
      sound of an ominous, distant thunderclap.`,
  },
  {
    id: 'd4a4d1ff-e629-437f-b72a-e078047bda92',
    level: 1,
    name: 'Gusty Step',
    school: 'transmutation',
    castingTime: '1 bonus action',
    range: 'Self',
    verbalComponent: true,
    somaticComponent: true,
    materialComponent: '',
    duration: '1 round',
    shortDescription: '+30 feet move speed until your next turn',
    description:
      `A burst of localized wind lightens your footsteps, increasing your
      walking speed by 30 feet until the start of your next turn.

      The chaotic wind extinguishes candles, torches, and other unprotected
      flames you are carrying. It causes protected flames, such as those of
      lanterns, to dance wildly, and has a 50 percent chance to extinguish
      them.`,
  },
  {
    id: 'e3641970-fc98-4674-b873-5532d89d9f26',
    level: 2,
    name: 'Mudball',
    school: 'conjuration',
    castingTime: '1 action',
    range: '30 feet',
    verbalComponent: true,
    somaticComponent: true,
    materialComponent: 'a small pinch of moist earth',
    duration: 'Instantaneous',
    shortDescription: '',
    description:
      `You hurl a ball of elementally-charged mud at a creature or object
      within range. Make a ranged spell attack against the target. On a hit, the
      target takes 2d6 bludgeoning damage and is blinded for one minute. The
      target or an adjacent ally can wipe off the mud as an action, removing the
      blindness.

      **At Higher Levels:** When you cast this spell with a spell slot of 3rd
      level or higher, the damage increases by 1d6 for each spell slot above
      3rd.`,
  },
]
  .map(spell => Object.assign(
    {},
    spell,
    {
      castingTime: trimMultilineLiteral(spell.castingTime),
      description: trimMultilineLiteral(spell.description),
    },
  ));
