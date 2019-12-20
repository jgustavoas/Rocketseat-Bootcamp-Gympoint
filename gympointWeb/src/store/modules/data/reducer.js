import produce from 'immer';

const INITIAL_STATE = {
  matriculations: [],
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@matriculation/UPDATE_MATRICULATION_SUCCESS': {
        draft.profile = action.payload.data;
        break;
      }
      case '@matriculation/DELETE_MATRICULATION_SUCCESS': {
        draft.matriculations = action.payload.data;
        break;
      }
      case '@matriculation/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
