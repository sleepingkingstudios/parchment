import { connect } from 'react-redux';

import ApiLoader from './loader';
import { dig } from '../../utils/object';

export { default as LoaderSwitch } from './switch';

export const connectLoader = (endpoint, Loader = ApiLoader) => {
  const { namespace, request } = endpoint;
  const { performRequest } = request;
  const mapStateToProps = state => dig(state, ...namespace.split('/'));
  const mapDispatchToProps = { performRequest };

  return connect(mapStateToProps, mapDispatchToProps)(Loader);
};
