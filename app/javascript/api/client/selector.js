import { dig } from 'utils/object';

const generateSelector = ({ namespace }) => {
  const selector = state => dig(state, ...namespace.split('/'));

  return selector;
};

export default generateSelector;
