import React from 'react';
import PropTypes from 'prop-types';

import { spellType } from '../entities';

class SpellLoader extends React.Component {
  componentDidMount() {
    const {
      performRequest,
      spellId,
    } = this.props;

    performRequest({ id: spellId });
  }

  render() {
    const { data, render, status } = this.props;
    const { spell } = data;

    return render({ spell, status });
  }
}

SpellLoader.defaultProps = {};

SpellLoader.propTypes = {
  data: PropTypes.shape({
    spell: PropTypes.oneOfType([
      spellType,
      PropTypes.object,
    ]).isRequired,
  }).isRequired,
  performRequest: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  spellId: PropTypes.string.isRequired,
};

export default SpellLoader;
