import React from 'react';
import PropTypes from 'prop-types';

import { Alerts } from '../../alerts';
import ConnectedCurrentUser from './current-user';
import PageFooter from './footer';
import PageHeader from './header';
import './styles.css';

class Page extends React.Component {
  buildClassName() {
    const { className } = this.props;

    return `${this.layoutClass()} page ${className || ''}`.trim();
  }

  layoutClass() {
    const { layout } = this.props;

    if (layout === 'fluid') { return 'container-fluid'; }

    return 'container';
  }

  render() {
    const {
      breadcrumbs,
      children,
      title,
      showNavigation,
      showUser,
      subtitle,
    } = this.props;
    const currentUser = showUser ? (<ConnectedCurrentUser />) : null;

    return (
      <div className={this.buildClassName()}>
        <div className="page-flex-container">
          <PageHeader {...{ showNavigation, subtitle, title }} />

          {currentUser}

          <main className="page-body">
            <Alerts />

            { children }
          </main>

          <PageFooter breadcrumbs={breadcrumbs} />
        </div>
      </div>
    );
  }
}

Page.defaultProps = {
  breadcrumbs: [],
  children: null,
  className: null,
  layout: null,
  showNavigation: true,
  showUser: true,
  subtitle: '5e Campaign Companion',
  title: 'Parchment',
};

Page.propTypes = {
  breadcrumbs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.element,
    PropTypes.elementType,
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.string,
  showNavigation: PropTypes.bool,
  showUser: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default Page;
