import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default performRequest => () => {
  const dispatch = useDispatch();

  useEffect(() => {
    performRequest()(dispatch);
  });
};
