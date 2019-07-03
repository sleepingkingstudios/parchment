import { INITIALIZED } from '../../store/requestStatus';
import { buildSpell } from '../entities';

export default {
  createSpellRequestStatus: INITIALIZED,
  draftSpell: buildSpell(),
  draftSpellErrors: {},
  findSpellRequestStatus: INITIALIZED,
  spell: {},
  spells: [],
  spellsRequestStatus: INITIALIZED,
};
