import produce from 'immer';

const INITIAL_STATE = {
  disabled: true,
};

export default function data(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrder/SUCCESS': {
        draft.disabled = action.payload.data;
        break;
      }
      default:
    }
  });
}
