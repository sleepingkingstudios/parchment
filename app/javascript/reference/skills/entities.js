import PropTypes from 'prop-types';

export const skillType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  abilityScore: PropTypes.string,
  description: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
});

export const skillListType = PropTypes.arrayOf(skillType);

export const skillDefaultAttributes = {
  id: '',
  name: '',
  abilityScore: '',
  description: '',
  shortDescription: '',
  slug: '',
};

export const buildSkill = (attributes = {}) => (
  Object.assign({}, attributes, skillDefaultAttributes)
);
