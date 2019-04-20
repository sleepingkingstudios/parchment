import { INITIALIZED } from '../../store/requestStatus';
import { buildSpell } from '../entities';

export default {
  draftSpell: buildSpell(),
  findSpellRequestStatus: INITIALIZED,
  spell: {},
  spells: [],
  spellsRequestStatus: INITIALIZED,
};
