import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';

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
    const { children, title, subtitle } = this.props;

    return (
      <div className={this.buildClassName()}>
        <Header {...{ title, subtitle }} />

        { children }
      </div>
    );
  }
}

Page.defaultProps = {
  children: null,
  className: null,
  layout: null,
  subtitle: null,
};

Page.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Page;
