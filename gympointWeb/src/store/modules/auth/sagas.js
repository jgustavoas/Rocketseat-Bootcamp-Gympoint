import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    /* Chamar a api (função 'call') com o método indicado no primeiro parâmetro,
       tendo a url como segundo parâmetro (neste caso 'sessions', como no Insomnia),
       e os dados passados à requsição como objeto no terceiro parâmetro ("email" e "password", como no Insomnia)
    */
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    // Se a chamada funcionar, obter o token e os dados do usuário.
    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    // Se passar na conferência, por os dados ("put") na action signInSuccess
    yield put(signInSuccess(token, user));

    history.push('/students');
  } catch (err) {
    toast.error('Falha na autenticação. Verifique seus dados.');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro. Verifique seus dados.');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken), // Persistir o token e manter autenticada a navegação.
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
