import engine from './engine';

const render = async ({ callback, status, template }) => {
  const rendered = await engine.parseAndRender(template);

  if (callback && status.active) { callback(rendered); }

  return rendered;
};

export default render;
