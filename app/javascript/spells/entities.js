import PropTypes from 'prop-types';

export const spellType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  school: PropTypes.string.isRequired,
});

export const spellListType = PropTypes.arrayOf(spellType);
