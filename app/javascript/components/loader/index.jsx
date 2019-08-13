import { connect } from 'react-redux';

import ApiLoader from './loader';
import { dig } from '../../utils/object';

export default (endpoint) => {
  const { namespace, request } = endpoint;
  const { performRequest } = request;
  const mapStateToProps = state => dig(state, namespace.split('/'));
  const mapDispatchToProps = { performRequest };

  return connect(mapStateToProps, mapDispatchToProps)(ApiLoader);
};
