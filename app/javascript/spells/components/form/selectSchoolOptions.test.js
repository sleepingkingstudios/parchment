import selectSchoolsOptions from './selectSchoolOptions';

import { titleize } from '../../../utils/string';

describe('SpellFormSelectSchoolInput options', () => {
  const schools = [
    'abjuration',
    'conjuration',
    'divination',
    'enchantment',
    'evocation',
    'illusion',
    'necromancy',
    'transmutation',
  ];

  it('should set the label and value for each school', () => {
    expect(selectSchoolsOptions.length).toEqual(schools.length);

    selectSchoolsOptions.forEach(({ label, value }, index) => {
      const school = schools[index];

      expect(label).toEqual(titleize(school));
      expect(value).toEqual(school);
    });
  });
});
