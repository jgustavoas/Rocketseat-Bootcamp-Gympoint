import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdAdd, MdCheckCircle } from 'react-icons/md';
import api from '~/services/api';

import { goTo, deleteItem } from '~/functions/general';

import { Tbody } from './styles';

export default function Plans() {
  const dispatch = useDispatch();
  const [matriculations, setMatriculations] = useState([]);

  async function loadMatriculations(nameInput) {
    const queryParamsName = nameInput !== undefined ? `?name=${nameInput}` : '';
    const response = await api.get(`matriculations${queryParamsName}`);

    const matriculationsData = response.data.map(data => ({
      ...data,
      start_dateFormated: format(parseISO(data.start_date), 'dd MMM yyyy', {
        locale: pt,
      }),
      end_dateFormated: format(parseISO(data.end_date), 'dd MMM yyyy', {
        locale: pt,
      }),
    }));

    setMatriculations(matriculationsData);
  }

  const callback = () => loadMatriculations();

  useEffect(() => {
    loadMatriculations();
  }, []);

  return (
    <>
      <header>
        <h1>Gerenciando matrículas</h1>
        <aside>
          <button type='button' onClick={() => goTo('matriculationsform')}>
            <MdAdd size={16} color='#fff' /> CADASTRAR
          </button>
        </aside>
      </header>
      <div>
        <table>
          <thead>
            <td>ALUNO</td>
            <td>EMAIL</td>
            <td>PLANO</td>
            <td>INÍCIO</td>
            <td>TÉRMINO</td>
            <td>ATIVA</td>
            <td>AÇÕES</td>
          </thead>
          <Tbody>
            {matriculations.map(matriculation => (
              <tr key={matriculation.id}>
                <td>{matriculation.students.name}</td>
                <td>{matriculation.students.email}</td>
                <td>{matriculation.plans.title}</td>
                <td>{matriculation.start_dateFormated}</td>
                <td>{matriculation.end_dateFormated}</td>
                <td>
                  <MdCheckCircle
                    size={16}
                    color={matriculation.active ? '#16B836' : '#ccc'}
                  />
                </td>
                <td>
                  <button
                    type='button'
                    className='blueMinimalButton'
                    onClick={() =>
                      goTo(`matriculationsform?id=${matriculation.id}`)
                    }
                  >
                    editar
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      deleteItem(
                        `matrícula do aluno ${matriculation.students.name}`,
                        matriculation.students.id,
                        dispatch,
                        'matriculations',
                        callback
                      )
                    }
                    className='redMinimalButton'
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </Tbody>
        </table>
      </div>
    </>
  );
}
