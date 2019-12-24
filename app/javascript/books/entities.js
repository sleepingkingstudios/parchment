import PropTypes from 'prop-types';

export const bookType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  abbreviation: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  publisherName: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export const bookListType = PropTypes.arrayOf(bookType);
