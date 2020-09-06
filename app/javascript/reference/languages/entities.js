import PropTypes from 'prop-types';

export const languageType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  script: PropTypes.string,
  speakers: PropTypes.string,
});

export const languageListType = PropTypes.arrayOf(languageType);

export const languageDefaultAttributes = {
  id: '',
  name: '',
  script: '',
  slug: '',
  speakers: '',
};

export const buildLanguage = (attributes = {}) => (
  Object.assign({}, attributes, languageDefaultAttributes)
);
