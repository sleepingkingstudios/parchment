import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import { hooks } from '../../store/showFindBook';
import { hooks as deleteHooks } from '../../store/deleteBook';
import { valueOrDefault } from '../../../utils/object';

const { useDeleteData } = deleteHooks;

const generateButtons = ({ book, deleteData }) => {
  if (!(book && book.id)) { return []; }

  return [
    {
      label: 'Update Book',
      outline: true,
      url: `/books/${book.id}/update`,
    },
    {
      buttonStyle: 'danger',
      label: 'Delete Book',
      onClick: deleteData,
      outline: true,
    },
  ];
};
const { useEndpoint } = hooks;

const ShowBookHeading = () => {
  const { data } = useEndpoint();
  const { book } = data;
  const { id } = valueOrDefault(book, {});
  const deleteData = useDeleteData({ wildcards: { id } });

  return (
    <HeadingWithButtons buttons={generateButtons({ book, deleteData })}>
      Show Book
    </HeadingWithButtons>
  );
};

ShowBookHeading.defaultProps = {};

ShowBookHeading.propTypes = {};

export default ShowBookHeading;
