import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const itemType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  cost: PropTypes.string,
  description: PropTypes.string.isRequired,
  data: PropTypes.object,
  shortDescription: PropTypes.string,
});

export const itemListType = PropTypes.arrayOf(itemType);

export const itemDefaultAttributes = {
  id: '',
  name: '',
  cost: '',
  data: {},
  description: '',
  slug: '',
  shortDescription: '',
};

export const buildItem = (attributes = {}) => (
  Object.assign({}, attributes, itemDefaultAttributes)
);
