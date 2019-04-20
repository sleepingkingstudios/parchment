import PropTypes from 'prop-types';

export const spellType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  school: PropTypes.string.isRequired,
  castingTime: PropTypes.string.isRequired,
  range: PropTypes.string.isRequired,
  verbalComponent: PropTypes.bool.isRequired,
  somaticComponent: PropTypes.bool.isRequired,
  materialComponent: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  description: PropTypes.string.isRequired,
});

export const spellListType = PropTypes.arrayOf(spellType);

export const spellDefaultAttributes = {
  id: '',
  name: '',
  level: '',
  school: '',
  castingTime: '',
  range: '',
  verbalComponent: false,
  somaticComponent: false,
  materialComponent: '',
  duration: '',
  shortDescription: '',
  description: '',
};

export const buildSpell = (attributes = {}) => (
  Object.assign({}, attributes, spellDefaultAttributes)
);
