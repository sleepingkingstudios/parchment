import {
  formatComponents,
  formatSchoolAndLevel,
} from './utils';

describe('Spell utils', () => {
  describe('formatComponents', () => {
    it('should be a function', () => {
      expect(typeof formatComponents).toEqual('function');
    });

    describe('with a spell with no components', () => {
      const spell = {
        verbalComponent: false,
        somaticComponent: false,
        materialComponent: '',
      };

      it('should return "None"', () => {
        expect(formatComponents(spell)).toEqual('None');
      });
    });

    describe('with a spell with a verbal component', () => {
      const spell = {
        verbalComponent: true,
        somaticComponent: false,
        materialComponent: '',
      };

      it('should return "V"', () => {
        expect(formatComponents(spell)).toEqual('V');
      });
    });

    describe('with a spell with a somatic component', () => {
      const spell = {
        verbalComponent: false,
        somaticComponent: true,
        materialComponent: '',
      };

      it('should return "S"', () => {
        expect(formatComponents(spell)).toEqual('S');
      });
    });

    describe('with a spell with verbal and somatic components', () => {
      const spell = {
        verbalComponent: true,
        somaticComponent: true,
        materialComponent: '',
      };

      it('should return "V, S"', () => {
        expect(formatComponents(spell)).toEqual('V, S');
      });
    });

    describe('with a spell with a material component', () => {
      const spell = {
        verbalComponent: false,
        somaticComponent: false,
        materialComponent: 'the pot of gold at the end of the rainbow',
      };

      it('should return "M"', () => {
        expect(formatComponents(spell)).toEqual('M');
      });

      describe('with includeMaterials = true', () => {
        it('should return "M" plus the component', () => {
          const expected = `M (${spell.materialComponent})`;

          expect(formatComponents(spell, true)).toEqual(expected);
        });
      });
    });

    describe('with a spell with multiple components', () => {
      const spell = {
        verbalComponent: true,
        somaticComponent: true,
        materialComponent: 'the pot of gold at the end of the rainbow',
      };

      it('should return "V, S, M"', () => {
        expect(formatComponents(spell)).toEqual('V, S, M');
      });

      describe('with includeMaterials = true', () => {
        it('should return "V, S, M" plus the component', () => {
          const expected = `V, S, M (${spell.materialComponent})`;

          expect(formatComponents(spell, true)).toEqual(expected);
        });
      });
    });
  });

  describe('formatSchoolAndLevel', () => {
    it('should be a function', () => {
      expect(typeof formatSchoolAndLevel).toEqual('function');
    });

    describe('with a 0th-level ritual spell', () => {
      const spell = {
        level: 0,
        ritual: true,
        school: 'illusion',
      };

      it('should return the school and "cantrip"', () => {
        expect(formatSchoolAndLevel(spell)).toEqual('Illusion cantrip (ritual)');
      });
    });

    describe('with a 0th-level spell', () => {
      const spell = {
        level: 0,
        school: 'illusion',
      };

      it('should return the school and "cantrip"', () => {
        expect(formatSchoolAndLevel(spell)).toEqual('Illusion cantrip');
      });
    });

    describe('with a 1st-level ritual spell', () => {
      const spell = {
        level: 1,
        ritual: true,
        school: 'transmutation',
      };

      it('should return the level and school', () => {
        expect(formatSchoolAndLevel(spell)).toEqual('1st-level transmutation (ritual)');
      });
    });

    describe('with a 1st-level spell', () => {
      const spell = {
        level: 1,
        school: 'transmutation',
      };

      it('should return the level and school', () => {
        expect(formatSchoolAndLevel(spell)).toEqual('1st-level transmutation');
      });
    });

    describe('with a 2nd-level spell', () => {
      const spell = {
        level: 2,
        school: 'necromancy',
      };

      it('should return the level and school', () => {
        expect(formatSchoolAndLevel(spell)).toEqual('2nd-level necromancy');
      });
    });

    describe('with a 3rd-level spell', () => {
      const spell = {
        level: 3,
        school: 'evocation',
      };

      it('should return the level and school', () => {
        expect(formatSchoolAndLevel(spell)).toEqual('3rd-level evocation');
      });
    });

    describe('with a 4th-level spell', () => {
      const spell = {
        level: 4,
        school: 'divination',
      };

      it('should return the level and school', () => {
        expect(formatSchoolAndLevel(spell)).toEqual('4th-level divination');
      });
    });

    describe('with a 9th-level spell', () => {
      const spell = {
        level: 9,
        school: 'conjuration',
      };

      it('should return the level and school', () => {
        expect(formatSchoolAndLevel(spell)).toEqual('9th-level conjuration');
      });
    });
  });
});
