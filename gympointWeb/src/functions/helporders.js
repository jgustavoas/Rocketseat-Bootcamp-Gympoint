import { request } from '~/store/modules/data/actions';

export function dispatchToggle(toDisable, dispatch) {
  const action = request('@helpOrder/TOGGLE', 'help-orders', {
    disabled: toDisable,
  });
  return dispatch(action);
}

export function displayToggleSwitch(hiding, showing, dispatch, callback) {
  const toHide = document.getElementById(hiding);
  const toShow = document.getElementById(showing);

  toShow.style.display = 'block';
  toHide.style.display = 'none';

  callback();
  hiding === 'helpOrderForm'
    ? dispatchToggle(true, dispatch)
    : dispatchToggle(false, dispatch);
}
