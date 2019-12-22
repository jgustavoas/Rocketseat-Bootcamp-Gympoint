/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { format, parseISO, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdArrowBack, MdCheck } from 'react-icons/md';

import api from '~/services/api';

import { goTo, removeAttributeFrom, handleSubmit } from '~/functions/general';
import { today } from '~/functions/matriculation';

export default function Form() {
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);
  const [toggleDisplay, setToggleDisplay] = useState('none');
  const [matriculation, setMatriculation] = useState([]);

  const {
    matriculationId,
    active,
    studentId,
    planId,
    price,
    studentName,
    planTitle,
    planDuration,
    start_dateFormated,
    end_dateFormated,
  } = matriculation;

  const [plans, setPlans] = useState([]);

  const params = new URL(document.location).searchParams;
  const getMatriculationId = params.get('id')
    ? params.get('id')
    : matriculationId;

  useEffect(() => {
    async function studentsData() {
      const response = await api.get(`students`);
      setStudents(response.data);
    }
    setMatriculation(studentsData);

    async function plansData() {
      const response = await api.get(`plans`);
      setPlans(response.data);
    }
    setMatriculation(plansData);

    async function matriculationData() {
      const response = await api.get(`matriculations/${getMatriculationId}`);

      const formatStartDate = format(
        parseISO(response.data.start_date),
        'yyyy-MM-dd',
        {
          locale: pt,
        }
      );
      const formatEndDate = format(
        parseISO(response.data.end_date),
        'yyyy-MM-dd',
        {
          locale: pt,
        }
      );

      const matriculationData = {
        active: response.data.active,
        matriculationId: response.data.id,
        studentId: response.data.student_id,
        studentName: response.data.students.name,
        planId: response.data.plan_id,
        planDuration: response.data.plans.duration,
        planTitle: response.data.plans.title,
        price: response.data.price,
        start_dateFormated: formatStartDate,
        end_dateFormated: formatEndDate,
      };

      setMatriculation(matriculationData);
    }

    if (getMatriculationId !== '') {
      matriculationData();
    }
  }, [getMatriculationId]);

  function formatEndDate(refDate, planDuration) {
    return format(addMonths(new Date(refDate), planDuration), 'yyyy-MM-dd');
  }

  function handleEvent(planValue, start_dateFormated) {
    setMatriculation({
      active,
      matriculationId,
      studentId,
      studentName,
      planId: planValue.id,
      planDuration: planValue.duration,
      planTitle: planValue.title,
      price: planValue.price * planValue.duration,
      start_dateFormated,
      end_dateFormated: formatEndDate(start_dateFormated, planValue.duration),
    });
  }

  async function loadStudents(name) {
    const queryParamsName = name !== undefined ? `?name=${name}` : '';
    const response = await api.get(`students${queryParamsName}`);

    setStudents(response.data);
    if (name === '' || response.data.length === 0) {
      setToggleDisplay('none');
    } else {
      setToggleDisplay('block');
    }
  }

  function mudarValor(valor) {
    setMatriculation({
      active,
      matriculationId,
      studentId: valor.student_id,
      studentName: valor.student_name,
      planId: matriculation.planId,
      planDuration,
      price,
      planTitle,
      start_dateFormated: matriculation.start_dateFormated || today,
      end_dateFormated,
    });
  }

  // Não usei o 'React Select', resolvi criar um autocomplete personalizado com uma função chamada 'selectSuggestion'
  // Mais comentários sobre esta função no arquivo 'store/modules/data/matriculations.js'
  function selectSuggestion(key, inputType) {
    const alfabet = /^[a-zA-Z]$/;
    const specialKeys = ['Enter', 'Backspace', ' '];

    if (key === 'ArrowDown') {
      document.getElementById('studentsList').focus();

      if (inputType === 'text') {
        document.getElementById('studentsList').selectedIndex = '0';
        const primeiroItem = document.getElementById('studentsList').options[0];
        if (primeiroItem) {
          const valorDoPrimeiroItem = primeiroItem.value;
          mudarValor(JSON.parse(valorDoPrimeiroItem));
        }
      }
    }

    if (inputType === 'select') {
      if (specialKeys.includes(key) || key.match(alfabet) !== null) {
        setToggleDisplay('none');
        document.getElementById('studentNameInput').focus();
      }
    }
  }

  return (
    <>
      <header>
        <h1>Cadastro de matrícula</h1>
        <aside>
          <button
            type='button'
            className='greyButton'
            onClick={() => goTo('matriculations')}
          >
            <MdArrowBack size={16} color='#ee4d64' /> VOLTAR
          </button>
          <button
            type='button'
            onClick={() =>
              handleSubmit(
                dispatch,
                'matriculations',
                matriculationId,
                {
                  student_id: studentId,
                  plan_id: planId,
                  start_date: `${start_dateFormated}T03:00:01.000Z`,
                },
                [
                  ['studentNameInput', 'text'],
                  ['planSelect', 'select'],
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
          <label htmlFor='name'>NOME DO ALUNO</label>
          <input
            value={studentName}
            style={{ borderBottomLeftRadius: toggleDisplay === 'none' ? 4 : 0 }}
            autoComplete='off'
            type='text'
            name='studentNameInput'
            id='studentNameInput'
            onChange={event => {
              setMatriculation({
                active,
                matriculationId,
                studentId,
                planId,
                planDuration,
                price,
                studentName: event.target.value,
                planTitle,
                start_dateFormated: matriculation.start_dateFormated || today,
                end_dateFormated,
              });
              loadStudents(event.target.value);
            }}
            onFocus={() => removeAttributeFrom('studentNameInput')}
            onKeyDown={event => selectSuggestion(event.key, 'text')}
          />
          <select
            style={{ display: toggleDisplay }}
            name='studentsList'
            id='studentsList'
            onFocus={() => removeAttributeFrom('studentsList')}
            onBlur={() => setToggleDisplay('none')}
            onChange={event => mudarValor(JSON.parse(event.target.value))}
            onKeyDown={event => selectSuggestion(event.key, 'select')}
            size={students.length < 2 ? '2' : students.length}
          >
            {students.map(student => (
              <option
                value={`{"student_id":${student.id}, "student_name":"${student.name}"}`}
                id={`id_${student.id}`}
                name={student.name}
                onClick={() => setToggleDisplay('none')}
              >
                {student.name}
              </option>
            ))}
          </select>
          <div>
            <div>
              <label htmlFor='name'>PLANO</label>
              <select
                id='planSelect'
                name='planSelect'
                onFocus={() => removeAttributeFrom('planSelect')}
                onChange={event =>
                  handleEvent(
                    JSON.parse(event.target.value),
                    start_dateFormated || today
                  )
                }
              >
                <option value=''>Selecione</option>
                {plans.map(plan => (
                  <option
                    selected={
                      matriculation.planId === plan.id ? 'selected' : ''
                    }
                    value={`{"id":${plan.id}, "title":"${plan.title}", "price":${plan.price}, "duration":${plan.duration}}`}
                  >
                    {`${plan.title} (R$${plan.price},00 / ${plan.duration} ${
                      plan.duration > 1 ? 'meses' : 'mês'
                    })`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='name'>DATA DE INÍCIO</label>
              <input
                type='date'
                value={start_dateFormated || today}
                name='startDateInput'
                id='startDateInput'
                onFocus={() => removeAttributeFrom('startDateInput')}
                onChange={event =>
                  setMatriculation({
                    active,
                    matriculationId,
                    studentId,
                    planId,
                    planDuration,
                    price,
                    studentName,
                    planTitle,
                    start_dateFormated: event.target.value,
                    end_dateFormated: formatEndDate(
                      event.target.value,
                      planDuration || 1
                    ),
                  })
                }
              />
            </div>
            <div>
              <label htmlFor='name'>DATA DE TÉRMINO</label>
              <input
                type='date'
                disabled
                name=''
                id=''
                value={planDuration ? end_dateFormated : ''}
              />
            </div>
            <div>
              <label htmlFor='name'>VALOR TOTAL</label>
              <input
                disabled='disabled'
                value={price || 0}
                type='text'
                name=''
                id=''
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
