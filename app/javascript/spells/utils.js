import { capitalize } from '../utils/string';
import { shortOrdinal } from '../utils/number';

export const formatComponents = (spell, includeMaterials = false) => {
  const components = [];

  if (spell.verbalComponent) { components.push('V'); }

  if (spell.somaticComponent) { components.push('S'); }

  if ((spell.materialComponent || 0).length > 0) {
    if (includeMaterials) {
      components.push(`M (${spell.materialComponent})`);
    } else {
      components.push('M');
    }
  }

  if (components.length === 0) { return 'None'; }

  return components.join(', ');
};

export const formatSchoolAndLevel = (spell) => {
  if (spell.level === 0) {
    return `${capitalize(spell.school)} cantrip`;
  }

  return `${shortOrdinal(spell.level)}-level ${spell.school.toLowerCase()}`;
};
