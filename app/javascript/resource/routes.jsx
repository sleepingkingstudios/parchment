import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { injectProps } from 'utils/react';
import { kebabize } from 'utils/string';

const joinPath = (...segments) => {
  const trimmed = segments.map(
    segment => kebabize(segment).replace(/^\/|\/$/g, ''),
  );

  return `/${trimmed.join('/').replace(/\/$/, '')}`;
};

const generateRoute = ({ key, resource, resources }) => {
  const {
    exact,
    options,
  } = resource;
  const { baseUrl } = options;
  const path = joinPath(baseUrl, resource.path);
  const component = injectProps(
    resource.component,
    {
      ...options,
      resources,
    },
  );

  return (<Route key={key} component={component} exact={exact} path={path} />);
};

const generateRoutes = (resources) => {
  const routes = Object.entries(resources).map(
    ([key, resource]) => generateRoute({ key, resource, resources }),
  );
  const ResourceRoutes = () => (
    <Switch>
      {routes}
    </Switch>
  );

  return ResourceRoutes;
};

export default generateRoutes;
