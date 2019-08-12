import { connect } from 'react-redux';

import SpellLoader from './loader';

export default (findRequest) => {
  const { namespace, request } = findRequest;
  const { performRequest } = request;
  const mapStateToProps = state => state[namespace];
  const mapDispatchToProps = { performRequest };

  return connect(mapStateToProps, mapDispatchToProps)(SpellLoader);
};
