export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password }, // Método do Diego para armazenar os dados da request num objeto que ele chama de "payload"
  };
}

export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password }, // Método do Diego para armazenar os dados da request num objeto que ele chama de "payload"
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
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
