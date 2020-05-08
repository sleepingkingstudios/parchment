import { dig } from '../../../utils/object';

const selector = state => dig(state, 'authentication', 'session');

export default selector;
