import { shallowEqual, useSelector } from 'react-redux';

const generateHooks = ({ selector }) => {
  const useEndpoint = (fn = state => state) => useSelector(
    state => fn(selector(state)),
    shallowEqual,
  );

  return { useEndpoint };
};

export default generateHooks;
