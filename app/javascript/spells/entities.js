import PropTypes from 'prop-types';

export const sourceStubType = PropTypes.shape({
  originId: PropTypes.string.isRequired,
  originType: PropTypes.string.isRequired,
});

export const sourceType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  metadata: PropTypes.object,
  name: PropTypes.string.isRequired,
  originId: PropTypes.string.isRequired,
  originType: PropTypes.string.isRequired,
  playtest: PropTypes.bool.isRequired,
  referenceId: PropTypes.string.isRequired,
  referenceType: PropTypes.string.isRequired,
});

export const spellType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  school: PropTypes.string.isRequired,
  ritual: PropTypes.bool.isRequired,
  castingTime: PropTypes.string.isRequired,
  range: PropTypes.string.isRequired,
  verbalComponent: PropTypes.bool.isRequired,
  somaticComponent: PropTypes.bool.isRequired,
  materialComponent: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  description: PropTypes.string.isRequired,
  source: PropTypes.oneOfType([
    sourceStubType,
    sourceType,
  ]),
});

export const spellFormType = PropTypes.shape(
  {
    spell: spellType,
  },
);

export const spellListType = PropTypes.arrayOf(spellType);

export const spellDefaultAttributes = {
  id: '',
  name: '',
  slug: '',
  level: 1,
  school: 'abjuration',
  ritual: false,
  castingTime: '',
  range: '',
  verbalComponent: false,
  somaticComponent: false,
  materialComponent: '',
  duration: '',
  shortDescription: '',
  description: '',
  source: undefined,
};

export const buildSpell = (attributes = {}) => (
  Object.assign({}, attributes, spellDefaultAttributes)
);
