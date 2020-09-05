import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DynamicTable from '../../../../components/dynamic-table';
import { columns } from '../table';
import { languageType } from '../../entities';
import {
  exists,
  valueOrDefault,
} from '../../../../utils/object';
import { capitalize } from '../../../../utils/string';

import './language-block-styles.css';

const renderAdditionalDetails = ({ data }) => (
  <Fragment>
    <hr />

    <div className="language-block-additional-details">
      <p className="language-block-slug">
        <em>Slug:</em> { data.slug }
      </p>
    </div>
  </Fragment>
);
const renderDialects = ({ data }) => {
  const dialects = valueOrDefault(data.dialects, []);
  const message = 'There are no dialects matching the criteria';

  return (
    <div className="language-block-dialects">
      <p className="language-block-dialects-heading">Dialects</p>

      <DynamicTable
        className="language-block-dialects-table"
        columns={columns}
        data={dialects}
        message={message}
      />
    </div>
  );
};
const renderParentLanguageLink = ({ data }) => {
  const { parentLanguage } = data;

  if (!exists(parentLanguage)) { return null; }

  const { name, slug } = parentLanguage;
  const url = `/reference/languages/${slug}`;

  return (
    <p className="language-block-parent">
      <strong>Parent Language:</strong>
      { ' ' }
      <Link className="language-block-parent-link" to={url}>
        { name }
      </Link>
    </p>
  );
};

const LanguageBlock = ({ data, showAdditionalDetails, showAssociations }) => (
  <div className="language-block">
    <p className="language-block-name">{ data.name }</p>

    { renderParentLanguageLink({ data }) }

    <p className="language-block-rarity">
      <strong>Rarity:</strong> { capitalize(data.rarity) }
    </p>

    <p className="language-block-speakers">
      <strong>Speakers:</strong> { data.speakers }
    </p>

    <p className="language-block-script">
      <strong>Script:</strong> { data.script }
    </p>

    { showAdditionalDetails && renderAdditionalDetails({ data }) }

    { showAssociations && renderDialects({ data }) }
  </div>
);

LanguageBlock.defaultProps = {
  showAdditionalDetails: false,
  showAssociations: false,
};

LanguageBlock.propTypes = {
  data: languageType.isRequired,
  showAdditionalDetails: PropTypes.bool,
  showAssociations: PropTypes.bool,
};

export default LanguageBlock;
