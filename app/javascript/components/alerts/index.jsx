import { connect } from 'react-redux';

import Alerts from './alerts';
import { dismissAlert } from './store/actions';

const mapStateToProps = state => state.alerts;

const mapDispatchToProps = { dismissAlert };

const ConnectedAlerts = connect(mapStateToProps, mapDispatchToProps)(Alerts);

export default ConnectedAlerts;
