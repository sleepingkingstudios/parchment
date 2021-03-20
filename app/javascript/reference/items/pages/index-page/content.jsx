import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PageNavigation from 'components/navigation';

const navigation = {
  Items: '/reference/items',
  'Magic Items': '/reference/items/magic-items',
};

const ItemsIndexPageContent = (props) => {
  const {
    DefaultContent,
  } = props;

  return (
    <Fragment>
      <PageNavigation className="items-navigation" items={navigation} />

      <br />

      <DefaultContent {...props} />
    </Fragment>
  );
};

ItemsIndexPageContent.defaultProps = {};

ItemsIndexPageContent.propTypes = {
  DefaultContent: PropTypes.elementType.isRequired,
};

export default ItemsIndexPageContent;
