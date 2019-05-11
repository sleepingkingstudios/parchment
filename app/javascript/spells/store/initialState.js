import { INITIALIZED } from '../../store/requestStatus';
import { buildSpell } from '../entities';

export default {
  createSpellRequestStatus: INITIALIZED,
  draftSpell: buildSpell(),
  findSpellRequestStatus: INITIALIZED,
  spell: {},
  spells: [],
  spellsRequestStatus: INITIALIZED,
};
