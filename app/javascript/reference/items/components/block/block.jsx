import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RichText from '../../../../components/rich-text';
import { itemType } from '../../entities';
import { exists } from '../../../../utils/object';

import './item-block-styles.css';

const renderItemType = ({ data }) => {
  const { type } = data;

  if (exists(type)) {
    const words = type.split('::');

    return (
      <p className="item-block-type">
        <em>Type:</em> { words[words.length - 1] }
      </p>
    );
  }

  return (
    <p className="item-block-type text-muted">
      <em>Type:</em> (None)
    </p>
  );
};

const renderAdditionalDetails = ({ data, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  return (
    <Fragment>
      <hr />

      <div className="item-block-additional-details">
        { renderItemType({ data }) }

        <p className="item-block-slug">
          <em>Slug:</em> { data.slug }
        </p>

        <p className="item-block-data">
          <em>Data:</em> { JSON.stringify(data.data) }
        </p>
      </div>
    </Fragment>
  );
};

const ItemBlock = ({ data, showAdditionalDetails }) => (
  <div className="item-block">
    <p className="item-block-name">{ data.name }</p>

    <p className="item-block-cost">
      <strong>Cost:</strong> { data.cost }
    </p>

    <RichText className="item-block-description" text={data.description} />

    { renderAdditionalDetails({ data, showAdditionalDetails })}
  </div>
);

ItemBlock.defaultProps = {
  showAdditionalDetails: false,
};

ItemBlock.propTypes = {
  data: itemType.isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default ItemBlock;
