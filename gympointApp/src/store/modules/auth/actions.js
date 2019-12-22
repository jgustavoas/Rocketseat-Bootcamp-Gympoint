export function signInRequest(matriculation) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { matriculation },
  };
}

export function signInSuccess(student) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { student },
  };
}

// Uma terceira action chamada de "signFailure",  sem "In" ou "Up" pois serve para ambos.
export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
