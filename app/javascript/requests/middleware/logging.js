import consoleLogger from '../../logging/consoleLogger';
import { valueOrDefault } from '../../utils/object';

const generatePattern = (namespace) => {
  if (typeof namespace === 'undefined') { return null; }

  return new RegExp(`^${namespace}`);
};

class Logging {
  constructor({ level, logger, namespace }) {
    this.level = valueOrDefault(level, 'INFO');
    this.logger = valueOrDefault(logger, consoleLogger);
    this.pattern = generatePattern(namespace);
    this.handleAction = this.handleAction.bind(this);
  }

  handleAction(next) {
    const { level, logger, pattern } = this;

    return (state, action) => {
      if (pattern && pattern.test(action.type)) {
        const message = 'Logging#handleAction(), state: %O, action: %O';
        const rest = [state, action];

        logger({ level, message, rest });
      }

      return next(state, action);
    };
  }
}

export default Logging;
