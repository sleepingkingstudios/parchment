import PropTypes from 'prop-types';

import { itemDefaultAttributes } from '../entities';

export const magicItemType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  cost: PropTypes.string,
  description: PropTypes.string.isRequired,
  data: PropTypes.object,
  rarity: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  type: PropTypes.oneOf(['References::Items::MagicItem']).isRequired,
});

export const magicItemListType = PropTypes.arrayOf(magicItemType);

export const magicItemFormType = PropTypes.shape(
  {
    magicItem: magicItemType,
  },
);

export const magicItemDefaultAttributes = Object.assign(
  {},
  itemDefaultAttributes,
  {
    category: 'wondrous item',
    rarity: 'common',
    type: 'References::Items::MagicItem',
  },
);

export const buildMagicItem = (attributes = {}) => (
  Object.assign({}, attributes, magicItemDefaultAttributes)
);
