import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import { useSpell } from '../../store/showFindSpell';

const generateButtons = ({ spell }) => {
  if (!(spell && spell.id)) { return []; }

  return [
    {
      label: 'Update Spell',
      outline: true,
      url: `/spells/${spell.id}/update`,
    },
  ];
};

const ShowSpellHeading = () => {
  const buttons = useSpell(generateButtons);

  return (
    <HeadingWithButtons buttons={buttons}>
      Show Spell
    </HeadingWithButtons>
  );
};

ShowSpellHeading.defaultProps = {};

ShowSpellHeading.propTypes = {};

export default ShowSpellHeading;
