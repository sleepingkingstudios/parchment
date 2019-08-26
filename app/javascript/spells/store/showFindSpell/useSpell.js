import { shallowEqual, useSelector } from 'react-redux';

import { dig } from '../../../utils/object';

export default (fn = state => state) => useSelector((state) => {
  const { data, errors, status } = dig(state, 'spells', 'showFindSpell');
  const { spell } = data;

  return fn({
    data,
    errors,
    spell,
    status,
  });
}, shallowEqual);
