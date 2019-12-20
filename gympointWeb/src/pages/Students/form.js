import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import api from '~/services/api';

import { request } from '~/store/modules/data/actions';

import history from '~/services/history';

export default function StudentsForm() {
  const dispatch = useDispatch();

  const [student, setStudent] = useState([]);
  const { id, name, email, age, weight, height } = student;

  const params = new URL(document.location).searchParams;
  const studentId = params.get('id') ? params.get('id') : '';

  useEffect(() => {
    async function studentData() {
      const response = await api.get(`students/${studentId}`);

      setStudent(response.data);
    }

    if (studentId !== '') {
      studentData();
    }
  }, [studentId]);

  /*
  function handleSubmit(studentFormData) {
    const { name, email, age, weight, height } = studentFormData;
    const action = studentId
      ? updateStudentRequest(studentFormData)
      : newStudentRequest({ name, email, age, weight, height });
    dispatch(action);
  } */

  /*
  function handleSubmit(formData) {
    const { name, email, age, weight, height } = formData;
    const action = studentId
      ? request('UPDATE', 'students', {
          id: studentId,
          rest: { name, email, age, weight, height },
        })
      : request('CREATE', 'students', { name, email, age, weight, height });
    dispatch(action);
  } */

  function handleSubmit(page, id, formData) {
    const action = id
      ? request('UPDATE', page, {
          id,
          formData,
        })
      : request('CREATE', page, formData);
    dispatch(action);
  }

  function goTo(page) {
    history.push(`/${page}`);
  }

  return (
    <>
      <header>
        <h1>Cadastro de aluno</h1>
        <aside>
          <button
            type='button'
            className='greyButton'
            onClick={() => goTo('students')}
          >
            <MdArrowBack size={16} color='#ee4d64' /> VOLTAR
          </button>
          <button
            type='button'
            onClick={() =>
              handleSubmit('students', studentId, {
                name,
                email,
                age,
                weight,
                height,
              })
            }
          >
            <MdCheck size={16} color='#fff' /> SALVAR
          </button>
        </aside>
      </header>
      <div>
        <form>
          <label htmlFor='name'>
            NOME COMPLETO
            <Input
              type='text'
              onChange={event =>
                setStudent({
                  id,
                  name: event.target.value,
                  email,
                  age,
                  weight,
                  height,
                })
              }
              value={name}
              name='name'
              id='name'
            />
          </label>
          <label htmlFor='email'>
            E-MAIL
            <Input
              type='email'
              onChange={event =>
                setStudent({
                  id,
                  name,
                  email: event.target.value,
                  age,
                  weight,
                  height,
                })
              }
              value={email}
              name='email'
              id='email'
            />
          </label>
          <div>
            <div>
              <label htmlFor='age'>
                IDADE
                <Input
                  type='text'
                  onChange={event =>
                    setStudent({
                      id,
                      name,
                      email,
                      age: event.target.value,
                      weight,
                      height,
                    })
                  }
                  value={age}
                  name='age'
                  id='age'
                />
              </label>
            </div>
            <div>
              <label htmlFor='weight'>
                PESO
                <Input
                  type='text'
                  onChange={event =>
                    setStudent({
                      id,
                      name,
                      email,
                      age,
                      weight: event.target.value,
                      height,
                    })
                  }
                  value={weight}
                  name='weight'
                  id='weght'
                />
              </label>
            </div>
            <div>
              <label htmlFor='height'>
                ALTURA
                <Input
                  type='text'
                  onChange={event =>
                    setStudent({
                      id,
                      name,
                      email,
                      age,
                      weight,
                      height: event.target.value,
                    })
                  }
                  value={height}
                  name='height'
                  id='height'
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
