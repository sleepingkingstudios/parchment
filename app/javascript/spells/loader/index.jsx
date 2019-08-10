import { connect } from 'react-redux';

import SpellLoader from './loader';
import { request } from '../show/store/index';

const { performRequest } = request;
const mapStateToProps = state => state.findSpell;
const mapDispatchToProps = { performRequest };

export default connect(mapStateToProps, mapDispatchToProps)(SpellLoader);
