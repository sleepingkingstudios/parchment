import React from 'react';

import HeadingWithButtons from '../../../components/heading-with-buttons';
import { hooks } from '../../store/showFindSpell';
import { hooks as deleteHooks } from '../../store/deleteSpell';
import { valueOrDefault } from '../../../utils/object';

const { useDeleteData } = deleteHooks;

const generateButtons = ({ deleteData, spell }) => {
  if (!(spell && spell.id)) { return []; }

  return [
    {
      label: 'Update Spell',
      outline: true,
      url: `/spells/${spell.id}/update`,
    },
    {
      buttonStyle: 'danger',
      label: 'Delete Spell',
      onClick: deleteData,
      outline: true,
    },
  ];
};
const { useEndpoint } = hooks;

const ShowSpellHeading = () => {
  const { data } = useEndpoint();
  const { spell } = data;
  const { id } = valueOrDefault(spell, {});
  const deleteData = useDeleteData({ wildcards: { id } });

  return (
    <HeadingWithButtons buttons={generateButtons({ deleteData, spell })}>
      Show Spell
    </HeadingWithButtons>
  );
};

ShowSpellHeading.defaultProps = {};

ShowSpellHeading.propTypes = {};

export default ShowSpellHeading;
