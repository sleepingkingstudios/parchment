import { dismissAllAlerts } from './actions';
import { dig } from '../../utils/object';

const pathnameObserver = ({ store }) => {
  let currentPathname = null;

  const handleChange = () => {
    const nextPathname = dig(store.getState(), 'router', 'location', 'pathname');

    if (nextPathname !== currentPathname) {
      currentPathname = nextPathname;

      store.dispatch(dismissAllAlerts());
    }
  };

  return store.subscribe(handleChange);
};

export default pathnameObserver;
