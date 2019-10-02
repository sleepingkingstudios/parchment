import { load } from '../fixtures';

const isOfficial = (publication) => {
  const { playtest, publisherName } = publication;

  return !playtest && publisherName === 'Wizards of the Coast';
};

const rawData = load('publications');

/* eslint-disable-next-line import/prefer-default-export */
export const publicationsData = rawData
  .map(publication => Object.assign(
    {},
    publication,
    {
      official: isOfficial(publication),
    },
  ));
