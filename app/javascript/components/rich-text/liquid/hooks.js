import { useEffect } from 'react';

import render from './render';

// eslint-disable-next-line import/prefer-default-export
export const useLiquid = ({ callback, template }) => {
  const status = { active: true };
  const cleanup = () => { status.active = false; };

  useEffect(() => {
    render({ callback, status, template });

    return cleanup;
  }, []);
};
