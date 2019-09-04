import PropTypes from 'prop-types';

export const publicationType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  abbreviation: PropTypes.string,
  name: PropTypes.string.isRequired,
  official: PropTypes.bool.isRequired,
  playtest: PropTypes.bool.isRequired,
  publicationDate: PropTypes.string.isRequired,
  publisherName: PropTypes.string.isRequired,
  slug: PropTypes.string,
});

export const publicationFormType = PropTypes.shape(
  {
    publication: publicationType,
  },
);

export const publicationListType = PropTypes.arrayOf(publicationType);

export const publicationDefaultAttributes = {
  id: '',
  abbreviation: '',
  name: '',
  official: false,
  playtest: false,
  publicationDate: '',
  publisherName: '',
  slug: '',
};

export const buildPublication = (attributes = {}) => (
  Object.assign({}, attributes, publicationDefaultAttributes)
);
