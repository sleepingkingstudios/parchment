import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { languageType } from '../../entities';
import { capitalize } from '../../../../utils/string';

import './language-block-styles.css';

const renderAdditionalDetails = ({ data, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  return (
    <Fragment>
      <hr />

      <div className="language-block-additional-details">
        <p className="language-block-slug">
          <em>Slug:</em> { data.slug }
        </p>
      </div>
    </Fragment>
  );
};

const LanguageBlock = ({ data, showAdditionalDetails }) => (
  <div className="language-block">
    <p className="language-block-name">{ data.name }</p>

    <p className="language-block-rarity">
      <strong>Rarity:</strong> { capitalize(data.rarity) }
    </p>

    <p className="language-block-speakers">
      <strong>Speakers:</strong> { data.speakers }
    </p>

    <p className="language-block-script">
      <strong>Script:</strong> { data.script }
    </p>

    { renderAdditionalDetails({ data, showAdditionalDetails })}
  </div>
);

LanguageBlock.defaultProps = {
  showAdditionalDetails: false,
};

LanguageBlock.propTypes = {
  data: languageType.isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default LanguageBlock;
