import PropTypes from 'prop-types';

export const breadcrumbType = PropTypes.shape({
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
});

export const breadcrumbsListType = PropTypes.arrayOf(breadcrumbType);
