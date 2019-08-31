import { connect } from 'react-redux';

import SpellLoader from './loader';
import { dig } from '../../utils/object';

export default (findRequest) => {
  const { namespace, request } = findRequest;
  const { performRequest } = request;
  const mapStateToProps = state => dig(state, ...namespace.split('/'));
  const mapDispatchToProps = { performRequest };

  return connect(mapStateToProps, mapDispatchToProps)(SpellLoader);
};
