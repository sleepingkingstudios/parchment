import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { publicationType } from '../../entities';

import './styles.css';

const renderAdditionalDetails = ({ publication, showAdditionalDetails }) => {
  if (!showAdditionalDetails) { return null; }

  return (
    <Fragment>
      <hr />

      <div className="publication-block-additional-details">
        <p className="publication-block-slug">
          <em>Slug:</em> { publication.slug }
        </p>
        <p className="publication-block-abbreviation">
          <em>Abbreviation:</em> { publication.abbreviation }
        </p>
      </div>
    </Fragment>
  );
};

const PublicationBlock = ({ publication, showAdditionalDetails }) => (
  <div className="publication-block">
    <p className="publication-block-name">{ publication.name }</p>

    <div className="publication-block-details">
      <p className="publication-block-publisher-name">
        <strong>Publisher:</strong> { publication.publisherName }
      </p>

      <p className="publication-block-publication-date">
        <strong>Publication Date:</strong> { publication.publicationDate }
      </p>

      <p className="publication-block-playtest">
        <strong>Playtest:</strong> { publication.playtest ? 'true' : 'false' }
      </p>

      <p className="publication-block-official">
        <strong>Official:</strong> { publication.official ? 'true' : 'false' }
      </p>
    </div>

    { renderAdditionalDetails({ publication, showAdditionalDetails }) }
  </div>
);

PublicationBlock.defaultProps = {
  showAdditionalDetails: false,
};

PublicationBlock.propTypes = {
  publication: publicationType.isRequired,
  showAdditionalDetails: PropTypes.bool,
};

export default PublicationBlock;
