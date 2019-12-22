import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import { deleteItem } from '~/functions/general';

import history from '~/services/history';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    const response = await api.get('plans');

    setPlans(response.data);
  }

  const callback = () => loadPlans();

  useEffect(() => {
    loadPlans();
  }, []);

  function goTo(page) {
    history.push(`/${page}`);
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
                    onClick={() =>
                      deleteItem(
                        `plano ${plan.title}`,
                        plan.id,
                        dispatch,
                        'plans',
                        callback
                      )
                    }
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
