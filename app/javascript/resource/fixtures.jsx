import React from 'react';

export const Block = () => (<div />);
export const Form = () => (<div />);
export const Table = () => (<div />);

export const CreatePage = () => (<div />);
export const IndexPage = () => (<div />);
export const LandingPage = () => (<div />);
export const ShowPage = () => (<div />);
export const UpdatePage = () => (<div />);

export const fixtures = {
  create: {
    component: CreatePage,
    exact: true,
    options: { baseUrl: '/widgets', resourceName: 'widgets' },
    path: '/create',
    reducer: ((state = { widget: {} }) => state),
  },
  index: {
    component: IndexPage,
    exact: true,
    options: { baseUrl: '/widgets', resourceName: 'widgets' },
    path: '/',
    reducer: ((state = { widgets: [] }) => state),
  },
  show: {
    component: ShowPage,
    exact: true,
    options: { baseUrl: '/widgets', resourceName: 'widgets' },
    path: '/:id',
    reducer: ((state = { widget: {} }) => state),
  },
  update: {
    component: UpdatePage,
    exact: true,
    options: { baseUrl: '/widgets', resourceName: 'widgets' },
    path: '/:id/update',
    reducer: ((state = { widget: {} }) => state),
  },
};
