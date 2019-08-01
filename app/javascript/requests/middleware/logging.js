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
    this.handleFailure = this.handleFailure.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
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

  handleFailure(next) {
    const { level, logger } = this;

    return ({ dispatch, getState, response }) => {
      const message = 'Logging#handleFailure(), response: %O';
      const rest = [response];

      logger({ level, message, rest });

      return next({ dispatch, getState, response });
    };
  }

  handleSuccess(next) {
    const { level, logger } = this;

    return ({ dispatch, getState, response }) => {
      const message = 'Logging#handleSuccess(), response: %O';
      const rest = [response];

      logger({ level, message, rest });

      return next({ dispatch, getState, response });
    };
  }
}

export default Logging;
