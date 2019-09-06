import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import { hooks } from '../../store/showFindPublication';
import { hooks as deleteHooks } from '../../store/deletePublication';
import { valueOrDefault } from '../../../utils/object';

const { useDeleteData } = deleteHooks;

const generateButtons = ({ deleteData, publication }) => {
  if (!(publication && publication.id)) { return []; }

  return [
    {
      label: 'Update Publication',
      outline: true,
      url: `/publications/${publication.id}/update`,
    },
    {
      buttonStyle: 'danger',
      label: 'Delete Publication',
      onClick: deleteData,
      outline: true,
    },
  ];
};
const { useEndpoint } = hooks;

const ShowPublicationHeading = () => {
  const { data } = useEndpoint();
  const { publication } = data;
  const { id } = valueOrDefault(publication, {});
  const deleteData = useDeleteData({ wildcards: { id } });

  return (
    <HeadingWithButtons buttons={generateButtons({ deleteData, publication })}>
      Show Publication
    </HeadingWithButtons>
  );
};

ShowPublicationHeading.defaultProps = {};

ShowPublicationHeading.propTypes = {};

export default ShowPublicationHeading;
