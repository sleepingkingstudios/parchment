import { INITIALIZED } from '../../../store/requestStatus';
import { buildSpell } from '../../entities';

export default {
  data: buildSpell(),
  errors: {},
  requestStatus: INITIALIZED,
};
