import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { request } from '~/store/modules/data/actions';
import api from '~/services/api';

export function* toCreate({ payload }) {
  try {
    const { page, data } = payload;
    yield call(api.post, page, { data });

    toast.success('Dados inseridos com sucesso!');
  } catch (err) {
    toast.error('Erro ao inserir dados!');
  }
}

export function* toUpdate({ payload }) {
  try {
    const { page, data } = payload;
    const { id, formData } = data;
    yield call(api.put, `/${page}/${id}`, formData);

    if (page === 'help-orders') {
      yield put(request('@helpOrder/SUCCESS', page, true));
      toast.success('Resposta enviada com sucesso!');
    } else {
      toast.success('Dados atualizados com sucesso!');
    }
  } catch (err) {
    toast.error('Erro ao atualizar dados!');
  }
}

export function* toDelete({ payload }) {
  try {
    const { page, data } = payload;
    yield call(api.delete, page, { data: { id: String(data) } });

    toast.success('Dados deletados com sucesso!');
  } catch (err) {
    toast.error('Erro ao deletar dados!');
  }
}

export function* toToggle({ payload }) {
  const { page, data } = payload;
  const { disabled } = data;
  try {
    yield put(request('@helpOrder/SUCCESS', page, disabled));
  } catch (err) {
    toast.error('Erro ao habilitar textarea');
  }
}

export default all([
  takeLatest('CREATE', toCreate),
  takeLatest('UPDATE', toUpdate),
  takeLatest('DELETE', toDelete),

  // A próxima saga é exclusiva da página dos pedidos de ajuda dos alunos.
  // Ela serve para alternar a textarea do formulário entre 'enabled' e 'disabled'.
  takeLatest('@helpOrder/TOGGLE', toToggle),
]);
