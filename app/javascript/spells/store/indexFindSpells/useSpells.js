import { shallowEqual, useSelector } from 'react-redux';

import { dig } from '../../../utils/object';

export default (fn = state => state) => useSelector((state) => {
  const { data, errors, status } = dig(state, 'spells', 'indexFindSpells');
  const { spells } = data;

  return fn({
    data,
    errors,
    spells,
    status,
  });
}, shallowEqual);
