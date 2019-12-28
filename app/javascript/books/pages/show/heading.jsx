import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import { hooks } from '../../store/showFindBook';

const generateButtons = ({ book }) => {
  if (!(book && book.id)) { return []; }

  return [
    {
      label: 'Update Book',
      outline: true,
      url: `/books/${book.id}/update`,
    },
  ];
};
const { useEndpoint } = hooks;

const ShowBookHeading = () => {
  const { data } = useEndpoint();
  const { book } = data;

  return (
    <HeadingWithButtons buttons={generateButtons({ book })}>
      Show Book
    </HeadingWithButtons>
  );
};

ShowBookHeading.defaultProps = {};

ShowBookHeading.propTypes = {};

export default ShowBookHeading;
