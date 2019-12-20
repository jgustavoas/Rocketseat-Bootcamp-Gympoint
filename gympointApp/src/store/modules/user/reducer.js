import produce from 'immer';

const INITIAL_STATE = {
  checkins: null,
}; // Apenas preferência do Diego criar essa variável como objeto para escrever menos no parãmetro da função "auth" logo abaixo

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@user/CHECKIN_SUCCESS': {
        draft.checkins = action.payload.data;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
