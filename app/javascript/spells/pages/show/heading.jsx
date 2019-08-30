import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import { hooks } from '../../store/showFindSpell';

const generateButtons = ({ data }) => {
  const { spell } = data;

  if (!(spell && spell.id)) { return []; }

  return [
    {
      label: 'Update Spell',
      outline: true,
      url: `/spells/${spell.id}/update`,
    },
  ];
};
const { useEndpoint } = hooks;

const ShowSpellHeading = () => {
  const buttons = useEndpoint(generateButtons);

  return (
    <HeadingWithButtons buttons={buttons}>
      Show Spell
    </HeadingWithButtons>
  );
};

ShowSpellHeading.defaultProps = {};

ShowSpellHeading.propTypes = {};

export default ShowSpellHeading;
