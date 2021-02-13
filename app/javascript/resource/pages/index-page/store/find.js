import buildFindClient from 'resource/store/find';

const buildClient = (options) => {
  const client = buildFindClient(options);

  return Object.assign(
    client,
    {
      options,
      type: 'resource/index-page/find',
    },
  );
};

export default buildClient;
