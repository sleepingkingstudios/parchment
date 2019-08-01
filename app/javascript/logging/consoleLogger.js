const consoleLogger = ({ level, message, rest }) => {
  /* eslint-disable-next-line no-console */
  console.log(level, message, ...rest);
};

export default consoleLogger;
