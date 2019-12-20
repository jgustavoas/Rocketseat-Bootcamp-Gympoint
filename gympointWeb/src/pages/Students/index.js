import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import { request } from '~/store/modules/data/actions';

import history from '~/services/history';

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);

  async function loadStudents(name) {
    const queryParamsName = name !== undefined ? `?name=${name}` : '';
    const response = await api.get(`students${queryParamsName}`);

    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function goTo(page) {
    history.push(`/${page}`);
  }

  /* function deleteStudent(id, name) {
    if (window.confirm(`Apagar o cadastro do aluno ${name} (id ${id})?`)) {
      dispatch(deleteStudentRequest(id));
    }
    loadStudents();
  } */

  function deleteStudent(id, name) {
    if (window.confirm(`Apagar o cadastro do aluno ${name}?`)) {
      dispatch(request('DELETE', 'students', id));
    }
    loadStudents();
  }

  return (
    <>
      <header>
        <h1>Gerenciando alunos</h1>
        <aside>
          <button type='button' onClick={() => goTo('studentsform')}>
            <MdAdd size={16} color='#fff' /> CADASTRAR
          </button>
          <input
            type='text'
            onChange={event => loadStudents(event.target.value)}
            placeholder='Procurar aluno'
            name='procurar'
            id='procurar'
          />
        </aside>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>EMAIL</th>
              <th>IDADE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    type='button'
                    className='blueMinimalButton'
                    onClick={() => goTo(`studentsform?id=${student.id}`)}
                  >
                    editar
                  </button>
                  <button
                    type='button'
                    onClick={() => deleteStudent(student.id, student.name)}
                    className='redMinimalButton'
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
