import { dig } from '../../utils/object';

const generateSelector = ({ namespace }) => state => dig(state, ...namespace.split('/'));

export default generateSelector;
