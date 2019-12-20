import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import { request } from '~/store/modules/data/actions';

import history from '~/services/history';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    const response = await api.get('plans');

    setPlans(response.data);
  }

  useEffect(() => {
    loadPlans();
  }, []);

  function goTo(page) {
    history.push(`/${page}`);
  }

  function deletePlan(id, name) {
    if (window.confirm(`Apagar o plano ${name}?`)) {
      dispatch(request('DELETE', 'plans', id));
    }
    loadPlans();
  }

  return (
    <>
      <header>
        <h1>Planos</h1>
        <aside>
          <button type='button' onClick={() => goTo('plansform')}>
            <MdAdd size={16} color='#fff' /> CADASTRAR
          </button>
        </aside>
      </header>
      <div>
        <table>
          <thead>
            <td>NOME</td>
            <td>MESES DE DURAÇÃO</td>
            <td>VALOR MENSAL</td>
            <td>AÇÕES</td>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{plan.price}</td>
                <td>
                  <button
                    type='button'
                    className='blueMinimalButton'
                    onClick={() => goTo(`plansform?id=${plan.id}`)}
                  >
                    editar
                  </button>
                  <button
                    onClick={() => deletePlan(plan.id, plan.title)}
                    type='button'
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
