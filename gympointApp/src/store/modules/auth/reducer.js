import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  loading: false,
  id: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.loading = false;
        draft.signed = true;
        draft.id = action.payload.student;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.loading = false;
        draft.signed = false;
        draft.id = null;
        break;
      }
      default: // O default dessa condicional "switch" não precisa retornar algo
    }
  });
}
