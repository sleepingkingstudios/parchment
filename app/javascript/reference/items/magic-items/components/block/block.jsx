import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RichText from 'components/rich-text';

import { magicItemType } from '../../entities';
import { formatType } from '../../../utils';

import './magic-item-block-styles.css';

const renderAdditionalDetails = ({ data, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  const { magicItem } = data;

  return (
    <Fragment>
      <hr />

      <div className="magic-item-block-additional-details">
        <p className="magic-item-block-type">
          <em>Type:</em> { formatType(magicItem.type) }
        </p>

        <p className="magic-item-block-slug">
          <em>Slug:</em> { magicItem.slug }
        </p>

        <p className="magic-item-block-short-description">
          <em>Short Description:</em> { magicItem.shortDescription }
        </p>

        <p className="magic-item-block-data">
          <em>Data:</em> { JSON.stringify(magicItem.data) }
        </p>
      </div>
    </Fragment>
  );
};

const MagicItemBlock = ({ data, showAdditionalDetails }) => {
  const { magicItem } = data;

  return (
    <div className="magic-item-block">
      <p className="magic-item-block-name">{ magicItem.name }</p>

      <p className="magic-item-block-category">
        <strong>Category:</strong> { formatType(magicItem.category) }
      </p>

      <p className="magic-item-block-rarity">
        <strong>Rarity:</strong> { formatType(magicItem.rarity) }
      </p>

      <p className="magic-item-block-cost">
        <strong>Cost:</strong> { magicItem.cost }
      </p>

      <RichText className="magic-item-block-description" text={magicItem.description} />

      { renderAdditionalDetails({ data, showAdditionalDetails })}
    </div>
  );
};

MagicItemBlock.defaultProps = {
  showAdditionalDetails: false,
};

MagicItemBlock.propTypes = {
  data: PropTypes.shape({
    magicItem: magicItemType.isRequired,
  }).isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default MagicItemBlock;
