import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import { checkInSuccess, checkInFailure } from './actions';

export function* doChekin({ payload }) {
  try {
    const { id } = payload;

    // const response = yield call(api.post, `students/${id}/checkins`);
    yield call(api.post, `students/${id}/checkins`);

    Alert.alert('Sucesso', 'Check-in realizado');

    const getCheckins = yield call(api.get, `students/${id}/checkins`);

    const checkins = getCheckins.data;

    if (checkins) {
      yield put(checkInSuccess(checkins));
      console.log(checkins);
    }
  } catch (err) {
    Alert.alert('Falha na atualização', 'Verifique seus dados');
    yield put(checkInFailure());
  }
}

export default all([
  // Quando a action '@user/UPDATE_PROFILE_REQUEST' for despachada, executar um saga chamado "updateProfile"
  takeLatest('@user/DO_CHECKIN', doChekin),
]);
