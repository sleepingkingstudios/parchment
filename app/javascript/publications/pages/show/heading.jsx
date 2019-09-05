import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import { hooks } from '../../store/showFindPublication';

const generateButtons = ({ publication }) => {
  if (!(publication && publication.id)) { return []; }

  return [
    {
      label: 'Update Publication',
      outline: true,
      url: `/publications/${publication.id}/update`,
    },
  ];
};
const { useEndpoint } = hooks;

const ShowPublicationHeading = () => {
  const { data } = useEndpoint();
  const { publication } = data;

  return (
    <HeadingWithButtons buttons={generateButtons({ publication })}>
      Show Publication
    </HeadingWithButtons>
  );
};

ShowPublicationHeading.defaultProps = {};

ShowPublicationHeading.propTypes = {};

export default ShowPublicationHeading;
