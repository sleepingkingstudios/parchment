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
    level: 3,
    name: "Dragon's Breath",
    school: 'evocation',
  },
  {
    id: 'a74d8c21-607d-4a3f-8cfd-2bbb48ec196a',
    level: 9,
    name: 'Wrath of the Titans',
    school: 'evocation',
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
