import initialState from './initialState';
import {
  REQUEST_FIND_SPELL_FAILURE,
  REQUEST_FIND_SPELL_PENDING,
  REQUEST_FIND_SPELL_SUCCESS,
  REQUEST_SPELLS_FAILURE,
  REQUEST_SPELLS_PENDING,
  REQUEST_SPELLS_SUCCESS,
  UPDATE_SPELL_FORM_FIELD,
} from './actions';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/requestStatus';

const updateDraftSpell = (state, { propName, value }) => {
  const draftSpell = Object.assign({}, state.draftSpell);

  draftSpell[propName] = value;

  return Object.assign({}, state, { draftSpell });
};

const spellsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FIND_SPELL_FAILURE:
      return Object.assign({}, state, {
        spell: {},
        findSpellRequestStatus: FAILURE,
      });
    case REQUEST_FIND_SPELL_PENDING:
      return Object.assign({}, state, {
        spell: {},
        findSpellRequestStatus: PENDING,
      });
    case REQUEST_FIND_SPELL_SUCCESS:
      return Object.assign({}, state, {
        spell: action.payload.spell,
        findSpellRequestStatus: SUCCESS,
      });
    case REQUEST_SPELLS_FAILURE:
      return Object.assign({}, state, {
        spells: [],
        spellsRequestStatus: FAILURE,
      });
    case REQUEST_SPELLS_PENDING:
      return Object.assign({}, state, {
        spells: [],
        spellsRequestStatus: PENDING,
      });
    case REQUEST_SPELLS_SUCCESS:
      return Object.assign({}, state, {
        spells: action.payload.spells,
        spellsRequestStatus: SUCCESS,
      });
    case UPDATE_SPELL_FORM_FIELD:
      return updateDraftSpell(state, action.payload);
    default:
      return state;
  }
};

export default spellsReducer;
