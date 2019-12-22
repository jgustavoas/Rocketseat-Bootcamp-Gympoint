import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import api from '~/services/api';

import { goTo, removeAttributeFrom, handleSubmit } from '~/functions/general';

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
              handleSubmit(
                dispatch,
                'students',
                studentId,
                {
                  name,
                  email,
                  age,
                  weight,
                  height,
                },
                [
                  ['name', 'text'],
                  ['email', 'email'],
                  ['age', 'number'],
                  ['weight', 'number'],
                  ['height', 'number'],
                ]
              )
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
              onFocus={() => removeAttributeFrom('name')}
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
              onFocus={() => removeAttributeFrom('email')}
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
                  type='number'
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
                  onFocus={() => removeAttributeFrom('age')}
                  value={age}
                  name='age'
                  id='age'
                />
              </label>
            </div>
            <div>
              <label htmlFor='weight'>
                PESO (Kg)
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
                  onFocus={() => removeAttributeFrom('weight')}
                  value={weight}
                  name='weight'
                  id='weght'
                />
              </label>
            </div>
            <div>
              <label htmlFor='height'>
                ALTURA (m)
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
                  onFocus={() => removeAttributeFrom('height')}
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
