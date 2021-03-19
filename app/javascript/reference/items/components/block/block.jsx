import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RichText from 'components/rich-text';
import { exists } from 'utils/object';
import {
  capitalize,
  underscore,
} from 'utils/string';

import { itemType } from '../../entities';

import './item-block-styles.css';

const renderItemType = ({ item }) => {
  const { type } = item;

  if (exists(type)) {
    const segments = type.split('::');
    const words = underscore(segments[segments.length - 1])
      .split('_')
      .map(capitalize)
      .join(' ');

    return (
      <p className="item-block-type">
        <em>Type:</em> { words }
      </p>
    );
  }

  return (
    <p className="item-block-type">
      <em>Type:</em> <span className="text-muted">(None)</span>
    </p>
  );
};

const renderAdditionalDetails = ({ data, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  const { item } = data;

  return (
    <Fragment>
      <hr />

      <div className="item-block-additional-details">
        { renderItemType({ item }) }

        <p className="item-block-slug">
          <em>Slug:</em> { item.slug }
        </p>

        <p className="item-block-short-description">
          <em>Short Description:</em> { item.shortDescription }
        </p>

        <p className="item-block-data">
          <em>Data:</em> { JSON.stringify(item.data) }
        </p>
      </div>
    </Fragment>
  );
};

const ItemBlock = ({ data, showAdditionalDetails }) => {
  const { item } = data;

  return (
    <div className="item-block">
      <p className="item-block-name">{ item.name }</p>

      <p className="item-block-cost">
        <strong>Cost:</strong> { item.cost }
      </p>

      <RichText className="item-block-description" text={item.description} />

      { renderAdditionalDetails({ data, showAdditionalDetails })}
    </div>
  );
};

ItemBlock.defaultProps = {
  showAdditionalDetails: false,
};

ItemBlock.propTypes = {
  data: PropTypes.shape({
    item: itemType.isRequired,
  }).isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default ItemBlock;
