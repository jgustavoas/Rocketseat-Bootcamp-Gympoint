export function doCheckin(id) {
  return {
    type: '@user/DO_CHECKIN',
    payload: { id },
  };
}
export function checkInSuccess(data) {
  return {
    type: '@user/CHECKIN_SUCCESS',
    payload: { data },
  };
}
export function checkInFailure(message) {
  return {
    type: '@user/CHECKIN_FAILURE',
    payload: { message },
  };
}
