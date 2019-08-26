import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default performRequest => (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    performRequest({ wildcards: { id } })(dispatch);
  });
};
