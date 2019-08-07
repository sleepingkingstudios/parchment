import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SpellPage from './page';
import { request } from './store/index';

const { performRequest } = request;

const mapStateToProps = state => state.findSpell;

const mapDispatchToProps = { requestGetData: performRequest };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpellPage));
