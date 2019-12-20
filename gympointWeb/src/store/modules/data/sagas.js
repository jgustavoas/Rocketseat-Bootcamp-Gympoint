import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
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

    toast.success('Dados atualizados com sucesso!');
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

export default all([
  takeLatest('CREATE', toCreate),
  takeLatest('UPDATE', toUpdate),
  takeLatest('DELETE', toDelete),
]);
