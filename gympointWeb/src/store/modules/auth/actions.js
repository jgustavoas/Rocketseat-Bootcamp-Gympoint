export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password }, // Armazenar os dados da request num objeto chamdado de "payload"
  };
}

export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password }, // Armazenar os dados da request num objeto chamdado de "payload"
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user }, // Armazenar os dados da request num objeto chamdado de "payload"
  };
}

// Uma terceira action chamada de "signFailure",  sem "In" ou "Up" pois serve para ambos
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
