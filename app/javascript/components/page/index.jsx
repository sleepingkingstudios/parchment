import React from 'react';
import PropTypes from 'prop-types';

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
      subtitle,
    } = this.props;

    return (
      <div className={this.buildClassName()}>
        <div className="page-flex-container">
          <PageHeader {...{ title, subtitle }} />

          <main className="page-body">
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
  subtitle: null,
};

Page.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Page;
