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

export const formatSchoolAndLevel = ({ level, ritual, school }) => {
  const fragments = [];

  if (level === 0) {
    fragments.push(capitalize(school));
    fragments.push('cantrip');
  } else {
    fragments.push(`${shortOrdinal(level)}-level`);
    fragments.push(school.toLowerCase());
  }

  if (ritual) { fragments.push('(ritual)'); }

  return fragments.join(' ');
};
