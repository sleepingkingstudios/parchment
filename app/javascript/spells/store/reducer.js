import initialState from './initialState';
import {
  REQUEST_FIND_SPELL_FAILURE,
  REQUEST_FIND_SPELL_PENDING,
  REQUEST_FIND_SPELL_SUCCESS,
  REQUEST_SPELLS_FAILURE,
  REQUEST_SPELLS_PENDING,
  REQUEST_SPELLS_SUCCESS,
} from './actions';
import {
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../store/requestStatus';

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
    default:
      return state;
  }
};

export default spellsReducer;
