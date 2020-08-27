import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import PageNavigation from '../navigation';

const navigation = {
  Home: '/',
  Spells: '/spells',
  Mechanics: {
    Actions: '/mechanics/actions',
    Conditions: '/mechanics/conditions',
  },
  Books: '/books',
  Reference: {
    Skills: '/reference/skills',
  },
};

const renderTitle = ({ showNavigation, title }) => {
  if (!showNavigation) { return <Fragment>{ title }</Fragment>; }

  return (
    <Link to="/">{ title }</Link>
  );
};

const renderHeading = ({ showNavigation, subtitle, title }) => {
  if (!subtitle) {
    return (
      <h1 className="page-header-title display-4">
        { renderTitle({ showNavigation, title }) }
      </h1>
    );
  }

  return (
    <h1 className="page-header-title display-4">
      { renderTitle({ showNavigation, title }) }
      { ' ' }
      <small className="d-none d-lg-inline" style={{ fontWeight: 300 }}>
        { subtitle }
      </small>
    </h1>
  );
};

const renderNavigation = ({ showNavigation }) => {
  if (!showNavigation) { return null; }

  return (
    <PageNavigation items={navigation} />
  );
};

const PageHeader = (props) => {
  const {
    showNavigation,
    subtitle,
    title,
  } = props;

  return (
    <header className="page-header">
      { renderHeading({ showNavigation, subtitle, title }) }
      { renderNavigation({ showNavigation }) }
      <hr />
    </header>
  );
};

PageHeader.defaultProps = {
  showNavigation: true,
  subtitle: null,
};

PageHeader.propTypes = {
  showNavigation: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default PageHeader;
