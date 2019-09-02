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

export const spellFormType = PropTypes.shape(
  {
    publication: publicationType,
  },
);

export const publicationListType = PropTypes.arrayOf(publicationType);
