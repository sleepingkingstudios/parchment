import { Liquid } from 'liquidjs';

import { valueOrDefault } from '../../../utils/object';
import { underscore } from '../../../utils/string';

const engine = new Liquid();

const generateLink = baseUrl => (value, fragment) => {
  const url = `/${baseUrl}/${valueOrDefault(fragment, underscore(value).replace(/[ _]+/g, '-'))}`;

  return `[${value}](${url})`;
};

engine.registerFilter(
  'action_link',
  generateLink('mechanics/actions'),
);

engine.registerFilter(
  'condition_link',
  generateLink('mechanics/conditions'),
);

engine.registerFilter(
  'spell_link',
  generateLink('spells'),
);

export default engine;
